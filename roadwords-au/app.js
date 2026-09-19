(()=>{'use strict';
const BUILD='rw-native-tts-v7';
const STORAGE='roadwords_native_v7';
const intervals=[10,60,1440,4320,10080,20160,43200,129600];
const $=id=>document.getElementById(id);
const E={};
['homeView','sessionView','settingsView','homeBtn','settingsBtn','voiceCard','voiceStatus','testVoiceBtn','startBtn','statSeen','statKnown','statDue','sessionCount','pauseBtn','phase','countdown','word','translation','instruction','answerZone','micStatus','noBtn','yesBtn','stopBtn','voiceSelect','selectedVoiceMeta','thinkSelect','repeatSelect','sizeSelect','rateSelect','voiceAnswerToggle','speakFrenchToggle','retryToggle','resetBtn'].forEach(id=>E[id]=$(id));

let words=[];
let voices=[];
let englishVoice=null;
let frenchVoice=null;
let state=loadState();
let run=null;
let runToken=0;
let recognition=null;
let wakeLock=null;

function defaults(){return{settings:{think:5,repeats:3,size:20,rate:.9,voiceAnswer:true,speakFrench:true,retry:true,voiceURI:''},progress:{}}}
function loadState(){try{return Object.assign(defaults(),JSON.parse(localStorage.getItem(STORAGE)||'{}'))}catch{return defaults()}}
function saveState(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function view(name){['home','session','settings'].forEach(v=>E[v+'View'].classList.toggle('active',v===name));if(name==='home')renderStats()}
function sleep(ms,token){return new Promise(r=>setTimeout(()=>r(!run||token===runToken),ms))}
function normalize(t){return(String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z ]/g,' ').replace(/\s+/g,' ').trim())}

async function clearLegacy(){
 try{
   if('serviceWorker' in navigator){
     const regs=await navigator.serviceWorker.getRegistrations();
     for(const reg of regs)await reg.unregister();
   }
   if('caches' in window){
     const ks=await caches.keys();
     await Promise.all(ks.map(k=>caches.delete(k)));
   }
 }catch{}
}
clearLegacy();

function mergeState(){
 if(!state.settings)state.settings=defaults().settings;
 state.settings={...defaults().settings,...state.settings};
 if(!state.progress)state.progress={};
}
mergeState();

function loadVoicesNow(){voices=window.speechSynthesis?window.speechSynthesis.getVoices():[];return voices}
async function waitForVoices(){
 if(!('speechSynthesis' in window))return [];
 for(let i=0;i<20;i++){
   loadVoicesNow();
   if(voices.length)return voices;
   await new Promise(r=>setTimeout(r,100));
 }
 return voices;
}
function voiceRank(v){
 const lang=(v.lang||'').toLowerCase(),name=(v.name||'').toLowerCase();
 if(lang==='en-au'&&v.localService)return 0;
 if(lang==='en-au')return 1;
 if(/karen|catherine|matilda|australia|australian/.test(name)&&lang.startsWith('en'))return 2;
 if(lang==='en-gb'&&v.localService)return 3;
 if(lang.startsWith('en')&&v.localService)return 4;
 if(lang.startsWith('en'))return 5;
 return 99;
}
function chooseVoices(){
 const saved=state.settings.voiceURI;
 englishVoice=(saved&&voices.find(v=>v.voiceURI===saved))||[...voices].sort((a,b)=>voiceRank(a)-voiceRank(b))[0]||null;
 frenchVoice=voices.find(v=>(v.lang||'').toLowerCase()==='fr-fr'&&v.localService)||voices.find(v=>(v.lang||'').toLowerCase().startsWith('fr'))||null;
 populateVoiceSelect();
 updateVoiceDiagnostic();
}
function populateVoiceSelect(){
 E.voiceSelect.innerHTML='';
 const english=voices.filter(v=>(v.lang||'').toLowerCase().startsWith('en')).sort((a,b)=>voiceRank(a)-voiceRank(b)||a.name.localeCompare(b.name));
 for(const v of english){
   const o=document.createElement('option');o.value=v.voiceURI;o.textContent=v.name+' — '+v.lang+(v.localService?' • local':'');E.voiceSelect.appendChild(o);
 }
 if(englishVoice)E.voiceSelect.value=englishVoice.voiceURI;
}
function updateVoiceDiagnostic(){
 if(!('speechSynthesis' in window)){
   E.voiceStatus.textContent='❌ La synthèse vocale n’est pas disponible dans ce navigateur.';
   E.startBtn.disabled=true;E.testVoiceBtn.disabled=true;return;
 }
 if(!englishVoice){
   E.voiceStatus.textContent='❌ Aucune voix anglaise trouvée sur cet appareil.';
   E.startBtn.disabled=true;E.testVoiceBtn.disabled=true;return;
 }
 const isAU=(englishVoice.lang||'').toLowerCase()==='en-au';
 E.voiceStatus.textContent=(isAU?'✅ Voix australienne trouvée : ':'⚠️ Pas de voix en-AU trouvée. Fallback anglais : ')+englishVoice.name+' ('+englishVoice.lang+')';
 E.selectedVoiceMeta.textContent='Sélection actuelle : '+englishVoice.name+' — '+englishVoice.lang+' • build '+BUILD;
 E.testVoiceBtn.disabled=false;
 E.startBtn.disabled=!words.length;
}
function speak(text,opts={}){
 return new Promise(resolve=>{
   if(!('speechSynthesis' in window)||!text)return resolve(false);
   const u=new SpeechSynthesisUtterance(text);
   u.lang=opts.lang||(opts.voice?.lang)||'en-AU';
   if(opts.voice)u.voice=opts.voice;
   u.rate=opts.rate??state.settings.rate;
   u.pitch=opts.pitch??1;
   u.volume=1;
   let done=false;
   const finish=ok=>{if(done)return;done=true;clearTimeout(timer);resolve(ok)};
   u.onend=()=>finish(true);
   u.onerror=()=>finish(false);
   const timer=setTimeout(()=>{try{speechSynthesis.cancel()}catch{}finish(false)},Math.max(5000,text.length*350));
   try{speechSynthesis.cancel();setTimeout(()=>speechSynthesis.speak(u),40)}catch{finish(false)}
 });
}
async function speakEnglish(text){return speak(text,{voice:englishVoice,lang:englishVoice?.lang||'en-AU',rate:state.settings.rate})}
async function speakFrench(text){if(!state.settings.speakFrench)return true;return speak(text,{voice:frenchVoice,lang:'fr-FR',rate:.9})}

function p(word){const k=word.en.toLowerCase();return state.progress[k]||(state.progress[k]={seen:false,level:0,due:0,yes:0,no:0})}
function makeQueue(n){
 const now=Date.now(),due=[],fresh=[],later=[];
 for(const w of words){const x=state.progress[w.en.toLowerCase()];if(!x||!x.seen)fresh.push(w);else if((x.due||0)<=now)due.push(w);else later.push(w)}
 due.sort((a,b)=>(p(a).due||0)-(p(b).due||0));fresh.sort((a,b)=>a.rank-b.rank);later.sort((a,b)=>p(a).due-p(b).due);
 return [...due,...fresh,...later].slice(0,Math.max(n*3,n));
}
function renderStats(){
 let seen=0,known=0,due=0,now=Date.now();
 for(const x of Object.values(state.progress)){if(x.seen)seen++;if((x.level||0)>=4)known++;if(x.seen&&(x.due||0)<=now)due++}
 E.statSeen.textContent=seen;E.statKnown.textContent=known;E.statDue.textContent=due;
}
function setSettingsUI(){
 E.thinkSelect.value=String(state.settings.think);E.repeatSelect.value=String(state.settings.repeats);E.sizeSelect.value=String(state.settings.size);E.rateSelect.value=String(state.settings.rate);E.voiceAnswerToggle.checked=!!state.settings.voiceAnswer;E.speakFrenchToggle.checked=!!state.settings.speakFrench;E.retryToggle.checked=!!state.settings.retry;
}
function saveSettingsUI(){
 state.settings.think=+E.thinkSelect.value;state.settings.repeats=+E.repeatSelect.value;state.settings.size=+E.sizeSelect.value;state.settings.rate=+E.rateSelect.value;state.settings.voiceAnswer=E.voiceAnswerToggle.checked;state.settings.speakFrench=E.speakFrenchToggle.checked;state.settings.retry=E.retryToggle.checked;state.settings.voiceURI=E.voiceSelect.value||'';englishVoice=voices.find(v=>v.voiceURI===state.settings.voiceURI)||englishVoice;saveState();updateVoiceDiagnostic();
}
async function countdown(token){
 for(let i=state.settings.think;i>0;i--){if(!run||run.paused||token!==runToken)return false;E.countdown.textContent=i;await sleep(1000,token)}
 return !!run&&token===runToken&&!run.paused;
}
function stopRecognition(){if(recognition){try{recognition.onend=null;recognition.abort()}catch{}recognition=null}}
function RecognitionCtor(){return window.SpeechRecognition||window.webkitSpeechRecognition||null}
function listenForAnswer(token){
 stopRecognition();
 const C=RecognitionCtor();
 if(!state.settings.voiceAnswer){E.micStatus.textContent='Choisis OUI ou NON.';return}
 if(!C){E.micStatus.textContent='Commande vocale indisponible ici — utilise les boutons.';return}
 try{
   recognition=new C();recognition.lang='fr-FR';recognition.continuous=false;recognition.interimResults=false;recognition.maxAlternatives=5;
   E.micStatus.textContent='🎙️ J’écoute : « oui » ou « non »';
   recognition.onresult=e=>{
     if(!run||token!==runToken)return;
     const heard=normalize(Array.from(e.results).flatMap(r=>Array.from(r)).map(a=>a.transcript).join(' '));
     if(/\b(oui|ouais|yes|yep)\b/.test(heard))answer(true);
     else if(/\b(non|no|nope)\b/.test(heard))answer(false);
     else E.micStatus.textContent='Je n’ai pas compris. Appuie sur OUI ou NON.';
   };
   recognition.onerror=()=>{E.micStatus.textContent='Micro non disponible — utilise les boutons.'};
   recognition.start();
 }catch{E.micStatus.textContent='Micro non disponible — utilise les boutons.'}
}

async function showCard(token){
 if(!run||run.paused||token!==runToken)return;
 if(run.done>=run.target||run.index>=run.queue.length)return finish();
 stopRecognition();run.answered=false;
 const w=run.queue[run.index];run.current=w;
 E.sessionCount.textContent=(run.done+1)+' / '+run.target;E.word.textContent=w.en;E.translation.textContent=w.fr;E.translation.classList.add('hidden');E.answerZone.classList.add('hidden');E.phase.textContent='Écoute';E.countdown.textContent='▶';E.instruction.textContent='Écoute le mot anglais.';
 await speakEnglish(w.en);
 if(!run||run.paused||token!==runToken)return;
 E.phase.textContent='Réfléchis';E.instruction.textContent='Trouve le sens en français.';
 if(!await countdown(token))return;
 E.translation.classList.remove('hidden');E.phase.textContent='Réponse';E.countdown.textContent='✓';E.instruction.textContent=w.en+' = '+w.fr;
 await speakFrench(w.fr);
 if(!run||run.paused||token!==runToken)return;
 await sleep(250,token);
 for(let i=0;i<state.settings.repeats;i++){await speakEnglish(w.en);if(!run||run.paused||token!==runToken)return;if(i<state.settings.repeats-1)await sleep(350,token)}
 if(!run||run.paused||token!==runToken)return;
 E.phase.textContent='Tu connaissais ?';E.answerZone.classList.remove('hidden');E.instruction.textContent='Réponds oui ou non.';listenForAnswer(token);
}
async function startSession(){
 if(!words.length||!englishVoice)return;
 saveSettingsUI();runToken++;
 run={queue:makeQueue(state.settings.size),index:0,done:0,target:Math.min(state.settings.size,words.length),current:null,answered:false,paused:false};
 try{if('wakeLock'in navigator)wakeLock=await navigator.wakeLock.request('screen')}catch{}
 view('session');E.pauseBtn.textContent='Pause';showCard(runToken);
}
async function answer(ok){
 if(!run||run.answered||!run.current)return;
 run.answered=true;stopRecognition();
 const x=p(run.current);x.seen=true;x.last=Date.now();
 if(ok){x.yes=(x.yes||0)+1;x.level=Math.min((x.level||0)+1,intervals.length-1);x.due=Date.now()+intervals[x.level]*60000;E.micStatus.textContent='✅ Oui';}
 else{x.no=(x.no||0)+1;x.level=0;x.due=Date.now()+10*60000;E.micStatus.textContent='↩️ Non';if(state.settings.retry)run.queue.splice(Math.min(run.queue.length,run.index+4),0,run.current);}
 run.done++;saveState();renderStats();await sleep(450,runToken);if(!run)return;run.index++;showCard(runToken);
}
function pause(){if(!run)return;run.paused=true;runToken++;stopRecognition();try{speechSynthesis.cancel()}catch{}E.pauseBtn.textContent='Reprendre';E.phase.textContent='Pause';E.instruction.textContent='Session en pause.'}
function resume(){if(!run)return;run.paused=false;runToken++;E.pauseBtn.textContent='Pause';showCard(runToken)}
async function finish(){
 runToken++;stopRecognition();try{speechSynthesis.cancel()}catch{}try{if(wakeLock)await wakeLock.release()}catch{}wakeLock=null;run=null;view('home');
}

async function init(){
 setSettingsUI();renderStats();
 try{
   const r=await fetch('./words-3000.json?build=7',{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);words=await r.json();if(!Array.isArray(words)||words.length<3000)throw new Error('liste incomplète');
 }catch(e){E.voiceStatus.textContent='❌ Impossible de charger les 3000 mots : '+e.message;return}
 await waitForVoices();chooseVoices();
 if('speechSynthesis'in window){speechSynthesis.onvoiceschanged=()=>{loadVoicesNow();chooseVoices()}}
 E.startBtn.disabled=!englishVoice;
}

E.testVoiceBtn.onclick=async()=>{E.voiceStatus.textContent='🔊 Test en cours…';await speakEnglish('Good morning. How are you today?');updateVoiceDiagnostic()};
E.startBtn.onclick=startSession;E.yesBtn.onclick=()=>answer(true);E.noBtn.onclick=()=>answer(false);E.stopBtn.onclick=finish;E.pauseBtn.onclick=()=>run?.paused?resume():pause();
E.homeBtn.onclick=()=>run?finish():view('home');E.settingsBtn.onclick=()=>{if(run)pause();view('settings')};
[E.thinkSelect,E.repeatSelect,E.sizeSelect,E.rateSelect,E.voiceAnswerToggle,E.speakFrenchToggle,E.retryToggle,E.voiceSelect].forEach(x=>x.addEventListener('change',saveSettingsUI));
E.resetBtn.onclick=()=>{if(confirm('Effacer toute ta progression ?')){state.progress={};saveState();renderStats()}};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&run&&!run.paused&&'speechSynthesis'in window&&speechSynthesis.paused){try{speechSynthesis.resume()}catch{}}});
init();
})();