# Flow Catalogue

[← Case study](../README.md)

The current supplied solution contains **27 Power Automate flows**. This page documents responsibilities only; workflow JSON and implementation expressions are intentionally not published.

## Ticket, drafts and routing

| Flow | Public responsibility |
|---|---|
| PA_BrouillonsTicket_V1 | Save/resume/delete draft lifecycle |
| PA_ActionsTicket | Controlled ticket actions and status transitions |
| PA_InitialiserTransmissionTicket | Final submission / initial transmission |
| PA_MoteurRoutageTickets | Routing, ownership and escalation processing |
| PA_KPITicketsService_V1 | Service-ticket KPI calculation |

## Documents

| Flow | Public responsibility |
|---|---|
| PA_DocumentStaging_V1 | Stage documents before final ticket submission |
| PA_DocumentsListerStaging_V1 | Read staged document metadata |
| PA_DocumentsSupprimerPieceStaging_V1 | Remove a staged document |
| PA_DocumentsTicket_V2 | Final ticket document handling |
| PA_MaintenanceDocuments | Scheduled document maintenance / cleanup |

## Outlook and notifications

| Flow | Public responsibility |
|---|---|
| PA_Outlook_RechercherMessages_V1 | Search Outlook messages for the attachment experience |
| PA_RattacherConversationOutlook | Attach/archive an Outlook conversation to a ticket |
| PA_SynchroniserConversationsOutlook | Keep archived conversation content synchronised |
| PA_Mail_DetecterNouveauxDocuments | Detect document-related notification events |
| PA_Mail_GererAffectation | Assignment-related notification logic |
| PA_Mail_EnvoyerNotifications | Deliver queued notifications |
| PA_Mail_CreerNotificationsHistorique | Create notification/history records |
| PA_Mail_NotifierAjoutCopie | Notify when a user is added in copy |
| PA_AjouterCopiesTicket_V2 | Server-side copy/subscriber management |

## Administration, access and configuration

| Flow | Public responsibility |
|---|---|
| PA_AdministrationParametres_V1 | Application parameter administration |
| PA_AdministrationAccesEquipes_V1 | Team/access administration |
| PA_AdministrationNotifications_V1 | Notification configuration |
| PA_AdministrationReglesRoutage_V1 | Routing-rule administration |
| PA_ProfilAbsencesDelegations_V1 | Profile absence and delegation management |
| PA_FavorisNavigateurSharePoint_V1 | SharePoint favourites |
| PA_Graph_NavigateurSharePoint_V2 | SharePoint navigation/search experience |
| PA_ArchivageRetentionTickets | Ticket archive / retention processing |

## Engineering patterns

The flows are designed around:

- server-side validation of sensitive inputs;
- explicit error branches and diagnostic history;
- environment variables instead of hard-coded environment configuration;
- connection references for solution-aware deployment;
- idempotency / duplicate-control considerations for repeated events;
- bounded concurrency for independent work;
- source-side filtering to reduce SharePoint and Outlook payloads;
- separation between user-facing acknowledgement and longer background work where safe.
