# Product Requirements Document
# Worktrace AI Platform
**Observe. Reimagine. Automate.**

| Field | Value |
|---|---|
| Version | 1.0 |
| Date | June 4, 2026 |
| Status | Draft — For Review |
| Owner | Product Team |
| Scope | Front-end prototype (mocked data) |
| Stack | Next.js 16, React 19, TypeScript, Tailwind CSS v4, Storybook 10 |

---

## 1. Executive Summary

Worktrace is a SaaS platform that observes user actions across tools and workflows, automatically generates structured workflow and process documentation, and surfaces AI-powered optimization recommendations. The platform helps enterprise teams eliminate the 6+ months typically required to discover automation opportunities by capturing work as it actually happens — without integrations, surveys, or manual documentation.

This document defines product requirements for the Worktrace AI Platform prototype: a front-end-only dashboard built with mocked data to validate UX, design system, and core user flows before backend integration.

---

## 2. Problem Statement

Enterprise organizations waste enormous time and resources trying to understand how work actually happens before they can automate it. Current discovery approaches are slow, inaccurate, and disruptive:

- Shadowing employees and conducting interviews takes weeks per team
- Manually written SOPs and process maps go stale immediately
- Surveys capture intent, not actual behavior
- Consulting engagements cost $500K+ for a single automation use case
- AI cannot optimize what it cannot see

The result: over 6 months of elapsed time before a single automation is deployed — and high risk that the documented process does not reflect reality.

---

## 3. Vision & Goals

### 3.1 Product Vision

Worktrace gives enterprises an always-on digital observer that turns real work into actionable automation blueprints — automatically, at scale, across every team and tool.

### 3.2 Prototype Goals

- Validate core dashboard UX and information architecture
- Establish a shared design system via Storybook component library
- Enable stakeholder demos with realistic mocked data
- Define data models and screen specifications before backend development
- Provide a visual foundation for investor and customer presentations

### 3.3 Success Metrics (Post-Launch)

| Metric | Target | Timeframe |
|---|---|---|
| Time-to-first-automation | < 1 week | Per enterprise customer |
| Workflow accuracy (human-in-loop) | 96–99% | Validated against ground truth |
| Hours reclaimed per FTE | > 90% ops-heavy tasks | 3 months post-deployment |
| Customer onboarding speed | 80% faster | vs. traditional consulting |

---

## 4. User Personas

### 4.1 Operations Lead / Process Owner
- Responsible for team efficiency and workflow documentation
- **Pain:** spends weeks manually mapping processes that are outdated before published
- **Goal:** understand how work actually happens and identify automation ROI quickly
- **Key screens:** Process Map, Workflow Detail, Optimization Recommendations

### 4.2 Head of AI / Transformation
- Owns the AI automation roadmap across the organization
- **Pain:** cannot prioritize use cases without visibility across 20+ teams
- **Goal:** surface highest-ROI automation opportunities with business justification
- **Key screens:** Dashboard Overview, ROI Analytics, Use Case Discovery

### 4.3 IT / Automation Engineer
- Implements automation blueprints using n8n, Crew AI, or custom tooling
- **Pain:** handoffs from business teams are vague and technically incomplete
- **Goal:** receive precise, executable workflow specs ready for automation
- **Key screens:** Workflow Detail, Blueprint Export, Integration Settings

### 4.4 Enterprise Admin / CISO
- Controls deployment, user access, and data governance
- **Pain:** activity monitoring tools create privacy risk and employee distrust
- **Goal:** capture process data with PII redaction, on-prem option, and audit trails
- **Key screens:** Settings, Privacy Controls, User Management, Security Dashboard

---

## 5. Core Concepts & Data Model

### 5.1 Observation Session
A time-bounded recording of user activity captured by the Worktrace desktop agent. Contains raw event streams (clicks, keystrokes, app switches, copy/paste) with PII redacted at capture time. Sessions are the raw input for workflow generation.

