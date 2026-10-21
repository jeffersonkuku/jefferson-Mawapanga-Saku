# Sécurité & validations — version simple

[← Building Operations Hub](../README.md)

## Pourquoi valider les contributions ?

Un utilisateur terrain peut proposer une information utile, mais une proposition ne doit pas devenir automatiquement une procédure officielle.

\`\`\`mermaid
flowchart LR
    A[Proposition utilisateur] --> B[Vérifier droits / périmètre]
    B --> C[Relecture]
    C -->|Validée| D[Publier]
    C -->|Refusée| E[Retour / archivage]
    D --> F[Garder une trace]
\`\`\`

Même logique pour les actions sensibles : l’interface facilite l’action, mais la donnée ou l’automatisation doit vérifier qu’elle est réellement autorisée.

<details>
<summary><strong>Principes techniques</strong></summary>

Moindre privilège, validation côté serveur, traçabilité, actions destructives contrôlées, gestion explicite des erreurs et cycle DEV → TEST/UAT → PROD.

</details>
