# Teams Screen

**Route:** `/teams`

## Purpose

Lists all teams in the organisation. Each team is associated with one or more workflows and has a set of members.

## Layout

- **Top Nav:** Workflow Header variant (re-used for Teams).
- **Side Navigation:** `teams` item selected.
- **Main content:** Card grid or table of teams, each showing name, member count, and assigned workflows.
- **Detail panel (optional):** Opens on row/card click, showing team workflows and members list.

## Components Used

- `Side Navigation` — Expand=True, Type=Main
- `Nav` — Property 1=Workflow Header
- `List Item` — Type=Team, with hover state
- `Tags` — workflow ROI labels inside team cards
- `Variants` — avatar chips for team member previews (up to 5, then `+N` overflow)
- `Button` — Secondary (invite member, edit team)
- `Input` — Type=Search (filter teams)
- `Breadcrumbs` — Home › Teams

## Mock Data Shape

```ts
interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  members: Member[];        // first 5 for avatar preview
  workflowIds: string[];
  createdAt: string;        // ISO date
}
```

## Interactions

| Action | Behaviour |
|---|---|
| Click team row/card | Navigate to team detail or open side panel |
| Search | Filter teams by name client-side |
| "Invite member" button | Opens mock invite modal (no email sent) |

## Notes

- Avatar chips use the `Variants` component with the `variant.*` colour tokens from the design system (each user is assigned a deterministic colour based on their ID).
- Team detail is shown in a slide-in panel rather than a new route (simpler for the prototype).
