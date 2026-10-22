# Ticketing & Request Management

[← Portfolio](../../README.md) · [▶ Démo / Demo](https://www.youtube.com/watch?v=_jR8T9s2VUE)

> 🇫🇷 **Une application métier pour éviter qu’une demande se perde entre les e-mails, les documents, les relances et plusieurs équipes.**  
> *🇬🇧 A business application designed to prevent requests from getting lost between e-mails, documents, follow-ups and multiple teams.*

## ⚡ Comprendre en 30 secondes / Understand in 30 seconds

**🇫🇷 Problème :** les demandes sont dispersées et il devient difficile de savoir qui traite quoi, où sont les documents et quel est le statut réel.  
*🇬🇧 Problem: requests are scattered, making it hard to know who owns what, where documents are and what the real status is.*

**🇫🇷 Solution :** une seule application pour créer, router, affecter, traiter et clôturer la demande tout en conservant documents, commentaires, e-mails et historique.  
*🇬🇧 Solution: one application to create, route, assign, process and close the request while keeping documents, comments, e-mails and history together.*

**🇫🇷 Résultat :** le demandeur voit où en est sa demande et l’équipe opérationnelle voit immédiatement ce qu’elle doit traiter.  
*🇬🇧 Result: the requester can see request progress and the operational team can immediately see what needs attention.*

```mermaid
flowchart LR
    A[Créer<br/>Create] --> B[Router]
    B --> C[Affecter<br/>Assign]
    C --> D[Traiter<br/>Process]
    D --> E[Suivre<br/>Follow]
    E --> F[Clôturer<br/>Close]
```

## 🎬 Démonstration / Demo

<a href="https://www.youtube.com/watch?v=_jR8T9s2VUE"><img src="./assets/01-home_4K.png" width="100%"></a>

**[▶ Voir la vidéo complète / Watch the full demo →](https://www.youtube.com/watch?v=_jR8T9s2VUE)**

---

# Parcours complet image par image / Full image-by-image walkthrough

## 1. Accueil / Home dashboard

<a href="./assets/01-home_4K.png"><img src="./assets/01-home_4K.png" alt="Home dashboard" width="100%"></a>

🇫🇷 L’accueil sert de point d’entrée. L’utilisateur retrouve ses demandes récentes, les raccourcis vers ses tickets, les tickets du service et les actions importantes sans devoir connaître la structure technique derrière l’application.  
*🇬🇧 The home page is the entry point. Users see recent requests, shortcuts to personal tickets, service tickets and important actions without needing to understand the technical structure behind the app.*


## 2. Profil, absences et délégation / Profile, absence & delegation

<a href="./assets/02-profile_4K.png"><img src="./assets/02-profile_4K.png" alt="Profile, absence & delegation" width="100%"></a>

🇫🇷 Le profil regroupe le contexte de l’utilisateur et les informations d’absence/délégation. Le but est d’éviter qu’une absence bloque le traitement : la délégation peut être gérée comme une donnée métier temporaire plutôt que comme un changement permanent de rôle.  
*🇬🇧 The profile brings together the user context and absence/delegation information. The goal is to prevent an absence from blocking work: delegation can be managed as temporary business data rather than a permanent role change.*

```mermaid
flowchart LR
    A[Utilisateur absent<br/>User unavailable] --> B[Déclarer absence / délégation<br/>Record absence / delegation]
    B --> C[Période active<br/>Active period]
    C --> D[Contexte pris en compte<br/>Context considered]
    D --> E[Fin de période<br/>End date]
```

🇫🇷 Le flow documenté **PA_ProfilAbsencesDelegations_V1** prend en charge la gestion profil/absence/délégation côté automatisation. Les règles précises de droits de production ne sont pas publiées.  
*🇬🇧 The documented **PA_ProfilAbsencesDelegations_V1** flow handles profile/absence/delegation management on the automation side. Exact production permission rules are not published.*
## 3. Statistiques opérationnelles / Operational statistics

<a href="./assets/03-statistics_4K.png"><img src="./assets/03-statistics_4K.png" alt="Operational statistics" width="100%"></a>

🇫🇷 Cette vue transforme la file de tickets en indicateurs lisibles : charge ouverte, tickets non pris en charge, en cours, en attente, urgents ou en backlog. Le responsable peut comprendre la situation sans ouvrir chaque demande.  
*🇬🇧 This view turns the ticket queue into readable indicators: open workload, unowned tickets, in-progress, waiting, urgent and backlog items. A manager can understand the situation without opening every request.*


## 4. Mes tickets / My tickets

<a href="./assets/04-my-tickets_4K.png"><img src="./assets/04-my-tickets_4K.png" alt="My tickets" width="100%"></a>

🇫🇷 L’espace personnel sépare les brouillons des tickets réellement envoyés. Un brouillon reste un travail en cours : il ne doit pas polluer la file opérationnelle tant que l’utilisateur n’a pas confirmé la soumission finale.  
*🇬🇧 The personal workspace separates drafts from submitted tickets. A draft remains work in progress: it should not pollute the operational queue until the user confirms final submission.*

🇫🇷 Les valeurs par défaut seules ne doivent pas être considérées comme une modification métier.  
*🇬🇧 Default values alone should not be treated as meaningful business changes.*
## 5. Tickets du service / Service tickets

<a href="./assets/05-service-tickets_4K.png"><img src="./assets/05-service-tickets_4K.png" alt="Service tickets" width="100%"></a>

🇫🇷 Cette page est la file de travail des équipes. Elle permet de voir les demandes arrivées dans le service, d’identifier les urgences, de prendre en charge un ticket, de le réaffecter et de suivre son état.  
*🇬🇧 This page is the operational team queue. It shows requests arriving in the service, highlights urgency, allows ownership, reassignment and status follow-up.*


## 6. Création d’une demande / Request creation

<a href="./assets/06-create-ticket_4K.png"><img src="./assets/06-create-ticket_4K.png" alt="Request creation" width="100%"></a>

🇫🇷 La création guide l’utilisateur au lieu de lui demander de connaître les règles internes. Le formulaire s’adapte au type de demande et collecte uniquement les informations utiles avant la vérification finale.  
*🇬🇧 Creation guides the user instead of requiring knowledge of internal rules. The form adapts to the request type and collects only the useful information before final review.*

🇫🇷 Les parcours documentés couvrent : **Création de Part, Création de PO, Demande de soumission, Achat hors catalogue, Suivi d’une demande et Autre demande**.  
*🇬🇧 Documented journeys cover **Part creation, PO creation, quotation/submission request, off-catalogue purchase, request follow-up and other request**.*

```mermaid
flowchart LR
    A[Choisir le type<br/>Choose type] --> B[Formulaire adapté<br/>Adapted form]
    B --> C[Documents si besoin<br/>Documents if needed]
    C --> D[Vérification<br/>Review]
    D --> E[Soumission finale<br/>Final submission]
```
## 7. Gestion des équipes / Team management

<a href="./assets/07-team-management_4K.png"><img src="./assets/07-team-management_4K.png" alt="Team management" width="100%"></a>

🇫🇷 Cette vue centralise les équipes et leur organisation. Elle sert à structurer qui traite quoi et à éviter que les règles d’affectation restent uniquement dans la tête des utilisateurs.  
*🇬🇧 This view centralises teams and their organisation. It structures who handles what and avoids keeping assignment rules only in users’ heads.*


## 8. Paramètres et routage / Settings & routing

<a href="./assets/08-settings_4K.png"><img src="./assets/08-settings_4K.png" alt="Settings & routing" width="100%"></a>

🇫🇷 Les paramètres permettent de piloter le comportement du système sans modifier l’interface pour chaque règle. Le routage sert à envoyer les demandes vers le bon périmètre et à préparer rappels, réaffectations ou escalades.  
*🇬🇧 Settings let the system behaviour be managed without changing the interface for every rule. Routing sends requests to the correct scope and supports reminders, reassignment or escalation.*

```mermaid
flowchart LR
    A[Nouvelle demande<br/>New request] --> B[Règles de routage<br/>Routing rules]
    B --> C[Équipe cible<br/>Target team]
    C --> D[Affectation / rappel<br/>Assignment / reminder]
    D --> E[Escalade si nécessaire<br/>Escalation if needed]
```
## 9. Gestion des accès / Access management

<a href="./assets/09-access-management_4K.png"><img src="./assets/09-access-management_4K.png" alt="Access management" width="100%"></a>

🇫🇷 La gestion des accès sépare l’expérience utilisateur de la sécurité réelle. Masquer un bouton améliore l’interface, mais les actions sensibles doivent aussi être contrôlées au niveau des données ou des flows.  
*🇬🇧 Access management separates user experience from real security. Hiding a button improves the interface, but sensitive actions must also be controlled at the data or flow layer.*


## 10. Délégations / Delegations

<a href="./assets/10-delegations_4K.png"><img src="./assets/10-delegations_4K.png" alt="Delegations" width="100%"></a>

🇫🇷 Cette page donne une vue administrative des délégations temporaires. Le principe est de conserver une période, un contexte et une trace afin qu’un remplacement soit contrôlé et réversible.  
*🇬🇧 This page gives an administrative view of temporary delegations. The principle is to keep a period, context and trace so replacement access is controlled and reversible.*

```mermaid
flowchart LR
    A[Absence] --> B[Délégation temporaire<br/>Temporary delegation]
    B --> C[Contexte / période<br/>Scope / period]
    C --> D[Utilisation pendant la période<br/>Used during period]
    D --> E[Expiration / retour normal<br/>Expiry / normal state]
    C --> F[Historique<br/>History]
```
## 11. Journal d’administration / Administration journal

<a href="./assets/11-admin-journal_4K.png"><img src="./assets/11-admin-journal_4K.png" alt="Administration journal" width="100%"></a>

🇫🇷 Le journal sert à garder une trace des actions d’administration et des changements importants. Cette traçabilité permet de comprendre qui a modifié quoi et de diagnostiquer plus facilement les incohérences.  
*🇬🇧 The administration journal keeps a trace of administrative actions and important changes. This traceability helps explain who changed what and makes inconsistencies easier to diagnose.*


## 12. Détail d’un ticket / Ticket detail

<a href="./assets/12-ticket-detail_4K.png"><img src="./assets/12-ticket-detail_4K.png" alt="Ticket detail" width="100%"></a>

🇫🇷 Le ticket devient le point de référence unique : statut, urgence, équipe, responsable, activité, commentaires, documents, e-mails liés et historique sont regroupés au même endroit.  
*🇬🇧 The ticket becomes the single reference point: status, urgency, team, owner, activity, comments, documents, linked e-mails and history are kept together.*

```mermaid
flowchart TB
    T[Ticket] --> S[Statut / Status]
    T --> O[Responsable / Owner]
    T --> C[Commentaires / Comments]
    T --> D[Documents]
    T --> M[E-mails liés / Linked e-mails]
    T --> H[Historique / History]
```
## 13. Archivage Outlook / Outlook conversation archiving

<a href="./assets/13-outlook-archive_4K.png"><img src="./assets/13-outlook-archive_4K.png" alt="Outlook conversation archiving" width="100%"></a>

🇫🇷 L’utilisateur peut rattacher une conversation Outlook au ticket. Les messages et pièces jointes sont archivés afin que le contexte métier reste consultable depuis le ticket sans dépendre uniquement de la boîte mail d’origine.  
*🇬🇧 The user can attach an Outlook conversation to the ticket. Messages and attachments are archived so business context remains readable from the ticket without relying only on the original mailbox.*

```mermaid
flowchart LR
    A[Conversation Outlook] --> B[Recherche / lecture<br/>Search / read]
    B --> C[Archivage messages + PJ<br/>Archive messages + attachments]
    C --> D[SharePoint]
    D --> E[Lecture depuis le ticket<br/>Read from ticket]
```


---

# 🔄 Cycle complet d’une demande / Full request lifecycle

```mermaid
flowchart LR
    A[Création locale<br/>Local creation] --> B{Travail commencé ?<br/>Meaningful work?}
    B -->|Oui / Yes| C[Brouillon<br/>Draft]
    B -->|Non / No| A
    C --> D[Reprendre / compléter<br/>Resume / complete]
    D --> E[Soumission finale<br/>Final submission]
    E --> F[Routage équipe<br/>Team routing]
    F --> G[Prise en charge<br/>Ownership]
    G --> H[Traitement<br/>Processing]
    H --> I[Attente si besoin<br/>Waiting if needed]
    I --> H
    H --> J[Terminé<br/>Completed]
    J --> K[Clôturé + historique<br/>Closed + history]
```

🇫🇷 Un document peut être ajouté pendant la préparation sans transformer automatiquement le brouillon en ticket soumis.  
*🇬🇧 A document can be added during preparation without automatically turning the draft into a submitted ticket.*

# 🧩 Architecture technique globale / Overall technical architecture

```mermaid
flowchart TB
    U[Demandeurs / équipes / admins<br/>Requesters / teams / admins] --> APP[Power Apps Canvas]

    APP --> SP[(SharePoint<br/>tickets / configuration / history)]
    APP --> DOC[(SharePoint Documents)]
    APP --> FLOW[Power Automate]

    FLOW --> SP
    FLOW --> DOC
    FLOW --> OUT[Office 365 Outlook]
    FLOW --> USERS[Office 365 Users]

    SP --> KPI[KPI / statistiques<br/>KPIs / statistics]
    SP --> AUD[Historique / audit<br/>History / audit]

    DEL[Délégations / absences<br/>Delegations / absences] --> PF[PA_ProfilAbsencesDelegations_V1]
    PF --> SP
    SP --> APP
```

**🇫🇷 Power Apps** gère l’expérience utilisateur, la navigation, les formulaires et les interactions.  
*🇬🇧 Power Apps manages the user experience, navigation, forms and interactions.*

**🇫🇷 SharePoint** stocke les tickets, documents, paramètres, historiques et données d’accès nécessaires au fonctionnement.  
*🇬🇧 SharePoint stores tickets, documents, settings, history and access-related business data.*

**🇫🇷 Power Automate** gère les traitements contrôlés : routage, actions ticket, documents, notifications, Outlook, délégations et traitements programmés.  
*🇬🇧 Power Automate handles controlled processing: routing, ticket actions, documents, notifications, Outlook, delegations and scheduled work.*

**🇫🇷 Outlook / Office 365 Users** fournissent l’intégration messagerie et la résolution des utilisateurs.  
*🇬🇧 Outlook / Office 365 Users provide e-mail integration and user resolution.*

# ⚙️ Paysage des automatisations / Automation landscape

```mermaid
flowchart TB
    F[27 flows documentés<br/>27 documented flows] --> T[Cycle ticket<br/>Ticket lifecycle]
    F --> D[Documents]
    F --> M[Outlook & notifications]
    F --> A[Administration / accès<br/>Administration / access]

    T --> T1[Brouillons / Drafts]
    T --> T2[Soumission / Submission]
    T --> T3[Routage / Routing]
    T --> T4[Actions & KPI]

    D --> D1[Staging]
    D --> D2[Pièces ticket<br/>Ticket documents]
    D --> D3[Maintenance]

    M --> M1[Recherche Outlook<br/>Outlook search]
    M --> M2[Archivage conversation<br/>Conversation archive]
    M --> M3[Notifications]

    A --> A1[Équipes / Teams]
    A --> A2[Accès / Access]
    A --> A3[Délégations / Delegations]
    A --> A4[Paramètres / Settings]
```

# 🛡️ Sécurité, fiabilité et performance / Security, reliability & performance

🇫🇷 L’interface n’est pas considérée comme la frontière de sécurité : une action sensible doit être revalidée côté donnée ou flow.  
*🇬🇧 The interface is not treated as the security boundary: sensitive actions should be revalidated at the data or flow layer.*

🇫🇷 La conception documente aussi la réduction des Refresh inutiles, le filtrage côté source, la limitation des appels séquentiels, la gestion explicite des erreurs, les contrôles anti-doublons/idempotence et la traçabilité.  
*🇬🇧 The design also documents reduced unnecessary Refresh calls, source-side filtering, fewer sequential network calls, explicit error handling, duplicate/idempotency controls and traceability.*

```mermaid
flowchart LR
    A[Action utilisateur<br/>User action] --> B[Validation]
    B --> C[Mutation critique<br/>Critical mutation]
    C --> D[Réponse à l’app<br/>Response to app]
    C --> E[Travail indépendant<br/>Independent background work]
    E --> F[Historique / erreur<br/>History / error]
```

# 📦 Échelle documentée / Documented scale

- **28** écrans Canvas / Canvas screen definitions
- **27** flows Power Automate / Power Automate flows
- **29** variables d’environnement / environment-variable definitions
- Connecteurs documentés : **SharePoint, Office 365 Outlook, Office 365 Users**

# 🔎 Détails techniques / Technical deep dive

- [Architecture détaillée / Detailed architecture](./docs/ARCHITECTURE.md)
- [Parcours utilisateur / User journey](./docs/USER_JOURNEY.md)
- [Catalogue des flows / Flow catalogue](./docs/FLOW_CATALOG.md)
- [Sécurité & gouvernance / Security & governance](./docs/SECURITY_GOVERNANCE.md)
- [Notes de démonstration / Demo notes](./demo/README.md)

---

🇫🇷 Cette version publique est anonymisée : les packages de production, URL tenant, secrets, données confidentielles et exports sources complets ne sont pas publiés.  
*🇬🇧 This public version is sanitised: production packages, tenant URLs, secrets, confidential data and full source exports are not published.*
