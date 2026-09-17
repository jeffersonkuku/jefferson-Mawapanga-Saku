# Representative Power Fx Patterns

These examples are **sanitised portfolio samples**. They demonstrate coding style and application patterns without publishing production formulas, list names, IDs or tenant-specific values.

> Power Fx separators can vary by authoring locale. Adapt `,` / `;` as required by the target environment.

## 1. Demo data initialisation

For the public demo, local collections can provide synthetic records without a production connection.

```powerfx
ClearCollect(
    colDemoTeams,
    { ID: 1, Name: "Procurement Operations" },
    { ID: 2, Name: "Supplier Management" },
    { ID: 3, Name: "Purchasing Support" }
);

ClearCollect(
    colDemoRequests,
    {
        ID: 1001,
        RequestNumber: "REQ-1001",
        RequestType: "Quotation request",
        RequesterName: "Alex Morgan",
        AssignedToName: "Jordan Lee",
        TeamName: "Procurement Operations",
        Status: "In progress",
        Urgency: "Normal"
    },
    {
        ID: 1002,
        RequestNumber: "REQ-1002",
        RequestType: "Purchase order",
        RequesterName: "Taylor Smith",
        AssignedToName: "Casey Brown",
        TeamName: "Purchasing Support",
        Status: "To be accepted",
        Urgency: "High"
    }
);
```

This pattern is suitable for a portfolio/demo mode. A production app should query its governed data source instead of loading a full remote list into a local collection as a delegation workaround.

---

## 2. Local demo search and sort

```powerfx
SortByColumns(
    Filter(
        colDemoRequests,
        IsBlank(txtSearch.Text) ||
        StartsWith(RequestNumber, txtSearch.Text) ||
        StartsWith(RequesterName, txtSearch.Text)
    ),
    "RequestNumber",
    SortOrder.Descending
)
```

Because this example operates on a local demo collection, it does not represent the delegation strategy used for a large production data source.

---

## 3. Controlled navigation with `With`

```powerfx
With(
    {
        selectedRequest: LookUp(
            colDemoRequests,
            ID = ThisItem.ID
        )
    },
    Set(varSelectedRequest, selectedRequest);
    Navigate(scrRequestDetail)
)
```

`With` keeps intermediate values close to the formula that uses them and avoids creating unnecessary global state.

---

## 4. Production-style write with explicit error handling

The following is an illustrative pattern using a generic data source named `Requests`.

```powerfx
IfError(
    Set(
        varSavedRequest,
        Patch(
            Requests,
            Defaults(Requests),
            {
                Title: txtRequestTitle.Text,
                Description: txtDescription.Text,
                Status: "Submitted"
            }
        )
    ),
    Notify(
        "The request could not be saved. Please try again or contact support.",
        NotificationType.Error
    ),
    Notify(
        "Request created successfully.",
        NotificationType.Success
    )
)
```

In a real application, field types and server-side validation must match the target data source.

---

## 5. Form submission events

For an Edit Form control, success and failure behaviour should be explicit.

### Submit button

```powerfx
SubmitForm(frmRequest)
```

### `frmRequest.OnSuccess`

```powerfx
Set(varSelectedRequest, frmRequest.LastSubmit);
Notify("Request saved successfully.", NotificationType.Success);
Navigate(scrRequestDetail)
```

### `frmRequest.OnFailure`

```powerfx
Notify(
    Coalesce(frmRequest.Error, "The request could not be saved."),
    NotificationType.Error
)
```

---

## 6. Independent initialisation with `Concurrent`

Use concurrency only when operations do not depend on one another.

```powerfx
Concurrent(
    ClearCollect(
        colDemoStatuses,
        { Value: "To be accepted" },
        { Value: "In progress" },
        { Value: "Waiting" },
        { Value: "Closed" }
    ),
    ClearCollect(
        colDemoPriorities,
        { Value: "Normal" },
        { Value: "High" },
        { Value: "Critical" }
    )
)
```

Do not use `Concurrent` when one operation requires the result of another.

---

## 7. Safe display fallback with `Coalesce`

```powerfx
Coalesce(
    varSelectedRequest.AssignedToName,
    "Unassigned"
)
```

This keeps the display logic readable when a value is optional.

---

## 8. Demo-mode action simulation

For a portfolio version, a button can simulate a workflow result while keeping the real production flow private.

```powerfx
UpdateContext({ locSubmitting: true });

Set(
    varDemoResult,
    {
        Success: true,
        Message: "Demo request submitted successfully"
    }
);

UpdateContext({ locSubmitting: false });

If(
    varDemoResult.Success,
    Notify(varDemoResult.Message, NotificationType.Success),
    Notify("Demo action failed.", NotificationType.Error)
)
```

This should be clearly identified as demo behaviour and not confused with a real server-side transaction.

---

# Notes for technical reviewers

The production-oriented principles behind the application include:

- delegation-aware remote queries;
- minimal client-side fan-out;
- explicit write error handling;
- source-side security rather than UI-only restrictions;
- careful state management;
- reusable components and containers;
- controlled use of collections and global variables;
- server-side workflow validation for sensitive actions.

Microsoft delegation reference:

https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/delegation-overview
