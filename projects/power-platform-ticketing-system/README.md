# Ticketing & Request Management

[← Main portfolio](../../README.md) · [▶ Watch the demo](https://www.youtube.com/watch?v=_jR8T9s2VUE) · [🧭 All projects](../README.md)

> **A request-management application designed so a request is not lost between e-mails, documents and several teams.**

## Understand it in 30 seconds

| Question | Answer |
|---|---|
| **What was the problem?** | Requests were difficult to follow when information was split between e-mails, documents and manual relaunches |
| **What did I build?** | One application for creation, drafts, assignment, processing, documents, linked Outlook conversations and history |
| **Why is it useful?** | The requester knows where the request is; the team knows what it has to process; administrators can manage routing and access |
| **What should you look at first?** | The video, then the screenshots below |

[![Ticketing demo](./assets/01-home_4K.png)](https://www.youtube.com/watch?v=_jR8T9s2VUE)

**[▶ Watch the full demo →](https://www.youtube.com/watch?v=_jR8T9s2VUE)**

## The idea in one diagram

\`\`\`mermaid
flowchart LR
    A[Requester creates a request] --> B[Request reaches the right team]
    B --> C[Someone takes ownership]
    C --> D[Work is processed]
    D --> E[Documents / e-mails / comments stay attached]
    E --> F[Requester follows the status]
    F --> G[History remains traceable]
\`\`\`

## What changes for users

| Before | With the application |
|---|---|
| Request sent by e-mail | Request created in one guided flow |
| Hard to know who is handling it | Team and assignee are visible |
| Documents live in different places | Documents stay linked to the request |
| E-mail discussion is separate | Outlook conversation can be archived with the ticket |
| Manual follow-up | Status, activity and history are visible |
| Different rules depend on memory | Routing and notifications can be automated |

## Screens — click any image to open it

### Requester experience

[![Home](./assets/01-home_4K.png)](./assets/01-home_4K.png)

[![Profile](./assets/02-profile_4K.png)](./assets/02-profile_4K.png)

[![My tickets](./assets/04-my-tickets_4K.png)](./assets/04-my-tickets_4K.png)

[![Create ticket](./assets/06-create-ticket_4K.png)](./assets/06-create-ticket_4K.png)

### Team workspace

[![Service tickets](./assets/05-service-tickets_4K.png)](./assets/05-service-tickets_4K.png)

[![Ticket detail](./assets/12-ticket-detail_4K.png)](./assets/12-ticket-detail_4K.png)

[![Outlook archive](./assets/13-outlook-archive_4K.png)](./assets/13-outlook-archive_4K.png)

[![Statistics](./assets/03-statistics_4K.png)](./assets/03-statistics_4K.png)

### Administration

[![Teams](./assets/07-team-management_4K.png)](./assets/07-team-management_4K.png)

[![Settings](./assets/08-settings_4K.png)](./assets/08-settings_4K.png)

[![Access](./assets/09-access-management_4K.png)](./assets/09-access-management_4K.png)

[![Delegations](./assets/10-delegations_4K.png)](./assets/10-delegations_4K.png)

[![Audit](./assets/11-admin-journal_4K.png)](./assets/11-admin-journal_4K.png)

## How it works behind the screen

\`\`\`mermaid
flowchart TB
    U[Requester / team / admin] --> APP[Power Apps]
    APP --> SP[Shared records & documents]
    APP --> FLOW[Power Automate]
    FLOW --> SP
    FLOW --> MAIL[Outlook / notifications]
    SP --> H[History / reporting]
\`\`\`

## Important design choices

- **Draft is not a real ticket.**
- **A document does not submit a request.**
- **Sensitive actions are not protected only by hidden buttons.**
- **The ticket is the reference point for status, documents, comments, e-mails and history.**
- **The public portfolio is sanitised.**

<details>
<summary><strong>Technical facts</strong></summary>

The supplied solution documentation includes **28 Canvas screen definitions**, **27 Power Automate cloud flows** and **29 environment-variable definitions**.

Technical pages:
- [Architecture](./docs/ARCHITECTURE.md)
- [Flow catalogue](./docs/FLOW_CATALOG.md)
- [Security, governance & deployment](./docs/SECURITY_GOVERNANCE.md)
- [User journey](./docs/USER_JOURNEY.md)
- [Demo notes](./demo/README.md)

</details>

## 🇫🇷 Résumé rapide

**Problème :** une demande peut se perdre entre les e-mails, les documents, les relances et plusieurs équipes.

**Solution :** une seule application pour **créer → affecter → traiter → suivre → clôturer**, avec les documents, conversations Outlook, commentaires et historiques rattachés au même ticket.
