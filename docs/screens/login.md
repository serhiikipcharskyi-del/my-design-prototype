# Login Screen

**Route:** `/login`

## Purpose

Entry point to the application. Validates user credentials against mock data and redirects to `/workflows` on success.

## Layout

- Centered card on a light background (`bg-grey-50`).
- Worktrace logo at the top.
- Email and password inputs.
- Primary "Sign in" button.
- "Forgot password?" link (non-functional in prototype).

## Components Used

- `Input` — Type=Input, states: Default → Focused → Filled
- `Button` — Type=Primary, Size=Big
- `Logo`

## Mock Credentials

```
Email:    demo@worktrace.ai
Password: any value
```

## States

| State | Behaviour |
|---|---|
| Default | Empty form |
| Focused | Input highlight on focus |
| Error | Red border + error message on wrong credentials |
| Loading | Button disabled with spinner while "authenticating" |
| Success | Redirect to `/workflows` |

## Notes

- No real authentication. Any non-empty password with the mock email passes.
- Token/session storage is simulated with `localStorage`.
