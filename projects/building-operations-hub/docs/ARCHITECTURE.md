# Architecture — explained simply

[← Building Operations Hub](../README.md)

## The goal

The technician should see **one simple route to the answer**, while the technical services stay behind the scenes.

\`\`\`mermaid
flowchart LR
    U[Technician] --> A[Application]
    A --> D[Equipment / contacts / procedures]
    A --> W[Automation]
    W --> V[Validation / notification]
    D --> K[Reusable operational knowledge]
\`\`\`

- **Application:** guides the user.
- **Data:** stores equipment, contacts and knowledge.
- **Automation:** handles controlled actions, approvals and notifications.
- **Reporting:** can use the feedback later.

<details>
<summary><strong>Technical view</strong></summary>

The intended stack is Power Apps Canvas + Power Fx + SharePoint + Power Automate + Microsoft 365. Production-oriented design separates interface, data, controlled actions and access rules, with responsive UX and environment-aware deployment.

</details>
