# Security & Governance — Ticketing

[← Project](../README.md)

---

## 🇬🇧 English

### Main rule

**A hidden button is not security.**

```mermaid
flowchart LR
    A[User requests an action] --> B[Check identity + business rule]
    B -->|Allowed| C[Perform action]
    B -->|Not allowed| D[Reject]
    C --> E[Keep audit trail]
```

Sensitive actions should be checked where the data or automation is actually changed.

### Deployment

```mermaid
flowchart LR
    A[DEV] --> B[TEST / UAT]
    B --> C[PROD]
```

Changes should be tested before production, and environment-specific settings should not be hard-coded.

---

## 🇫🇷 Français

### Règle principale

**Cacher un bouton n’est pas une sécurité.**

```mermaid
flowchart LR
    A[Utilisateur demande une action] --> B[Vérifier identité + règle métier]
    B -->|Autorisé| C[Exécuter]
    B -->|Refusé| D[Rejeter]
    C --> E[Conserver une trace]
```

Les actions sensibles doivent être vérifiées là où les données ou automatisations sont réellement modifiées.

### Déploiement

```mermaid
flowchart LR
    A[DEV] --> B[TEST / UAT]
    B --> C[PROD]
```

Les changements doivent être testés avant la production et les paramètres liés à l’environnement ne doivent pas être codés en dur.
