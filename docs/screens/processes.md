# Processes Screen

**Route:** `/processes`

## Purpose

Shows active process instances — individual executions of a workflow. Each process has a visual node map representing its steps.

## Layout

- **Top Nav:** Process Header variant (breadcrumb + action buttons + segment control).
- **Side Navigation:** `processes` item selected.
- **Main area:** Split view — process list on the left, workflow node map on the right.
- **Detail panel:** Opens on the right when a node is selected (`Map Details` component).

## Components Used

- `Side Navigation` — Expand=True, Type=Process
- `Nav` — Property 1=Process Header
- `Segment Control` — toggle between list view and map view
- `Workflow Elements` — Number, Branch, Start, Node variants with Expand/Active states
- `Map Details` — Type=Node and Type=Question, with Open/Hover/Active states
- `Details` — expandable accordion for step metadata
- `Tags` — status labels
- `Chat Input` + `Chat Action` — AI assistant panel
- `Automation Recommendations` — suggestions surfaced alongside active nodes
- `Breadcrumbs` — Home › Workflows › [Workflow Name] › Processes

## Mock Data Shape

```ts
interface Process {
  id: string;
  workflowId: string;
  workflowName: string;
  startedAt: string;       // ISO date
  status: 'Running' | 'Completed' | 'Failed' | 'Paused';
  currentNodeId: string;
  nodes: ProcessNode[];
}

interface ProcessNode {
  id: string;
  type: 'Start' | 'Number' | 'Branch' | 'Node';
  label: string;
  status: 'Pending' | 'Active' | 'Done' | 'Failed';
  children?: string[];     // node IDs
}
```

## Interactions

| Action | Behaviour |
|---|---|
| Click node | Opens `Map Details` panel for that node |
| Expand node | Shows sub-steps inside a node |
| Toggle Segment Control | Switch between list and visual map |
| Chat Input | Sends message to mock AI assistant, returns static reply |
| Automation Recommendation | Click to expand recommendation detail |

## Notes

- The AI chat returns mocked responses — no real LLM call.
- Node map is rendered with absolute positioning inside a scrollable canvas area; it is not an interactive drag canvas in the prototype.