### 5.2 Workflow
An AI-generated structured representation of a repeatable task sequence extracted from one or more observation sessions. A workflow contains:
- Name and description
- Ordered list of steps with tool, action, and input/output per step
- Frequency (how often it occurs), average duration, and assigned team
- Automation potential score (0–100%) and complexity rating
- Linked observation sessions and source evidence

### 5.3 Process
A higher-level grouping of related workflows that together achieve a business outcome. For example, the process *Customer Onboarding* may contain workflows: *Verify Identity*, *Create Account*, *Send Welcome Materials*, *Schedule Kickoff*. Processes map to business KPIs and are the unit for ROI reporting.

### 5.4 Optimization Recommendation
An AI-generated suggestion for how a workflow or process could be improved, automated, or eliminated. Each recommendation includes:
- **Type:** Automate / Simplify / Eliminate / Merge / Delegate to AI
- Estimated time savings (hours/week per FTE)
- Implementation effort (Low / Medium / High)
- Suggested automation blueprint and target platform (n8n, Crew AI, Asteroid)
- Confidence score and supporting evidence

---

## 6. Screen Specifications

### 6.1 Dashboard — Overview
The main landing screen after login. Provides a real-time summary of observed activity, generated workflows, and top automation opportunities.

**Key Components**
- KPI summary cards: total workflows discovered, processes mapped, automation opportunities, estimated hours saved/week
- Activity feed: recent observation sessions with status (Processing / Complete / Review needed)
- Top opportunities table: ranked list of highest-ROI automation candidates with estimated savings
- Process coverage chart: heatmap of teams/departments vs. observation completeness
- Quick actions: Start Observation, Review Pending Workflows, Export Report

**Mocked Data:** 12 active workflows, 4 processes, 23 optimization recommendations. Estimated 47 hours/week savings across 8 teams.

### 6.2 Workflows — List View
Browsable list of all generated workflows with filtering, sorting, and search.

**Key Components**
- Search and filter bar: by team, tool, automation potential, status, date range
- Workflow cards: name, team, frequency, duration, automation potential badge, status chip
- Sort options: by ROI, frequency, recency, complexity
- Bulk actions: export, archive, assign to process
- Empty state with onboarding prompt if no sessions captured

### 6.3 Workflow — Detail View
Deep-dive into a single workflow with full step breakdown, evidence, and recommendations.

**Key Components**
- Workflow header: name, owner, team, status badge, last updated
- Step-by-step timeline: each step shows tool, action type, average duration, screenshot thumbnail
- Evidence panel: linked observation session clips with timestamps
- Automation recommendations panel: suggested blueprint, estimated effort, target platform
- Variant analysis: if multiple users perform same workflow differently, show variants with frequency
- Export actions: Download as SOP (PDF/DOCX), Copy as automation blueprint, Send to n8n

### 6.4 Processes — List & Detail
Hierarchical view of business processes composed of multiple workflows.

**Key Components**
- Process list: name, department, workflow count, total ROI estimate, owner
- Process detail: workflow dependency map (flowchart), KPI alignment, optimization status
- Process health score: based on automation potential, documentation completeness, variant count

### 6.5 Optimization Recommendations
Centralized view of all AI-generated improvement suggestions, prioritized by ROI.

**Key Components**
- Recommendation cards: type badge, workflow/process name, savings estimate, effort rating, confidence score
- Filter by type (Automate / Simplify / Eliminate / Merge)
- Kanban-style status board: New / In Review / Accepted / Implemented
- Blueprint preview: modal showing generated automation spec
- One-click export to automation platforms

### 6.6 Settings & Privacy Controls
Admin-only configuration for data capture, privacy, integrations, and team management.

**Key Components**
- Capture settings: allowlist/denylist by application, URL, or data field
- PII redaction: configure redaction rules with preview
- Deployment mode: Cloud / On-Premise toggle
- Team & user management: invite, roles (Admin / Analyst / Viewer)
- Integrations: connect to Slack, Jira, n8n, Crew AI, Asteroid
- Audit log: timestamped record of all data access and exports

---

## 7. Feature Requirements

