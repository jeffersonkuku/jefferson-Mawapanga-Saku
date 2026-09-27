import { KokoroTTS } from "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm";

const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
const SAMPLE_RATE = 24000;
let tts = null;
let loadPromise = null;
let backend = null;
let activeJob = 0;

function post(msg, transfer=[]) { self.postMessage(msg, transfer); }

async function hasWebGPU() {
  try {
    if (!("gpu" in navigator) || !navigator.gpu) return false;
    const adapter = await navigator.gpu.requestAdapter();
    return !!adapter;
  } catch { return false; }
}

function progressCallback(data) {
  if (!data) return;
  if (data.status === "progress") {
    post({ type:"load-progress", loaded:data.loaded||0, total:data.total||0, file:data.file||"" });
  }
}

async function ensureLoaded() {
  if (tts) return;
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const useWebGPU = await hasWebGPU();
    if (useWebGPU) {
      try {
        post({type:"backend", backend:"webgpu", stage:"loading"});
        tts = await KokoroTTS.from_pretrained(MODEL_ID, {
          dtype:"fp32",
          device:"webgpu",
          progress_callback:progressCallback
        });
        backend = "webgpu";
        post({type:"backend", backend, stage:"ready"});
        return;
      } catch (e) {
        post({type:"backend", backend:"wasm", stage:"fallback", message:String(e?.message||e)});
      }
    }
    tts = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype:"q8",
      device:"wasm",
      progress_callback:progressCallback
    });
    backend = "wasm";
    post({type:"backend", backend, stage:"ready"});
  })();
  try { await loadPromise; } finally { loadPromise = null; }
}

function floatToWav(samples, sampleRate=SAMPLE_RATE) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const ws = (o,s) => { for(let i=0;i<s.length;i++) view.setUint8(o+i,s.charCodeAt(i)); };
  ws(0,"RIFF"); view.setUint32(4,36+samples.length*2,true); ws(8,"WAVE"); ws(12,"fmt ");
  view.setUint32(16,16,true); view.setUint16(20,1,true); view.setUint16(22,1,true);
  view.setUint32(24,sampleRate,true); view.setUint32(28,sampleRate*2,true);
  view.setUint16(32,2,true); view.setUint16(34,16,true); ws(36,"data");
  view.setUint32(40,samples.length*2,true);
  let off=44;
  for (let i=0;i<samples.length;i++) {
    const s=Math.max(-1,Math.min(1,samples[i]));
    view.setInt16(off, s<0?s*0x8000:s*0x7fff, true); off+=2;
  }
  return buffer;
}

self.onmessage = async (event) => {
  const msg = event.data || {};
  if (msg.type === "cancel") { activeJob = msg.jobId || activeJob + 1; return; }
  if (msg.type !== "generate") return;
  const jobId = msg.jobId;
  activeJob = jobId;
  try {
    await ensureLoaded();
    if (activeJob !== jobId) return;
    const out = await tts.generate(msg.text, {
      voice: msg.voice || "af_heart",
      speed: msg.speed || 1
    });
    if (activeJob !== jobId) return;
    const wav = floatToWav(out.audio, SAMPLE_RATE);
    post({type:"done", jobId, wav, backend, voice:msg.voice}, [wav]);
  } catch (e) {
    post({type:"error", jobId, message:String(e?.message||e)});
  }
};