# Security & approvals — explained simply

[← Building Operations Hub](../README.md)

## Why approval exists

A field user can propose useful information, but not every proposal should become official guidance immediately.

\`\`\`mermaid
flowchart LR
    A[User proposes content] --> B[Check scope / permissions]
    B --> C[Review]
    C -->|Approved| D[Publish]
    C -->|Rejected| E[Return / archive]
    D --> F[Keep a trace]
\`\`\`

The same principle applies to sensitive actions: the interface helps the user, but the data / automation layer must still verify that the action is allowed.

<details>
<summary><strong>Technical principles</strong></summary>

Least privilege, server-side validation, auditability, controlled destructive actions, explicit error paths and DEV → TEST/UAT → PROD deployment are part of the intended production approach.

</details>