**Priority:** P0 = Must have (prototype blocker) · P1 = High value · P2 = Nice to have

| ID | Feature | Description | Priority | Phase |
|---|---|---|---|---|
| F-01 | Dashboard KPI Cards | Animated summary cards showing workflows, processes, opportunities, hours saved | P0 | v0.1 |
| F-02 | Workflow List | Searchable, filterable list with automation potential badges | P0 | v0.1 |
| F-03 | Workflow Detail | Step timeline, evidence panel, export actions | P0 | v0.1 |
| F-04 | Process Map | Visual flowchart of workflows within a process | P0 | v0.1 |
| F-05 | Optimization Recommendations | Ranked list with ROI estimates and blueprint previews | P0 | v0.1 |
| F-06 | Storybook Component Library | All UI components documented with stories and variants | P0 | v0.1 |
| F-07 | Design Tokens (Tailwind v4) | Colors, spacing, typography in globals.css @theme | P0 | v0.1 |
| F-08 | Responsive Layout | Dashboard usable on 1280px+ desktop screens | P0 | v0.1 |
| F-09 | Navigation & Routing | App shell with sidebar, breadcrumbs, and App Router pages | P0 | v0.1 |
| F-10 | Mock Data Layer | Typed TypeScript mock data files for all entities | P0 | v0.1 |
| F-11 | Observation Activity Feed | Timeline of recent capture sessions with status chips | P1 | v0.2 |
| F-12 | Variant Analysis View | Show workflow variants with frequency and divergence | P1 | v0.2 |
| F-13 | Blueprint Export Modal | Preview automation spec before export to n8n/Crew AI | P1 | v0.2 |
| F-14 | Process Health Score | Composite score based on coverage, variants, automation readiness | P1 | v0.2 |
| F-15 | Kanban Recommendations Board | Drag-drop status board for recommendations | P1 | v0.2 |
| F-16 | Privacy Controls UI | Allowlist/denylist config with PII preview | P1 | v0.3 |
| F-17 | Team Management | User invite, role assignment, permission matrix | P1 | v0.3 |
| F-18 | Audit Log | Timestamped access and export log | P2 | v0.3 |
| F-19 | Dark Mode | Full theme support via Tailwind dark: utilities | P2 | v0.4 |
| F-20 | Integrations Settings | UI for connecting n8n, Crew AI, Slack, Jira | P2 | v0.4 |

---

## 8. Design System Requirements

### 8.1 Design Tokens
All design values must be defined as CSS custom properties in `src/app/globals.css` using Tailwind CSS v4 `@theme` syntax. No hardcoded hex values in components.

| Token Category | Examples | Usage |
|---|---|---|
| Brand Colors | `--color-orchid-*`, `--color-grey-*` | Primary orchid, grey scale |
| Tag / Semantic Colors | `--color-tag-*` | Teal, Yellow, Green, Red, Pink |
| Variant Accent Colors | `--color-variant-*` | 16 user avatar colors |
| Typography Scale | `--text-h1` through `--text-body-xs` | Inter, Hedvig Serif, DM Sans |
| Spacing Scale | `--spacing` (Tailwind default) | 4px base unit |
| Border Radius | `--radius-xs` through `--radius-xl` | 2 / 4 / 8 / 12 / 16px |
| Shadows | `--shadow-s` | Card elevation |

### 8.2 Component Library (Storybook 10)
All components must have Storybook stories before being used in pages. Stories must cover: Default, Hover/Active states, Loading, Empty, and Error variants.

**Primitive Components**
- Button (Primary, Secondary — Default/Hover/Disabled/Loading)
- Badge / Tag (ROI variants: High/Med/Low/NA/Alert/Success/Team)
- Input, Checkbox (with all interaction states)
- Card, Modal, Drawer, Panel
- Avatar / Variant chip, Icon, Tooltip

