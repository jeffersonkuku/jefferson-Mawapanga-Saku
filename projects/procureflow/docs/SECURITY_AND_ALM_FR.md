# Sécurité, fiabilité et ALM — ProcureFlow

[English](SECURITY_AND_ALM.md) · [Français](SECURITY_AND_ALM_FR.md)

Le portfolio public ne prétend pas que la démonstration est elle-même un déploiement production. Ce document présente les contrôles attendus autour de la solution.

## Sécurité

- Les propriétés `Visible` / `DisplayMode` ne sont pas des mécanismes de sécurité.
- Les permissions SharePoint et les groupes imposent les accès réels.
- Le moindre privilège est appliqué aux utilisateurs et connexions.
- Les paramètres sensibles envoyés par Canvas sont revalidés côté serveur.
- Aucun secret ne doit être codé en dur.

## Fiabilité

- gestion explicite des erreurs d'écriture ;
- Scopes et Run After dans Power Automate ;
- idempotence pour les opérations rejouables ;
- prévention des doublons ;
- concurrence uniquement lorsque les opérations sont indépendantes ;
- prise en compte du throttling.

## Performance

- requêtes délégables ;
- filtres et traitements côté source ;
- pas de chargement complet d'une source distante pour contourner la délégation ;
- réduction des appels réseau et du fan-out.

## ALM

```text
DEV → TEST / UAT → PROD
```

Les composants sont transportés via Solutions avec Connection References, Environment Variables, versioning et stratégie de rollback.

Avant une mise en production : Re-check, App/Solution Checker, Monitor et tests de non-régression.
