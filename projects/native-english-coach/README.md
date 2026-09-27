# Native English Coach — V1

PWA d'apprentissage de l'anglais parlé, pensée pour iPhone et les sessions en voiture.

## Fonctionnalités déjà livrées
- Modes Drive, Intensif, Normal, Listening, Speaking et Exploration.
- Mix automatique des voix anglaises disponibles : en-AU, en-US, en-GB.
- Priorité automatique à l'accent australien pour les cartes AU.
- Prononciation "repère FR" + IPA pour chaque élément du corpus.
- Corpus initial : vocabulaire essentiel, chunks, phrasal verbs, anglais australien, football/internet, tech/travail.
- Suivi séparé reading / listening / speaking.
- Répétition espacée : FSRS 5.4.2 chargé à la volée quand Internet est disponible, avec moteur SRS local de secours hors connexion.
- IndexedDB pour la progression.
- Service Worker pour le fonctionnement PWA/offline des fichiers locaux.
- Wake Lock en mode Drive lorsque le navigateur le permet.
- Import CSV et export de progression.

## Installer sur iPhone
La PWA doit être servie en HTTPS (GitHub Pages, Cloudflare Pages, Netlify, etc.).
1. Ouvrir l'URL dans Safari.
2. Partager.
3. "Sur l'écran d'accueil".
4. Ouvrir ensuite Native English Coach depuis l'icône.

Un fichier ouvert directement en `file://` ne peut pas enregistrer un Service Worker.

## Corpus CSV
Colonnes :
`term,phoneticFr,ipa,french,example,exampleFr,category,type,source`

## Architecture de la suite
- Étendre le corpus vers 6 000–7 000 familles utiles + chunks/phrasal verbs.
- Ajouter des paquets audio pré-générés pour garantir des voix naturelles constantes, notamment AU.
- Ajouter l'import de sous-titres/phrases personnelles sans copier de contenu protégé.
- Ajouter dictée et reconnaissance vocale lorsque l'environnement iOS est fiable.
- Ajouter statistiques avancées par accent, source et compétence.

## Point iOS important
Safari/WebKit peut ne pas exposer toutes les voix Enhanced/Premium installées dans iOS via `speechSynthesis`. La V1 détecte donc les voix réellement accessibles et choisit les meilleures candidates sans prétendre qu'une voix indisponible est utilisée.
