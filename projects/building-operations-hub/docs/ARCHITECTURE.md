# Architecture — Building Operations Hub

[← Projet / Project](../README.md)

```mermaid
flowchart TB
    U[Techniciens / managers<br/>Technicians / managers] --> ID[Entra ID]
    ID --> APP[Power Apps]
    APP --> SP[(SharePoint Lists)]
    APP --> LIB[(Document / media libraries)]
    APP --> FLOW[Power Automate]
    FLOW --> SP
    FLOW --> LIB
    FLOW --> APPR[Approvals]
    FLOW --> MSG[Email / Teams]
    FLOW --> AUD[Audit]
    SP --> BI[Power BI / KPI]
```

🇫🇷 **Power Apps** guide l’utilisateur et gère navigation, recherche et formulaires.  
*🇬🇧 **Power Apps** guides the user and manages navigation, search and forms.*

🇫🇷 **SharePoint** conserve équipements, contacts, métadonnées et contenus.  
*🇬🇧 **SharePoint** stores equipment, contacts, metadata and content.*

🇫🇷 **Power Automate** gère validations, notifications et actions contrôlées.  
*🇬🇧 **Power Automate** handles approvals, notifications and controlled actions.*

🇫🇷 **Power BI** exploite les données de feedback et de performance.  
*🇬🇧 **Power BI** uses feedback and performance data.*
