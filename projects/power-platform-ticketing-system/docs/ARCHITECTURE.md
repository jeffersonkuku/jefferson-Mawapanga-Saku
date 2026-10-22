# Architecture — Ticketing

[← Projet / Project](../README.md)

## 🧩 Vue simple / Simple view

```mermaid
flowchart TB
    U[Utilisateurs<br/>Users] --> APP[Power Apps]
    APP --> SP[(SharePoint<br/>tickets / config / history)]
    APP --> DOC[(Documents)]
    APP --> FLOW[Power Automate]
    FLOW --> SP
    FLOW --> DOC
    FLOW --> OUT[Outlook]
    FLOW --> USERS[Office 365 Users]
    SP --> KPI[KPI / Audit]
```

🇫🇷 **Power Apps** porte l’interface, les formulaires, la navigation et le contexte utilisateur.  
*🇬🇧 **Power Apps** provides the interface, forms, navigation and user context.*

🇫🇷 **SharePoint** stocke les tickets, documents, paramètres, historiques et données nécessaires au pilotage.  
*🇬🇧 **SharePoint** stores tickets, documents, settings, history and data needed for operations.*

🇫🇷 **Power Automate** exécute les actions contrôlées : routage, documents, notifications, Outlook, délégations et traitements programmés.  
*🇬🇧 **Power Automate** executes controlled actions: routing, documents, notifications, Outlook, delegations and scheduled processing.*

## 🔄 Cycle de vie / Lifecycle

```mermaid
flowchart LR
    A[Création<br/>Creation] --> B[Brouillon<br/>Draft]
    B --> C[Soumission<br/>Submission]
    C --> D[Affectation<br/>Assignment]
    D --> E[En cours<br/>In progress]
    E --> F[Attente<br/>Waiting]
    F --> E
    E --> G[Terminé<br/>Completed]
    G --> H[Clôturé<br/>Closed]
```

🇫🇷 Un document ajouté pendant la préparation ne soumet pas automatiquement le ticket.  
*🇬🇧 Adding a document during preparation does not automatically submit the ticket.*

## ✉️ Archivage Outlook / Outlook archive

```mermaid
flowchart LR
    A[Conversation Outlook] --> B[Recherche / lecture<br/>Search / read]
    B --> C[Archivage messages + PJ<br/>Archive messages + attachments]
    C --> D[SharePoint]
    D --> E[Consultation ticket<br/>Ticket view]
```

## ⚡ Performance / Performance

🇫🇷 Principes documentés : filtrage côté source, réduction des Refresh inutiles, limitation des appels réseau séquentiels, parallélisme uniquement pour des tâches indépendantes.  
*🇬🇧 Documented principles: source-side filtering, fewer unnecessary Refresh calls, reduced sequential network calls, and parallelism only for independent work.*

## 📦 Échelle / Scale

- 🇫🇷 28 écrans Canvas.  
  *🇬🇧 28 Canvas screen definitions.*
- 🇫🇷 27 flows Power Automate.  
  *🇬🇧 27 Power Automate flows.*
- 🇫🇷 29 variables d’environnement.  
  *🇬🇧 29 environment-variable definitions.*
