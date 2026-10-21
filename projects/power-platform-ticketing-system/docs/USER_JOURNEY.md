# User journey — who does what?

[← Ticketing project](../README.md)

## Requester

\`\`\`mermaid
flowchart LR
    A[Create request] --> B[Fill useful information]
    B --> C[Add documents if needed]
    C --> D[Check summary]
    D --> E[Submit]
    E --> F[Follow status]
\`\`\`

A requester should not need to understand the internal organisation. The application guides the request and shows what happens next.

## Operational team

\`\`\`mermaid
flowchart LR
    A[Open service queue] --> B[Review request]
    B --> C[Take ownership or reassign]
    C --> D[Process]
    D --> E[Add comments / documents / e-mails]
    E --> F[Update status]
    F --> G[Complete / close]
\`\`\`

## Administrator

Administrators manage teams, access, temporary delegation, routing, notifications and audit history.

## Why drafts matter

A draft is simply **unfinished work**.

- untouched default values do not count as meaningful work;
- documents can be prepared without submitting;
- drafts stay in **My tickets**;
- drafts stay out of **Service tickets**;
- final confirmation creates the operational ticket.
