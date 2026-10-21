# Architecture — explained simply

[← Ticketing project](../README.md)

## What is the architecture trying to achieve?

The user should see **one simple application**, even though several services work behind it.

\`\`\`mermaid
flowchart LR
    U[User] --> A[Application]
    A --> D[Business data & documents]
    A --> W[Automation]
    W --> D
    W --> M[E-mails / notifications]
    D --> R[History & reporting]
\`\`\`

- **Power Apps** is the screen the user works with.
- **SharePoint** keeps requests, configuration and documents.
- **Power Automate** performs controlled actions and repetitive work.
- **Outlook / Microsoft 365** is used when e-mail or user information is needed.

## Request lifecycle

\`\`\`mermaid
stateDiagram-v2
    [*] --> Creating
    Creating --> Draft: save meaningful work
    Draft --> Creating: resume
    Creating --> Submitted: final confirmation
    Submitted --> InProgress: team takes ownership
    InProgress --> Waiting
    Waiting --> InProgress
    InProgress --> Completed
    Completed --> Closed
\`\`\`

**Important:** uploading a document does not turn a draft into a submitted ticket.

## Outlook archive

\`\`\`mermaid
flowchart LR
    A[User selects an Outlook conversation] --> B[Automation reads it]
    B --> C[Conversation + attachments are archived]
    C --> D[Ticket displays the archived copy]
\`\`\`

<details>
<summary><strong>Technical details</strong></summary>

The documented solution includes 28 Canvas screens, 27 cloud flows and 29 environment-variable definitions, with SharePoint, Office 365 Outlook and Office 365 Users connection references.

The design also considers source-side filtering, limited refreshes, bounded concurrency, explicit error paths, traceability and environment-specific configuration.

</details>
