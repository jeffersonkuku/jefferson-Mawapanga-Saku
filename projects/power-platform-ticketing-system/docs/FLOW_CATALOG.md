# Automation catalogue — what the flows do

[← Ticketing project](../README.md)

There are **27 documented Power Automate flows**. This page starts with the business jobs they perform rather than technical names.

## 1. Keep the ticket lifecycle moving

\`\`\`mermaid
flowchart LR
    A[Draft] --> B[Submit]
    B --> C[Route to team]
    C --> D[Assign / reassign]
    D --> E[Update status]
    E --> F[Close / archive]
\`\`\`

These automations handle drafts, controlled ticket actions, first submission, routing and service KPIs.

## 2. Keep documents attached to the right request

Documents can be staged before submission, listed, removed, transferred to the final ticket and maintained later.

## 3. Keep e-mail conversations and notifications connected

Automations can search Outlook, attach a conversation, synchronise archived content and send assignment / copy / notification messages.

## 4. Keep administration manageable

Administration flows cover teams, access, routing rules, notification settings, profile absences/delegations, SharePoint navigation/favourites and retention.

<details>
<summary><strong>Technical flow names</strong></summary>

### Ticket lifecycle
- PA_BrouillonsTicket_V1
- PA_ActionsTicket
- PA_InitialiserTransmissionTicket
- PA_MoteurRoutageTickets
- PA_KPITicketsService_V1

### Documents
- PA_DocumentStaging_V1
- PA_DocumentsListerStaging_V1
- PA_DocumentsSupprimerPieceStaging_V1
- PA_DocumentsTicket_V2
- PA_MaintenanceDocuments

### Outlook & notifications
- PA_Outlook_RechercherMessages_V1
- PA_RattacherConversationOutlook
- PA_SynchroniserConversationsOutlook
- PA_Mail_DetecterNouveauxDocuments
- PA_Mail_GererAffectation
- PA_Mail_EnvoyerNotifications
- PA_Mail_CreerNotificationsHistorique
- PA_Mail_NotifierAjoutCopie
- PA_AjouterCopiesTicket_V2

### Administration
- PA_AdministrationParametres_V1
- PA_AdministrationAccesEquipes_V1
- PA_AdministrationNotifications_V1
- PA_AdministrationReglesRoutage_V1
- PA_ProfilAbsencesDelegations_V1
- PA_FavorisNavigateurSharePoint_V1
- PA_Graph_NavigateurSharePoint_V2
- PA_ArchivageRetentionTickets

</details>
