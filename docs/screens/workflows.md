# Workflows Screen

**Route:** `/workflows`

## Purpose

Lists all workflow definitions in the organisation. Users can browse, search, and open individual workflows to view their structure.

## Layout

- **Top Nav:** Workflow Header variant (title + search + action buttons).
- **Side Navigation:** Expanded, `workflows` item selected.
- **Main content:** Paginated table of workflow rows.

## Components Used

- `Side Navigation` — Expand=True, Type=Main
- `Nav` — Property 1=Workflow Header
- `Input` — Type=Search
- `Table` — Header=True rows + data rows with hover state
- `Paginator Row`
- `Tags` — ROI labels per workflow
- `Button` — Secondary, for actions (export, filter)
- `Breadcrumbs` — Home › Workflows

## Mock Data Shape

```ts
interface Workflow {
  id: string;
  name: string;
  roi: 'High' | 'Med' | 'Low' | 'NA' | 'Alert';
  team: string;
  processCount: number;
  lastUpdated: string; // ISO date
  status: 'Active' | 'Draft' | 'Archived';
}
```

## Interactions

| Action | Behaviour |
|---|---|
| Click row | Navigate to the workflow's process view |
| Search | Filter table rows client-side |
| Sort column header | Sort table by that column (ascending / descending) |
| Paginator | Show next/previous 10 rows |

## Notes

- Workflow rows display a `Tag` with the ROI value using the matching colour variant.
- The Compare Header variant of the Nav is used when two workflows are being compared side by side (future feature, not yet implemented in prototype).
