# User Journey — Ticketing

[← Project](../README.md)

---

## 🇬🇧 English

### Requester

```mermaid
flowchart LR
    A[Create request] --> B[Fill information]
    B --> C[Add documents]
    C --> D[Check summary]
    D --> E[Submit]
    E --> F[Follow status]
```

### Operational team

```mermaid
flowchart LR
    A[Open service queue] --> B[Review request]
    B --> C[Take ownership / reassign]
    C --> D[Process]
    D --> E[Comments / documents / e-mails]
    E --> F[Update status]
    F --> G[Close]
```

### Administrator

Administrators manage teams, access, routing rules, temporary delegation, notifications and audit history.

### Why drafts matter

A draft is unfinished work. It should not enter the operational queue before final submission.

---

## 🇫🇷 Français

### Demandeur

```mermaid
flowchart LR
    A[Créer la demande] --> B[Renseigner les informations]
    B --> C[Ajouter les documents]
    C --> D[Vérifier le résumé]
    D --> E[Soumettre]
    E --> F[Suivre le statut]
```

### Équipe opérationnelle

```mermaid
flowchart LR
    A[Ouvrir la file service] --> B[Lire la demande]
    B --> C[Prendre en charge / réaffecter]
    C --> D[Traiter]
    D --> E[Commentaires / documents / e-mails]
    E --> F[Mettre à jour le statut]
    F --> G[Clôturer]
```

### Administrateur

L’administrateur gère les équipes, accès, règles de routage, délégations temporaires, notifications et historique d’administration.

### Pourquoi les brouillons sont importants

Un brouillon est un travail non terminé. Il ne doit pas entrer dans la file opérationnelle avant la soumission finale.
