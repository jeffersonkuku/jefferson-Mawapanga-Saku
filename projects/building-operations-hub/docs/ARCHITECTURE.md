# Architecture — Building Operations Hub

[← Project](../README.md)

---

## 🇬🇧 English

### Simple view

```mermaid
flowchart LR
    U[Technician] --> A[Power Apps]
    A --> D[Equipment + contacts + procedures]
    A --> W[Power Automate]
    W --> V[Validation / notifications]
    D --> K[Reusable knowledge]
```

The application guides the technician. Data stores the knowledge. Automation handles controlled actions.

---

## 🇫🇷 Français

### Vue simple

```mermaid
flowchart LR
    U[Technicien] --> A[Power Apps]
    A --> D[Équipements + contacts + procédures]
    A --> W[Power Automate]
    W --> V[Validation / notifications]
    D --> K[Connaissance réutilisable]
```

L’application guide le technicien. Les données conservent la connaissance. L’automatisation gère les actions contrôlées.
