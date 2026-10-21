# RoadWords AU

[← Portfolio](../README.md) · [English](./README.md)

> **Application mobile de vocabulaire pensée d’abord pour l’écoute d’une vraie prononciation australienne.**

## Comprendre en 20 secondes

\`\`\`mermaid
flowchart LR
    A[Choisir un mot à réviser] --> B[Écouter la prononciation australienne]
    B --> C[Attendre]
    C --> D[Afficher anglais + français]
    D --> E[Réécouter]
    E --> F[Connu / pas connu]
    F --> G[Programmer la prochaine révision]
\`\`\`

## Pourquoi

Le but est de travailler le vocabulaire comme un exercice d’**écoute réelle**, pas seulement comme une liste de traductions.

L’application cherche un enregistrement australien réel. Si elle n’en trouve pas, elle préfère ignorer le mot plutôt que d’inventer une prononciation disponible.

## Fonctions principales

- répétition espacée ;
- recherche de prononciation australienne ;
- apprentissage audio d’abord ;
- révélation anglais + français ;
- répétitions d’écoute ;
- réponse connu / pas connu ;
- progression conservée localement.

<details>
<summary><strong>Détails techniques</strong></summary>

RoadWords AU adapte le projet open source **Motamot** et conserve son architecture mobile/PWA et Leitner. Les enregistrements sont recherchés via Wikimedia Commons / Wiktionary lorsque disponibles.

</details>
