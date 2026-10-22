# Building Operations Hub

[← Portfolio](../../README.md) · [▶ Demo](https://www.youtube.com/watch?v=Y15BCn_i-fo)

---

## 🇬🇧 English

### Understand the project in 30 seconds

**Problem:** during an intervention, technicians may waste time searching through documents, contacts and people’s experience.

**Solution:** one field application organised like the real physical environment.

**Site → Building → Zone → Equipment → Action**

[![Building Operations Hub](./assets/01-home.png)](https://www.youtube.com/watch?v=Y15BCn_i-fo)

### How it works

```mermaid
flowchart LR
    A[Choose site] --> B[Choose building]
    B --> C[Choose zone]
    C --> D[Choose equipment]
    D --> E[Choose action]
    E --> F[Open procedure / contact / knowledge]
```

### What the user can do

- find the right equipment;
- open start, stop, configuration or troubleshooting procedures;
- find technical contacts;
- reuse lessons learned;
- propose new technical content;
- leave post-intervention feedback.

### Visual journey

[![Home](./assets/01-home.png)](./assets/01-home.png)

[![Site](./assets/02-sites.png)](./assets/02-sites.png)

[![Building](./assets/03-buildings.png)](./assets/03-buildings.png)

[![Zone](./assets/04-floors.png)](./assets/04-floors.png)

[![Equipment](./assets/05-equipment-library.png)](./assets/05-equipment-library.png)

[![Equipment actions](./assets/06-equipment-detail.png)](./assets/06-equipment-detail.png)

[![Procedure](./assets/07-start-tutorial.png)](./assets/07-start-tutorial.png)

[![Configuration](./assets/08-configuration.png)](./assets/08-configuration.png)

[![Troubleshooting](./assets/09-troubleshooting.png)](./assets/09-troubleshooting.png)

[![Contacts](./assets/10-contacts.png)](./assets/10-contacts.png)

[![Content proposal](./assets/12-content-proposal.png)](./assets/12-content-proposal.png)

[![Feedback](./assets/13-barometry-rating.png)](./assets/13-barometry-rating.png)

### Want the technical detail?

- **[Architecture →](./docs/ARCHITECTURE.md)**
- **[User journey →](./docs/USER_JOURNEY.md)**
- **[Security & approvals →](./docs/SECURITY_AND_APPROVALS.md)**

---

## 🇫🇷 Français

### Comprendre le projet en 30 secondes

**Problème :** pendant une intervention, un technicien peut perdre du temps à chercher dans des documents, des contacts ou l’expérience des autres.

**Solution :** une seule application terrain organisée comme l’environnement physique réel.

**Site → Bâtiment → Zone → Équipement → Action**

### Fonctionnement

```mermaid
flowchart LR
    A[Choisir le site] --> B[Choisir le bâtiment]
    B --> C[Choisir la zone]
    C --> D[Choisir l’équipement]
    D --> E[Choisir l’action]
    E --> F[Ouvrir procédure / contact / connaissance]
```

### Ce que l’utilisateur peut faire

- retrouver le bon équipement ;
- ouvrir les procédures marche, arrêt, paramétrage ou dépannage ;
- trouver les contacts techniques ;
- réutiliser les retours d’expérience ;
- proposer un nouveau contenu technique ;
- donner un retour après intervention.

### Parcours visuel

Les captures ci-dessus suivent exactement ce parcours et sont cliquables pour être ouvertes en grand.

### Pour aller plus loin techniquement

- **[Architecture →](./docs/ARCHITECTURE.md)**
- **[Parcours utilisateur →](./docs/USER_JOURNEY.md)**
- **[Sécurité & validations →](./docs/SECURITY_AND_APPROVALS.md)**
