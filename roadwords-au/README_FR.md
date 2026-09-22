# RoadWords AU

[**English**](README.md) · [**Français**](README_FR.md)

Application d'apprentissage du vocabulaire anglais orientée audio pour iPhone, reconstruite comme adaptation du projet open source **Motamot** plutôt que comme prototype isolé.

## Principe

1. Création d'un pool de cartes avec répétition espacée Leitner.
2. Recherche d'une **prononciation australienne réelle** pour chaque mot.
3. Les mots sans enregistrement australien résolu sont ignorés.
4. Un premier appui utilisateur débloque l'audio sur iPhone.
5. Lecture du mot anglais.
6. Attente configurable.
7. Affichage anglais + français.
8. Répétition du même enregistrement humain.
9. Réponse Oui / Non par voix lorsque disponible, avec boutons tactiles en secours.
10. Sauvegarde de la progression localement.

## Audio australien

L'application ne s'appuie pas sur le TTS du navigateur pour les mots cibles. Elle recherche des enregistrements Wikimedia Commons / Wiktionary explicitement associés à l'anglais australien lorsque disponibles.

## Vocabulaire

`public/words-3000.json` contient les entrées anglais/français.

## Développement

```bash
npm install
npm test
npm run dev
npm run build
```

## Open source

RoadWords AU est basé sur **JulianGama/Motamot**, sous licence MIT. Voir [UPSTREAM.md](./UPSTREAM.md) et [LICENSE](./LICENSE).
