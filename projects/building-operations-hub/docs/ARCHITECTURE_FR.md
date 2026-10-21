# Architecture — version simple

[← Building Operations Hub](../README.md)

## L’objectif

Le technicien doit voir **un parcours simple vers la bonne information**, même si plusieurs composants travaillent derrière.

\`\`\`mermaid
flowchart LR
    U[Technicien] --> A[Application]
    A --> D[Équipements / contacts / procédures]
    A --> W[Automatisation]
    W --> V[Validation / notification]
    D --> K[Connaissance réutilisable]
\`\`\`

- **Application :** guide l’utilisateur.
- **Données :** conservent équipements, contacts et connaissances.
- **Automatisation :** gère les actions contrôlées, validations et notifications.
- **Reporting :** exploite ensuite les retours terrain.

<details>
<summary><strong>Vue technique</strong></summary>

La conception cible repose sur Power Apps Canvas, Power Fx, SharePoint, Power Automate et Microsoft 365, avec UX responsive, séparation des responsabilités, contrôle des accès et déploiement par environnement.

</details>
