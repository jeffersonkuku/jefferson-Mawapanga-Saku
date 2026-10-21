# Security & governance — explained simply

[← Ticketing project](../README.md)

## The main rule

**Hiding a button is not security.**

A user interface can make an action easier or harder to reach, but sensitive actions must also be checked where the data or automation is actually changed.

\`\`\`mermaid
flowchart LR
    A[User asks to perform an action] --> B[Check identity / scope / business rule]
    B -->|Allowed| C[Perform action]
    B -->|Not allowed| D[Reject action]
    C --> E[Keep trace / history]
\`\`\`

## What this protects

- access to team or administrative actions;
- destructive operations;
- routing and configuration;
- documents and business records;
- temporary delegation;
- repeated or duplicate actions.

## Deployment

\`\`\`mermaid
flowchart LR
    D[DEV] --> T[TEST / UAT]
    T --> P[PROD]
\`\`\`

Changes should be tested before production. Environment-specific values should not be hard-coded into the business logic.

<details>
<summary><strong>Technical notes</strong></summary>

The solution uses solution-aware Power Automate patterns, connection references and environment variables. Production design should also respect DLP policies, least privilege, explicit error handling, controlled retries, anti-duplicate/idempotency measures and protection against self-triggered recursion.

The public portfolio does not expose credentials, tenant URLs, connection IDs, production list identifiers or source packages.

</details>
