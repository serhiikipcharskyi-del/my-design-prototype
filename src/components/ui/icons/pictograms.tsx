// Component-specific glyphs not present in the shared auto-generated icon set
// (icons-data.ts is regenerated from Figma's icon library and shouldn't be
// hand-edited, so one-off icons used by a single component live here instead).

export const PersonIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-9 2.239-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.761-4.582-5-9-5Z"
    />
  </svg>
)

// Toast status glyphs (node 2986:54115) — stroke style, matching the shared icon set's convention.

export const InfoCircleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
  </svg>
)

export const WarningCircleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1" fill="currentColor" />
  </svg>
)

export const ErrorTriangleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M12 9v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="16.5" r="1" fill="currentColor" />
  </svg>
)

// BulkActions example-action glyphs (node 3182:29993) — used by the Storybook
// demo, not baked into BulkActions itself (its `actions` are consumer-supplied).

export const RemoveFromTeamIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M2 20v-1a4 4 0 0 1 4-4h4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M15 11h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const DeactivateUserIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="9.5" cy="10.5" r="2.25" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M5.5 16.5c.6-1.9 2.1-2.9 4-2.9s3.4 1 4 2.9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="m15 8 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

// UploadFile fallback glyph (node 3398:62424) — filled, red-tinted generic
// document icon shown when a file's extension doesn't match a known
// FileType (see icons/file-type-icon.tsx for the real per-extension icons).

export const GenericFileIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path
      d="M6.6 2C4.6 2 3 3.6 3 5.6v28.8C3 36.4 4.6 38 6.6 38h26.8c2 0 3.6-1.6 3.6-3.6V12.9L24.8 2H6.6Z"
      fill="#F86D60"
    />
    <path d="M37 12.9H27.5c-2 0-3.6-1.6-3.6-3.6V2L37 12.9Z" fill="#FFA9A0" />
    <path
      d="M12 22h16M12 26h16M12 30h9"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)
