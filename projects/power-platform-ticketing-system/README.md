# Ticketing & Request Management

[← Portfolio](../../README.md) · [▶ Demo](https://www.youtube.com/watch?v=_jR8T9s2VUE)

---

## 🇬🇧 English

### Understand the project in 30 seconds

**Problem:** a business request can be lost between e-mails, documents, follow-ups and several teams.

**Solution:** one application that keeps the request, owner, status, documents, comments, linked Outlook conversations and history together.

**Result:** the requester can follow the request and the operational team can immediately see what needs to be processed.

```mermaid
flowchart LR
    A[Create] --> B[Route]
    B --> C[Take ownership]
    C --> D[Process]
    D --> E[Documents / e-mails / comments]
    E --> F[Update status]
    F --> G[Close + history]
```

### Before / after

| Before | With the application |
|---|---|
| Request by e-mail | Guided request creation |
| Ownership unclear | Team and assignee visible |
| Documents separate | Documents linked to the ticket |
| E-mails outside the process | Outlook conversation archived |
| Manual follow-up | Status and history visible |

### Visual gallery — click to enlarge

<table>
<tr>
<td width="33%"><a href="./assets/01-home_4K.png"><img src="./assets/01-home_4K.png" width="100%"></a><br><b>Home</b></td>
<td width="33%"><a href="./assets/02-profile_4K.png"><img src="./assets/02-profile_4K.png" width="100%"></a><br><b>Profile</b></td>
<td width="33%"><a href="./assets/03-statistics_4K.png"><img src="./assets/03-statistics_4K.png" width="100%"></a><br><b>Statistics</b></td>
</tr>
<tr>
<td><a href="./assets/04-my-tickets_4K.png"><img src="./assets/04-my-tickets_4K.png" width="100%"></a><br><b>My tickets</b></td>
<td><a href="./assets/05-service-tickets_4K.png"><img src="./assets/05-service-tickets_4K.png" width="100%"></a><br><b>Service tickets</b></td>
<td><a href="./assets/06-create-ticket_4K.png"><img src="./assets/06-create-ticket_4K.png" width="100%"></a><br><b>Create request</b></td>
</tr>
<tr>
<td><a href="./assets/07-team-management_4K.png"><img src="./assets/07-team-management_4K.png" width="100%"></a><br><b>Teams</b></td>
<td><a href="./assets/08-settings_4K.png"><img src="./assets/08-settings_4K.png" width="100%"></a><br><b>Settings</b></td>
<td><a href="./assets/09-access-management_4K.png"><img src="./assets/09-access-management_4K.png" width="100%"></a><br><b>Access</b></td>
</tr>
<tr>
<td><a href="./assets/10-delegations_4K.png"><img src="./assets/10-delegations_4K.png" width="100%"></a><br><b>Delegations</b></td>
<td><a href="./assets/11-admin-journal_4K.png"><img src="./assets/11-admin-journal_4K.png" width="100%"></a><br><b>Audit</b></td>
<td><a href="./assets/12-ticket-detail_4K.png"><img src="./assets/12-ticket-detail_4K.png" width="100%"></a><br><b>Ticket detail</b></td>
</tr>
<tr>
<td><a href="./assets/13-outlook-archive_4K.png"><img src="./assets/13-outlook-archive_4K.png" width="100%"></a><br><b>Outlook archive</b></td>
<td></td><td></td>
</tr>
</table>

### Technical detail

- **[Architecture →](./docs/ARCHITECTURE.md)**
- **[User journey →](./docs/USER_JOURNEY.md)**
- **[Automation catalogue →](./docs/FLOW_CATALOG.md)**
- **[Security & governance →](./docs/SECURITY_GOVERNANCE.md)**

---

## 🇫🇷 Français

### Comprendre le projet en 30 secondes

**Problème :** une demande métier peut se perdre entre les e-mails, les documents, les relances et plusieurs équipes.

**Solution :** une seule application qui regroupe la demande, le responsable, le statut, les documents, commentaires, conversations Outlook et l’historique.

**Résultat :** le demandeur sait où en est sa demande et l’équipe sait immédiatement ce qu’elle doit traiter.

```mermaid
flowchart LR
    A[Créer] --> B[Router]
    B --> C[Prendre en charge]
    C --> D[Traiter]
    D --> E[Documents / e-mails / commentaires]
    E --> F[Mettre à jour le statut]
    F --> G[Clôturer + historique]
```

### Avant / après

| Avant | Avec l’application |
|---|---|
| Demande par e-mail | Création guidée |
| Responsable peu clair | Équipe et responsable visibles |
| Documents séparés | Documents liés au ticket |
| E-mails hors processus | Conversation Outlook archivée |
| Relances manuelles | Statut et historique visibles |

### Galerie

Les **13 captures ci-dessus** sont cliquables pour être ouvertes en grand.

### Détail technique

- **[Architecture →](./docs/ARCHITECTURE.md)**
- **[Parcours utilisateur →](./docs/USER_JOURNEY.md)**
- **[Catalogue des automatisations →](./docs/FLOW_CATALOG.md)**
- **[Sécurité & gouvernance →](./docs/SECURITY_GOVERNANCE.md)**
