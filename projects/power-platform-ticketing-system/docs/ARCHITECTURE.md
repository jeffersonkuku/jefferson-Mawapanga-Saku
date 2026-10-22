# Architecture — Ticketing & Request Management

[← Project](../README.md)

---

## 🇬🇧 English

### Simple explanation

The user sees one application, but several services work behind it.

```mermaid
flowchart LR
    U[User] --> A[Power Apps]
    A --> D[Requests + documents]
    A --> W[Power Automate]
    W --> D
    W --> M[Outlook / notifications]
    D --> H[History / reporting]
```

### What each part does

- **Power Apps:** the screens and forms used by the user.
- **SharePoint:** stores requests, documents and configuration.
- **Power Automate:** performs controlled actions and repetitive tasks.
- **Outlook / Microsoft 365:** handles e-mail and user information.

### Request lifecycle

```mermaid
flowchart LR
    A[Create] --> B[Draft]
    B --> C[Final submission]
    C --> D[Assigned]
    D --> E[In progress]
    E --> F[Waiting if needed]
    F --> E
    E --> G[Completed]
    G --> H[Closed]
```

A document upload does **not** submit a ticket. Submission happens only when the user confirms the final step.

### Outlook conversation

```mermaid
flowchart LR
    A[Select conversation] --> B[Read messages]
    B --> C[Archive conversation + attachments]
    C --> D[Display it from the ticket]
```

### Technical facts

The documented solution contains **28 Canvas screens**, **27 Power Automate flows** and **29 environment-variable definitions**.

---

## 🇫🇷 Français

### Explication simple

L’utilisateur voit une seule application, mais plusieurs services travaillent derrière.

```mermaid
flowchart LR
    U[Utilisateur] --> A[Power Apps]
    A --> D[Demandes + documents]
    A --> W[Power Automate]
    W --> D
    W --> M[Outlook / notifications]
    D --> H[Historique / reporting]
```

### Rôle de chaque élément

- **Power Apps :** les écrans et formulaires utilisés par l’utilisateur.
- **SharePoint :** stocke les demandes, documents et paramètres.
- **Power Automate :** réalise les actions contrôlées et répétitives.
- **Outlook / Microsoft 365 :** gère les e-mails et informations utilisateurs.

### Cycle de vie

```mermaid
flowchart LR
    A[Création] --> B[Brouillon]
    B --> C[Soumission finale]
    C --> D[Affectation]
    D --> E[En cours]
    E --> F[En attente si nécessaire]
    F --> E
    E --> G[Terminé]
    G --> H[Clôturé]
```

Ajouter un document ne soumet **pas** automatiquement le ticket. La soumission existe uniquement après confirmation finale.