**Domain Components**
- `WorkflowCard` — compact and expanded variants
- `StepTimeline` — ordered step list with tool icons and duration
- `AutomationPotentialBar` — progress bar with color-coded score
- `RecommendationCard` — type badge, savings estimate, confidence indicator
- `ProcessFlowChart` — SVG-based dependency diagram
- `KPICard` — metric card with trend indicator
- `ActivityFeedItem` — session event with status chip and timestamp

---

## 9. Technical Requirements

### 9.1 Stack
- **Framework:** Next.js 16 with App Router (`src/app/` directory)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with `@theme` tokens in `globals.css`
- **Components:** React 19 with Server Components where possible
- **Visual testing:** Storybook 10 at `localhost:6006`
- **Design source:** Figma via MCP (Worktrace AI Platform Design file)
- **Data:** 100% mocked — no API calls, no database

### 9.2 File Structure
```
src/
├── app/                    # Next.js pages and layouts
├── components/
│   ├── ui/                 # Primitive design system components
│   └── domain/             # Business-domain components
├── lib/
│   ├── mock-data/          # Typed mock data files per entity
│   └── types/              # TypeScript interfaces for all data models
└── app/globals.css         # Tailwind @theme token definitions
.storybook/                 # Storybook config; imports globals.css in preview.tsx
```

### 9.3 Mocked Data Requirements
- All mock data typed with TypeScript interfaces matching production schema
- Realistic values: real tool names (Salesforce, Slack, Jira, Excel), real KPIs
- Sufficient volume for pagination: minimum 20 workflows, 5 processes, 30 recommendations
- Varied states: mix of Processing / Complete / Review Needed statuses
- Seeded randomization: deterministic output for consistent Storybook screenshots

---

## 10. Privacy & Security Requirements

Worktrace operates in security-sensitive enterprise environments:

- **PII Redaction:** all names, emails, phone numbers, and account numbers masked before storage
- **No productivity tracking:** the platform must never display per-user speed or efficiency metrics
- **Allowlist/Denylist:** admins can exclude specific applications, URLs, or data field patterns from capture
- **On-Premise Option:** deployment architecture must support air-gapped on-premise installation
- **Role-Based Access Control:** Admin / Analyst / Viewer roles with least-privilege defaults
- **Audit Logging:** all data access, exports, and configuration changes logged with timestamp and user
- **Compliance:** SOC 2 Type II, GDPR, HIPAA-ready data handling (production)
- **Prototype-specific:** mock data must not include real employee names, real company data, or PII

---

## 11. Out of Scope (Prototype v0.x)

- Real desktop agent / observation capture — prototype uses mocked session data
- Backend API, database, authentication — front-end only
- Live integrations with n8n, Crew AI, Asteroid — export is UI-only
- Mobile / tablet responsive design — desktop-first (1280px+)
- Multi-language / i18n support
- Real-time collaboration / multi-user editing
- Billing, subscription, and pricing UI

---

## 12. Prototype Delivery Timeline

| Phase | Timeline | Deliverables | Status |
|---|---|---|---|
| v0.1 | Weeks 1–2 | Design tokens, Storybook setup, Dashboard, Workflow List | In Progress |
| v0.2 | Weeks 3–4 | Workflow Detail, Process Map, Recommendations, Activity Feed | Planned |
| v0.3 | Weeks 5–6 | Privacy Controls, Team Management, Audit Log, Blueprint Export | Planned |
| v0.4 | Weeks 7–8 | Dark mode, Integrations UI, Polish, Stakeholder demo prep | Planned |

---

## 13. Open Questions

1. What is the primary demo audience for v0.1 — investors, design review, or customer validation?
2. Should the Process Flow Chart be an interactive drag-and-drop or a static SVG visualization?
3. Is Figma the source of truth for all component designs, or are some components designed directly in code?
4. What level of animation fidelity is required for the prototype (Framer Motion, CSS, or none)?
5. Are there specific industry vertical datasets needed for mock data (e.g., healthcare vs. financial services)?
6. Does the Storybook need to be deployed/hosted, or is local-only sufficient for v0.x?

---

*Worktrace AI — Confidential & Proprietary — v1.0 — June 2026*
