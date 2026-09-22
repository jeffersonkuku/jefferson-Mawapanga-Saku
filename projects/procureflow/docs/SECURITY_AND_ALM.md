# Security, Reliability and ALM

This public portfolio does **not** claim that the demo package itself is a production deployment. The purpose of this document is to show the production-oriented engineering controls considered around the solution.

## Security

### SharePoint permissions are the security boundary

Power Apps properties such as `Visible` or `DisplayMode` are UX controls, not security controls.

Production access must be enforced at the data/service layer through appropriate SharePoint permissions, groups and environment governance.

### Least privilege

Users and service connections should receive only the permissions required for their role.

### Sensitive actions

Parameters received from a Canvas App should not be trusted only because the UI restricted the available options. Sensitive operations should be validated again in the server-side workflow or data layer.

### Secrets

No secrets, credentials or production tokens should be stored in Power Fx formulas, flow definitions committed publicly, screenshots or documentation.

---

## Reliability

### Explicit error handling

Writes should use patterns that surface failures to the user rather than assuming success.

Examples include:

- `SubmitForm` with `OnSuccess` / `OnFailure`;
- `Patch` wrapped in `IfError` where appropriate;
- structured Power Automate scopes with failure handling and `Run after` configuration.

### Idempotency and duplicate prevention

Workflow operations that can be retried should be designed so that a retry does not create duplicate business records, duplicate documents or repeated notifications.

### Concurrency

Parallel execution should only be used for operations that are truly independent.

### Throttling

Large fan-out patterns, nested loops and line-by-line remote writes should be avoided where a more source-oriented or batched design is possible.

---

## Performance

### Delegation

For remote data sources, filtering and sorting should remain delegable where supported so that the source performs the query rather than the client downloading an incomplete subset.

Microsoft Learn reference:

https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/delegation-overview

### Avoid full-list loading as a workaround

Increasing the Power Apps data row limit or loading an entire remote list into a collection is not treated as a fix for delegation issues.

### Network efficiency

The design aims to minimise:

- repeated remote lookups;
- unnecessary refreshes;
- N+1 query patterns;
- large local collections;
- row-by-row network mutations from Canvas Apps.

---

## Maintainability

The application architecture favours:

- reusable components;
- containers and consistent layout patterns;
- centralised configuration where appropriate;
- clear naming;
- explicit lifecycle states;
- separated flow responsibilities;
- comments around non-obvious logic;
- limited cross-screen dependencies.

---

## ALM

### Environment strategy

Production-oriented delivery follows:

**DEV → TEST → PROD**

Normal feature development should occur outside production.

### Solutions

Microsoft documents solutions as the Power Platform mechanism for application lifecycle management across apps and flows.

Reference:

https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm

### Environment variables

Environment-specific values such as data-source references and configuration should be externalised instead of being hard-coded into application formulas.

References:

https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables

https://learn.microsoft.com/en-us/power-apps/maker/data-platform/environmentvariables-data-source-canvas-apps

### Connection references

Connection references should be managed with the solution so that deployment between environments does not depend on editing production formulas manually.

### Source control

Unmanaged development assets and solution source should be versioned according to the team's ALM process.

---

## Validation before a production release

A production release should include, as applicable:

- functional testing;
- permission testing;
- DLP validation;
- delegation review;
- error-path testing;
- concurrency / duplicate testing;
- responsive and accessibility checks;
- App Checker / Solution Checker review;
- runtime monitoring;
- licence-impact review;
- deployment / rollback validation;
- regression testing.

## Portfolio status

The public repository is a **documentation and demonstration asset**, not a production deployment package.

Any real production version would require revalidation in its target tenant, environment, connectors, permissions and licensing context.
