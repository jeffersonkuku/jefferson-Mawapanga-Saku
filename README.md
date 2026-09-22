# Jefferson Mawapanga Saku — Power Platform & Digital Solutions Portfolio

[**English**](README.md) · [**Français**](README_FR.md)

Portfolio focused on **Microsoft Power Platform, business applications, workflow automation, SharePoint, reporting and operational digitalisation**.

The repository is organised as a **portfolio**, not as a dump of source files. Each project has its own case study, architecture, screenshots and demo material.

> **Public-code policy:** enterprise Power Apps packages, Power Fx implementation details, Power Automate exports, tenant URLs, credentials, connection references and confidential production data are intentionally not published.

---

## Featured projects

### 1. Building Operations Hub
**Power Apps · SharePoint · Power Automate · Entra ID · Responsive UX**

Industrial multi-technical / multi-service operations application for on-call assistance, equipment tutorials, contacts and hot barometry.

- Site → Building → Floor/Zone → Equipment → Action/Tutorial
- Start / Stop / Configuration / REX
- Governed contact and tutorial lifecycle
- Approval hierarchy and least-privilege security model
- Desktop, tablet, mobile portrait and mobile landscape
- Sanitised screenshots + public demo video

**[Open the case study →](projects/building-operations-hub/)**

---

### 2. ProcureFlow
**Power Apps · SharePoint · Power Automate · Microsoft 365**

Procurement and request-management platform covering request creation, validation, assignment, team queues, documents, notifications and lifecycle management.

The public repository documents the product and architecture without distributing the production application source.

**[Open the case study →](projects/procureflow/)**

---

### 3. RoadWords AU
**React · PWA · Audio learning · Leitner spaced repetition**

Audio-first English vocabulary trainer adapted from the open-source Motamot project, with Australian pronunciation lookup and mobile-first learning.

**[Open RoadWords AU →](roadwords-au/)**

> `roadwords-au/` contains the source project.  
> `roadwords-au-dist/` is the generated static deployment build used by the existing delivery workflow. They are intentionally separate, not duplicate portfolio folders.

---

## Repository structure

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

## Portfolio standards

Across the enterprise-oriented Power Platform case studies, I document:

- functional architecture and business process;
- SharePoint data/document responsibilities;
- Power Automate orchestration and server-side validation;
- least privilege and role-based access;
- delegation and performance considerations;
- explicit error-handling principles;
- responsive and accessible UX;
- DEV → TEST/UAT → PROD ALM;
- Solutions, Connection References and Environment Variables;
- App/Solution Checker, Monitor and regression-test expectations.

The public portfolio uses **synthetic or sanitised data only**.

---

## Contact / technical walkthrough

For enterprise applications, the source packages remain private. A **technical walkthrough can be provided during an interview or freelance discussion** without distributing the source code.
