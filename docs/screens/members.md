# Members Screen

**Route:** `/members`

## Purpose

Shows all individual users in the organisation: their name, role, team membership, and activity status.

## Layout

- **Top Nav:** Workflow Header variant (re-used for Members).
- **Side Navigation:** `members` item selected.
- **Main content:** Sortable table of members with avatar, name, role, team, and last-active date.
- **Member detail:** Click a row to open a slide-in panel with member profile and assigned workflows.

## Components Used

- `Side Navigation` — Expand=True, Type=Main
- `Nav` — Property 1=Workflow Header
- `Table` — Header row + member rows with hover state
- `Paginator Row`
- `Variants` — avatar chip per row
- `Tags` — role label (e.g. Admin, Member, Viewer)
- `Input` — Type=Search
- `Button` — Secondary (invite, export)
- `List Item` — Type=Simple (inside member detail panel, listing team memberships)
- `Breadcrumbs` — Home › Members

## Mock Data Shape

```ts
interface Member {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Viewer';
  teamIds: string[];
  avatarColor: string;     // one of the variant.* colour tokens
  lastActive: string;      // ISO date
  status: 'Active' | 'Invited' | 'Inactive';
}
```

## Interactions

| Action | Behaviour |
|---|---|
| Click row | Opens member detail panel |
| Search | Filter by name or email client-side |
| Sort column | Sort table ascending / descending |
| "Invite member" button | Opens mock invite form (no email sent) |
| Paginator | Show next/previous 10 rows |

## Notes

- `avatarColor` is assigned deterministically per member using the `variant.*` colour tokens (16 options). Use `memberIndex % 16` mapped to the token list.
- Role `Tag` uses the grey palette for Viewer, teal for Member, and orchid for Admin.
- Inactive members are visually de-emphasised with `text-grey-600`.
