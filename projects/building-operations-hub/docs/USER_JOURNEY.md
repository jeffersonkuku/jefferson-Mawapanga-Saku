# User Journey

## Primary on-call journey

```mermaid
flowchart TD
    A[Building Operations Hub] --> B[On-call assistance]
    B --> C[Choose Site]
    C --> D[Choose Building]
    D --> E[Choose Floor / Zone]
    E --> F[Choose Equipment]
    F --> G{Select action}
    G --> H[Start]
    G --> I[Stop]
    G --> J[Configuration]
    G --> K[REX / Troubleshooting]
    G --> L[All tutorials]
```

The objective is to minimise search time during an intervention and keep the technician inside the physical/technical context of the asset.

---

## Contact journey

```mermaid
flowchart LR
    A[Contacts] --> B[Search / Filter]
    B --> C[Company / Service]
    C --> D[Call or Email]
    C --> E[Authorised edit]
    E --> F[Submit governed change]
```

Contacts can be classified by discipline/service and centrally managed through SharePoint.

---

## Content proposal journey

```mermaid
flowchart LR
    A[Equipment] --> B[Propose content]
    B --> C[Title / Context / Video / Description]
    C --> D[Submit]
    D --> E[Pending approval]
    E --> F[Technical review]
    F --> G[Publish or reject]
```

The proposal is not visible as approved operational content until the required validation is completed.

---

## Hot barometry journey

```mermaid
flowchart LR
    A[Barometry] --> B[Enter intervention reference]
    B --> C[Validate reference]
    C --> D[Rate 1–5]
    D --> E[Record feedback]
    E --> F[KPI / service improvement]
```

The portfolio uses a synthetic reference for demonstration. In an enterprise implementation, validation and storage are handled against the governed back end.
