# Parcours utilisateurs / User Journeys

[← Projet / Project](../README.md)

## 👤 Demandeur / Requester

```mermaid
flowchart LR
    A[Créer<br/>Create] --> B[Renseigner<br/>Fill]
    B --> C[Documents]
    C --> D[Vérifier<br/>Review]
    D --> E[Soumettre<br/>Submit]
    E --> F[Suivre<br/>Follow]
```

🇫🇷 Le demandeur suit un parcours guidé sans devoir connaître l’organisation interne.  
*🇬🇧 The requester follows a guided journey without needing to understand internal organisation.*

## 🧑‍🔧 Équipe opérationnelle / Operational team

```mermaid
flowchart LR
    A[File service<br/>Service queue] --> B[Lire<br/>Review]
    B --> C[Prendre en charge<br/>Own]
    C --> D[Traiter<br/>Process]
    D --> E[Commentaires / docs / mails]
    E --> F[Statut<br/>Status]
    F --> G[Clôture<br/>Close]
```

## 🛠️ Administration / Administration

🇫🇷 Les administrateurs gèrent équipes, accès, délégations, routage, paramètres de notification et historique d’administration.  
*🇬🇧 Administrators manage teams, access, delegations, routing, notification settings and administration history.*

## 📝 Brouillons / Drafts

🇫🇷 Un brouillon est un travail non terminé et reste hors de la file opérationnelle avant la soumission finale.  
*🇬🇧 A draft is unfinished work and stays out of the operational queue until final submission.*
