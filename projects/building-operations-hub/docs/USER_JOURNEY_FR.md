# Parcours utilisateur

[English](USER_JOURNEY.md) · [Français](USER_JOURNEY_FR.md)

## Parcours d'astreinte principal

```mermaid
flowchart TD
    A[Building Operations Hub] --> B[Aide à l'astreinte]
    B --> C[Choisir le site]
    C --> D[Choisir le bâtiment]
    D --> E[Choisir l'étage / zone]
    E --> F[Choisir l'équipement]
    F --> G{Action}
    G --> H[Marche]
    G --> I[Arrêt]
    G --> J[Paramétrage]
    G --> K[REX / Dépannage]
    G --> L[Tous les tutoriels]
```

## Annuaire

```mermaid
flowchart LR
    A[Contacts] --> B[Recherche / filtres]
    B --> C[Entreprise / service]
    C --> D[Appeler ou envoyer un e-mail]
    C --> E[Modification autorisée]
    E --> F[Soumission d'une modification gouvernée]
```

## Proposition de contenu

```mermaid
flowchart LR
    A[Équipement] --> B[Proposer un contenu]
    B --> C[Titre / contexte / vidéo / description]
    C --> D[Envoyer]
    D --> E[En attente]
    E --> F[Validation technique]
    F --> G[Publication ou refus]
```

## Barométrie à chaud

```mermaid
flowchart LR
    A[Barométrie] --> B[Saisir la référence]
    B --> C[Valider la référence]
    C --> D[Note 1 à 5]
    D --> E[Enregistrer]
    E --> F[KPI / amélioration continue]
```

La démonstration publique utilise des données synthétiques. Dans l'architecture entreprise, validation et stockage sont exécutés sur les sources gouvernées.
