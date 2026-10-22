# Building Operations Hub

[← Portfolio](../../README.md) · [▶ Demo](https://www.youtube.com/watch?v=Y15BCn_i-fo)

---

## 🇬🇧 English

### Understand the project in 30 seconds

**Problem:** during an intervention, technicians can waste time searching through documents, contacts and people’s experience.

**Solution:** one field application organised like the real physical environment.

**Site → Building → Zone → Equipment → Action**

```mermaid
flowchart LR
    A[Site] --> B[Building]
    B --> C[Zone]
    C --> D[Equipment]
    D --> E[Action]
    E --> F[Procedure / contact / knowledge]
```

### Visual gallery — click to enlarge

<table>
<tr>
<td width="33%"><a href="./assets/01-home.png"><img src="./assets/01-home.png" width="100%"></a><br><b>Home</b></td>
<td width="33%"><a href="./assets/02-sites.png"><img src="./assets/02-sites.png" width="100%"></a><br><b>Sites</b></td>
<td width="33%"><a href="./assets/03-buildings.png"><img src="./assets/03-buildings.png" width="100%"></a><br><b>Buildings</b></td>
</tr>
<tr>
<td><a href="./assets/04-floors.png"><img src="./assets/04-floors.png" width="100%"></a><br><b>Zones</b></td>
<td><a href="./assets/05-equipment-library.png"><img src="./assets/05-equipment-library.png" width="100%"></a><br><b>Equipment</b></td>
<td><a href="./assets/06-equipment-detail.png"><img src="./assets/06-equipment-detail.png" width="100%"></a><br><b>Actions</b></td>
</tr>
<tr>
<td><a href="./assets/07-start-tutorial.png"><img src="./assets/07-start-tutorial.png" width="100%"></a><br><b>Start procedure</b></td>
<td><a href="./assets/08-configuration.png"><img src="./assets/08-configuration.png" width="100%"></a><br><b>Configuration</b></td>
<td><a href="./assets/09-troubleshooting.png"><img src="./assets/09-troubleshooting.png" width="100%"></a><br><b>Troubleshooting</b></td>
</tr>
<tr>
<td><a href="./assets/10-contacts.png"><img src="./assets/10-contacts.png" width="100%"></a><br><b>Contacts</b></td>
<td><a href="./assets/11-barometry-reference.png"><img src="./assets/11-barometry-reference.png" width="100%"></a><br><b>Intervention reference</b></td>
<td><a href="./assets/12-content-proposal.png"><img src="./assets/12-content-proposal.png" width="100%"></a><br><b>Content proposal</b></td>
</tr>
<tr>
<td><a href="./assets/13-barometry-rating.png"><img src="./assets/13-barometry-rating.png" width="100%"></a><br><b>Feedback</b></td>
<td></td><td></td>
</tr>
</table>

### What the user can do

Find the right equipment → open the right procedure → find the right contact → reuse or propose knowledge → leave feedback.

### Technical detail

- **[Architecture →](./docs/ARCHITECTURE.md)**
- **[User journey →](./docs/USER_JOURNEY.md)**
- **[Security & approvals →](./docs/SECURITY_AND_APPROVALS.md)**

---

## 🇫🇷 Français

### Comprendre le projet en 30 secondes

**Problème :** pendant une intervention, un technicien peut perdre du temps à chercher dans des documents, des contacts ou l’expérience des autres.

**Solution :** une seule application terrain organisée comme l’environnement physique réel.

**Site → Bâtiment → Zone → Équipement → Action**

```mermaid
flowchart LR
    A[Site] --> B[Bâtiment]
    B --> C[Zone]
    C --> D[Équipement]
    D --> E[Action]
    E --> F[Procédure / contact / connaissance]
```

### Galerie

Les **13 captures ci-dessus** sont cliquables pour être ouvertes en grand.

### Ce que l’utilisateur peut faire

Trouver le bon équipement → ouvrir la bonne procédure → trouver le bon contact → réutiliser ou proposer une connaissance → laisser un retour.

### Détail technique

- **[Architecture →](./docs/ARCHITECTURE.md)**
- **[Parcours utilisateur →](./docs/USER_JOURNEY.md)**
- **[Sécurité & validations →](./docs/SECURITY_AND_APPROVALS.md)**
