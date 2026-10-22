# Sécurité & validations / Security & Approvals

[← Projet / Project](../README.md)

## ✅ Validation d’un contenu / Content approval

```mermaid
flowchart LR
    A[Proposition terrain<br/>Field proposal] --> B[Vérifier périmètre / droits<br/>Check scope / rights]
    B --> C[Relecture<br/>Review]
    C -->|Validé / Approved| D[Publier<br/>Publish]
    C -->|Refusé / Rejected| E[Retour / archive<br/>Return / archive]
    D --> F[Historique<br/>Audit]
```

🇫🇷 Une proposition terrain ne devient pas automatiquement une procédure officielle.  
*🇬🇧 A field proposal does not automatically become official guidance.*

🇫🇷 Les actions sensibles doivent être validées côté source/flow, pas uniquement cachées dans l’interface.  
*🇬🇧 Sensitive actions should be validated at the source/flow layer, not only hidden in the interface.*
