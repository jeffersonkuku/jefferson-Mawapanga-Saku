# Rôles & messages applicatifs / Roles & Application Messages

[← Documentation](./README.md)

> 🇫🇷 Cette page documente la conception cible des rôles et des messages visibles dans l’application.  
> *🇬🇧 This page documents the target design for roles and user-facing messages.*

## 1. Rôles cibles / Target roles

| Rôle | Accès principal |
|---|---|
| **Technicien / Technician** | consulter équipements, procédures, contacts, feedback, proposer du contenu |
| **Référent technique / Technical lead** | fonctions technicien + revue de contenu |
| **Manager / Manager** | lecture opérationnelle, feedback/KPI, visibilité élargie |
| **Administrateur / Administrator** | référentiels, droits applicatifs, paramètres |

🇫🇷 Ces rôles décrivent la cible fonctionnelle ; ils ne prétendent pas publier une matrice de sécurité de production réelle.  
*🇬🇧 These roles describe the functional target; they do not claim to publish a real production security matrix.*

## 2. Messages de navigation / Navigation messages

- « Sélectionnez d’abord un site. » / “Select a site first.”
- « Sélectionnez un bâtiment pour continuer. » / “Select a building to continue.”
- « Aucun équipement trouvé dans ce périmètre. » / “No equipment found in this scope.”
- « Aucun contenu publié pour cette action. » / “No published content is available for this action.”

## 3. Messages de chargement / Loading messages

- « Chargement des équipements… » / “Loading equipment…”
- « Recherche des procédures… » / “Searching procedures…”
- « Enregistrement de votre retour… » / “Saving your feedback…”
- « Envoi de votre proposition… » / “Submitting your proposal…”

## 4. Messages succès / Success messages

- « Votre retour a bien été enregistré. » / “Your feedback has been recorded.”
- « Votre proposition a été envoyée pour validation. » / “Your proposal has been submitted for review.”
- « Les informations ont été mises à jour. » / “Information has been updated.”

## 5. Messages d’erreur / Error messages

### Réseau
« Impossible de charger les données. Vérifiez votre connexion puis réessayez. »  
*“Unable to load data. Check your connection and try again.”*

### Accès
« Vous n’avez pas accès à cette action dans votre périmètre actuel. »  
*“You do not have access to this action in your current scope.”*

### Contenu
« Cette procédure n’est plus disponible ou a été remplacée. »  
*“This procedure is no longer available or has been replaced.”*

### Sauvegarde
« L’enregistrement a échoué. Aucune donnée n’a été confirmée. »  
*“Save failed. No data was confirmed.”*

## 6. Validation de contenu / Content review messages

### Référent
- « Nouvelle proposition à examiner. »
- « Le contenu a été publié. »
- « Le contenu a été refusé avec commentaire. »

### Auteur
- « Votre proposition est en cours de revue. »
- « Votre proposition a été validée. »
- « Votre proposition a été refusée : consultez le commentaire du référent. »

## 7. Principes UX / UX principles

- un seul message principal à la fois;
- éviter le jargon Power Platform;
- toujours indiquer l’action suivante;
- confirmation avant suppression;
- succès visible mais non bloquant;
- erreur bloquante seulement si l’action ne peut pas continuer.
