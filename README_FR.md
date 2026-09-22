# Jefferson Mawapanga Saku — Portfolio Power Platform & Solutions digitales

[**English**](README.md) · [**Français**](README_FR.md)

Portfolio centré sur **Microsoft Power Platform, les applications métiers, l'automatisation des workflows, SharePoint, le reporting et la digitalisation des opérations**.

Le dépôt est organisé comme un **portfolio professionnel**, et non comme un ensemble de fichiers sources. Chaque projet dispose de sa propre étude de cas, de son architecture, de ses captures et de sa démonstration.

> **Politique de publication :** les packages Power Apps d'entreprise, les formules Power Fx d'implémentation, les exports Power Automate, URLs de tenant, identifiants, Connection References et données de production confidentielles ne sont volontairement pas publiés.

---

## Projets principaux

### 1. Building Operations Hub
**Power Apps · SharePoint · Power Automate · Entra ID · UX responsive**

Application d'exploitation industrielle multi-technique / multi-service destinée à l'astreinte, aux tutoriels équipements, à l'annuaire et à la barométrie à chaud.

- Site → Bâtiment → Étage/Zone → Équipement → Action/Tutoriel
- Marche / Arrêt / Paramétrage / REX
- cycle de vie gouverné des contacts et tutoriels
- hiérarchie d'approbation et moindre privilège
- desktop, tablette, mobile portrait et mobile paysage
- captures anonymisées + vidéo de démonstration publique

**[Voir l'étude de cas →](projects/building-operations-hub/README_FR.md)**

---

### 2. ProcureFlow
**Power Apps · SharePoint · Power Automate · Microsoft 365**

Plateforme de gestion des demandes achats couvrant la création, la validation, l'affectation, les files d'équipe, les documents, les notifications et le cycle de vie des demandes.

Le dépôt public documente le produit et l'architecture sans distribuer le code source de l'application de production.

**[Voir l'étude de cas →](projects/procureflow/README_FR.md)**

---

### 3. RoadWords AU
**React · PWA · Apprentissage audio · Répétition espacée Leitner**

Application mobile-first d'apprentissage du vocabulaire anglais, adaptée du projet open source Motamot, avec recherche de prononciations australiennes réelles.

**[Voir RoadWords AU →](roadwords-au/)**

> `roadwords-au/` contient le projet source.  
> `roadwords-au-dist/` contient le build statique généré utilisé par le workflow de déploiement existant. Ces deux dossiers ont volontairement des responsabilités différentes.

---

## Structure du dépôt

```text
.
├── README.md
├── README_FR.md
├── NOTICE.md
├── projects/
│   ├── building-operations-hub/
│   │   ├── README.md
│   │   ├── README_FR.md
│   │   ├── assets/
│   │   ├── demo/
│   │   └── docs/
│   └── procureflow/
│       ├── README.md
│       ├── README_FR.md
│       ├── assets/
│       ├── demo/
│       └── docs/
├── roadwords-au/
└── roadwords-au-dist/
```

---

## Standards présentés dans le portfolio

Pour les études de cas Power Platform orientées entreprise, je documente :

- l'architecture fonctionnelle et le processus métier ;
- les responsabilités SharePoint pour les données et documents ;
- l'orchestration Power Automate et la validation côté serveur ;
- le moindre privilège et les accès par rôle ;
- la délégation et la performance ;
- les principes de gestion explicite des erreurs ;
- l'UX responsive et accessible ;
- le cycle ALM DEV → TEST/UAT → PROD ;
- Solutions, Connection References et Environment Variables ;
- App/Solution Checker, Monitor et les attentes de tests de non-régression.

Le portfolio public utilise uniquement des **données synthétiques ou anonymisées**.

---

## Présentation technique

Pour les applications d'entreprise, les packages sources restent privés. Une **présentation technique détaillée peut être réalisée en entretien ou en discussion freelance** sans distribuer le code source.
