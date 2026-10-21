# Building Operations Hub

[← Main portfolio](../../README.md) · [▶ Watch the demo](https://www.youtube.com/watch?v=Y15BCn_i-fo) · [🧭 All projects](../README.md)

> **A field application designed to help technicians find the right information without searching through several tools.**

## Understand it in 30 seconds

**Problem:** during an intervention, useful information can be spread across documents, contacts and people’s experience.

**Solution:** organise the application the same way the technician experiences the site:

**Site → Building → Floor / Zone → Equipment → Action / Tutorial**

**Why:** the user does not have to know where a document is stored. They only have to know **where they are and what equipment they are working on**.

[![Building Operations Hub](./assets/01-home.png)](https://www.youtube.com/watch?v=Y15BCn_i-fo)

**[▶ Watch the demo →](https://www.youtube.com/watch?v=Y15BCn_i-fo)**

## The idea in one diagram

\`\`\`mermaid
flowchart LR
    A[Choose site] --> B[Choose building]
    B --> C[Choose zone]
    C --> D[Choose equipment]
    D --> E[Choose action]
    E --> F[Open the right procedure / contact / knowledge]
\`\`\`

## What the user can do

- find a site, building, zone and equipment;
- open start, stop, configuration or troubleshooting guidance;
- search technical contacts;
- reuse lessons learned from previous interventions;
- propose useful technical content without publishing it directly;
- give post-intervention feedback.

## Visual walkthrough — click any image to open it

[![Home](./assets/01-home.png)](./assets/01-home.png)

[![Site](./assets/02-sites.png)](./assets/02-sites.png)

[![Building](./assets/03-buildings.png)](./assets/03-buildings.png)

[![Zone](./assets/04-floors.png)](./assets/04-floors.png)

[![Equipment library](./assets/05-equipment-library.png)](./assets/05-equipment-library.png)

[![Equipment actions](./assets/06-equipment-detail.png)](./assets/06-equipment-detail.png)

[![Start procedure](./assets/07-start-tutorial.png)](./assets/07-start-tutorial.png)

[![Configuration](./assets/08-configuration.png)](./assets/08-configuration.png)

[![Troubleshooting](./assets/09-troubleshooting.png)](./assets/09-troubleshooting.png)

[![Contacts](./assets/10-contacts.png)](./assets/10-contacts.png)

[![Intervention reference](./assets/11-barometry-reference.png)](./assets/11-barometry-reference.png)

[![Content proposal](./assets/12-content-proposal.png)](./assets/12-content-proposal.png)

[![Feedback](./assets/13-barometry-rating.png)](./assets/13-barometry-rating.png)

## How it works behind the screen

\`\`\`mermaid
flowchart TB
    U[Technician] --> APP[Power Apps]
    APP --> DATA[Equipment / contacts / knowledge]
    APP --> AUTO[Automation]
    AUTO --> APPROVAL[Validation / notifications]
    DATA --> REPORT[Operational feedback / reporting]
\`\`\`

<details>
<summary><strong>Technical details</strong></summary>

The case study uses Power Apps Canvas, Power Fx, SharePoint, Power Automate and Microsoft 365. The design also documents responsive layouts, controlled approval paths, role-based access principles, explicit error handling and DEV → TEST/UAT → PROD deployment.

- [Architecture](./docs/ARCHITECTURE.md)
- [Security & approvals](./docs/SECURITY_AND_APPROVALS.md)
- [User journey](./docs/USER_JOURNEY.md)
- [Demo notes](./demo/README.md)

</details>

## 🇫🇷 Résumé rapide

**Problème :** un technicien peut perdre du temps à chercher une procédure, une information équipement ou le bon contact.

**Solution :** l’application suit le parcours réel **Site → Bâtiment → Zone → Équipement → Action**, puis affiche l’information utile dans ce contexte.
