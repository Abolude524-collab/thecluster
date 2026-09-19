# The Cluster — UI / UX Specification

**Product:** The Cluster  
**Design principle:** Sharp, technical, calm, data-dense, premium  
**Tagline:** One view. Every signal.

---

# 1. Visual Identity

The Cluster should immediately look different from generic SaaS dashboards.

Avoid:

- Purple-gradient-everything
- Excessive rounded cards
- Excessive glass effects
- Cartoon illustrations
- Huge empty hero sections
- Excessive shadows

The interface should feel closer to:

> **A professional analytics control room designed for humans.**

Use strong typography, disciplined spacing, subtle borders, restrained color, and clear hierarchy.

---

# 2. Color System

## Core Palette

| Token | Hex | Purpose |
|---|---|---|
| Cluster Electric | `#6C63FF` | Brand/accent |
| Signal Lime | `#C7F36B` | Positive change/highlights |
| Deep Graphite | `#0B0D10` | Dark background |
| Graphite | `#12161C` | Dark surfaces |
| Elevated Graphite | `#181D25` | Elevated cards |
| Cloud | `#F4F7FA` | Primary text |
| Slate | `#8D98A8` | Secondary text |
| Border | `#252B34` | Borders |
| Coral | `#FF6B6B` | Errors/negative |
| Amber | `#F4C95D` | Warnings |

Do not use every color everywhere.

The dominant visual language should be:

**Graphite + Cloud + Electric Violet + occasional Lime.**

---

# 3. Typography

## Primary Display Font

**Space Grotesk**

Weights:

- 400
- 500
- 600
- 700

Use for:

- Logo
- Page titles
- KPI numbers
- Section headings
- Navigation labels

## Body Font

**Inter**

Use for:

- Descriptions
- Tables
- Forms
- Supporting text
- Tooltips

## Numeric Styling

Analytics numbers should feel deliberate.

Example:

```text
248.4K
```

Large KPI:

- 32–44px desktop
- 28–34px tablet
- 26–32px mobile
- Weight 600–700

Use tabular numbers where supported.

---

# 4. Spacing System

Use an 8px base system.

```text
4px
8px
12px
16px
24px
32px
40px
48px
64px
80px
```

Avoid arbitrary spacing values unless necessary.

---

# 5. Radius

Keep the interface relatively sharp.

Recommended:

- Small controls: 6px
- Inputs: 8px
- Cards: 10–12px
- Modals: 12px
- Large containers: 14px

Do not make every element pill-shaped.

Pills are reserved for:

- Status
- Tags
- Small filters
- Platform labels

---

# 6. Shadows

Use shadows sparingly.

Dark mode:

```text
0 12px 40px rgba(0,0,0,0.24)
```

Prefer borders to shadows for most cards.

---

# 7. Layout

Desktop:

```text
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ Topbar                                             │
│         ├────────────────────────────────────────────────────┤
│         │ Page content                                       │
│         │                                                    │
│         │ KPI KPI KPI KPI                                    │
│         │                                                    │
│         │ Main chart                  Platform comparison    │
│         │                                                    │
│         │ Content performance                              │
│         │                                                    │
└──────────────────────────────────────────────────────────────┘
```

Sidebar:

- 240–260px
- Fixed on desktop
- Collapsible if desired

Main content:

- Max width around 1440px
- Centered
- 24–32px page padding

---

# 8. Sidebar

Brand:

```text
THE
CLUSTER
```

The logo should be typographic.

Suggested treatment:

**THE**  
CLUSTER

Make CLUSTER visually dominant.

Navigation:

```text
OVERVIEW

Dashboard
Analytics
Content

WORKSPACE

Connections

SYSTEM

Settings
```

Each item:

- Icon
- Label
- Active state
- Hover state
- Keyboard focus state

Active state:

- Subtle Electric background
- Electric accent line or marker
- Bright text

Do not use huge filled navigation pills.

---

# 9. Topbar

Contains:

Left:

```text
Dashboard
Good morning, Testimony
```

Right:

- Date range selector
- Refresh
- Notifications
- Avatar

On mobile:

- Menu
- Page title
- Profile

---

# 10. Dashboard Header

Example:

```text
Dashboard

Your social performance at a glance.

[ Last 30 days ▼ ] [ All platforms ▼ ] [ ↻ ]
```

Keep the header compact.

---

# 11. KPI Cards

Four cards on desktop.

Example:

```text
┌─────────────────────────────┐
│ TOTAL AUDIENCE          ↗   │
│                             │
│ 248.4K                      │
│ +8.6% vs previous period    │
│ ▁▂▃▃▅▆▇                    │
└─────────────────────────────┘
```

Card anatomy:

1. Label
2. Icon
3. Primary number
4. Delta
5. Tiny trend visualization

Do not overload cards with descriptions.

---

# 12. Main Analytics Chart

Title:

```text
Audience growth
```

Controls:

```text
7D  30D  90D  12M
```

Platform toggles:

```text
All   YouTube   Instagram   X
```

Chart requirements:

- Responsive
- Tooltip
- Accessible summary
- Smooth but subtle animation
- Clear axes
- Grid lines low contrast
- No visual clutter

Line chart is the default.

---

# 13. Secondary Chart

Title:

```text
Engagement
```

Recommended:

- Bar chart for platform comparison
- Line/area chart for historical engagement

Legend should be compact.

---

# 14. Platform Comparison

Cards or compact rows:

```text
YouTube
12.4K subscribers
+4.2%

Instagram
84.2K followers
+11.4%

X
18.8K followers
+2.1%
```

Each platform gets a recognizable icon.

Platform brand colors may be used only for platform identity, not as the main application palette.

---

# 15. Content Performance Table

Desktop:

```text
CONTENT
──────────────────────────────────────────────────────────────
Thumbnail | Content | Platform | Date | Views | Engagement
──────────────────────────────────────────────────────────────
```

Rows should have:

- Thumbnail
- Truncated title
- Platform
- Date
- Views
- Engagement rate
- More menu

Hover:

- Slight surface elevation
- No dramatic animation

Mobile:

Convert rows into stacked cards or allow controlled horizontal scrolling.

---

# 16. Connections Page

Header:

```text
Connections

Connect your social platforms and bring your data into The Cluster.
```

Platform cards:

```text
┌──────────────────────────────────────────────┐
│ [icon] YouTube                       ● LIVE  │
│                                              │
│ @TechChannel                                 │
│ 12.4K subscribers                            │
│                                              │
│ Connected 2 hours ago                        │
│                                              │
│ [ Manage ]                         [•••]     │
└──────────────────────────────────────────────┘
```

Disconnected:

```text
YouTube

Connect your YouTube account to view analytics.

[ Connect ]
```

---

# 17. OAuth Simulator UI

Development-only screen.

Header:

```text
Connect YouTube
```

Permission explanation:

```text
The Cluster is requesting permission to:

✓ View basic profile information
✓ Read analytics
✓ Read content performance
```

Button:

```text
Allow access
```

Banner:

```text
Development simulation
This flow represents the OAuth process. No real provider credentials are being used.
```

This is important for educational honesty.

---

# 18. Analytics Page

The analytics page should provide more depth than the dashboard.

Structure:

```text
Analytics

[Date range] [Platform] [Metric]

Audience
[Large chart]

Engagement
[Chart] [Chart]

Content
[Table]
```

Use tabs:

```text
Overview | Audience | Engagement | Content
```

---

# 19. Content Detail

When opening a piece of content:

```text
← Back to content

[Thumbnail]

How I built...
YouTube
Published Sep 12, 2026

Views          42.8K
Likes           3.2K
Comments          418
Engagement       8.9%

Performance
[chart]

Platform comparison
...
```

---

# 20. Settings

Sections:

### Profile

- Name
- Email
- Avatar

### Appearance

- Light
- Dark
- System

### Notifications

- Growth alerts
- Weekly summary
- Connection failures

### Security

- Sessions
- Connected accounts
- Sign out

---

# 21. Light Mode

Light mode should not become pure white everywhere.

Use:

```text
Background: #F6F7F9
Surface: #FFFFFF
Text: #111318
Secondary: #687180
Border: #E2E6EB
Accent: #6C63FF
```

Keep cards visually separated using borders rather than giant shadows.

---

# 22. Dark Mode

Dark mode is the primary visual experience.

Use:

```text
Background: #0B0D10
Surface: #12161C
Elevated: #181D25
Text: #F4F7FA
Secondary: #8D98A8
Border: #252B34
Accent: #6C63FF
```

Do not use pure black `#000000`.

---

# 23. States

Every data component needs four states.

## Loading

Use skeletons matching the final geometry.

Bad:

```text
Loading...
```

Better:

```text
[████████]
[████████████]
[██████]
```

## Empty

```text
No data yet

Connect a platform or change your date range to see analytics.

[ Connect platform ]
```

## Error

```text
We couldn't load this data.

The analytics service didn't respond.

[ Retry ]
```

## Success

Show the actual data.

---

# 24. Toasts

Use for transient events.

Examples:

```text
✓ YouTube connected
```

```text
✓ Dashboard refreshed
```

```text
! Instagram connection expired
```

Toasts must not contain essential information that disappears too quickly.

---

# 25. Modal Design

Use modals for:

- Disconnect confirmation
- OAuth simulation
- Important settings

Avoid using modals for ordinary navigation.

---

# 26. Responsive Behavior

## Mobile

Sidebar becomes a drawer.

KPI cards:

```text
2 columns
```

Charts:

```text
1 column
```

Tables:

- cards
- horizontal scroll
- or simplified columns

Do not hide important information simply because the screen is small.

---

# 27. Microinteractions

Allowed:

- Button hover
- Button press
- Dropdown transition
- Sidebar transition
- Chart reveal
- Skeleton shimmer
- Toast animation
- Connection status transition

Animation duration:

```text
150–250ms
```

Use reduced-motion preferences.

---

# 28. Icons

Use one icon library consistently.

Recommended:

**Lucide React**

Icons should generally be:

- 16px for compact controls
- 18px for navigation
- 20–24px for feature cards

Never mix five icon styles.

---

# 29. Charts

Use **Chart.js**.

Required chart types:

- Line
- Bar
- Doughnut where useful
- Sparkline-style mini line

Charts must have:

- Tooltips
- Legends where needed
- Empty states
- Loading states
- Responsive sizing
- Accessible textual summaries

---

# 30. UI Component Inventory

Create reusable components:

```text
Button
IconButton
Badge
Avatar
Card
MetricCard
ChartCard
PlatformBadge
PlatformCard
DateRangePicker
PlatformFilter
Tabs
Dropdown
Modal
Toast
Tooltip
Skeleton
EmptyState
ErrorState
DataTable
Pagination
SearchInput
Sidebar
Topbar
Breadcrumbs
```

Feature-specific components should live inside their feature folders.

---

# 31. Design Token Strategy

Do not scatter values like:

```css
background: #0B0D10;
```

through every component.

Create semantic tokens.

Example:

```css
--color-bg
--color-surface
--color-surface-elevated
--color-text
--color-text-muted
--color-border
--color-primary
--color-success
--color-warning
--color-danger
```

This makes theming and redesign easier.

---

# 32. Visual Quality Checklist

Before considering a screen finished:

- Is hierarchy obvious within 2 seconds?
- Are the most important numbers visually dominant?
- Is there enough breathing room?
- Are borders subtle?
- Are cards too rounded?
- Is accent color overused?
- Are loading states realistic?
- Does mobile still feel intentional?
- Are hover/focus states present?
- Is the page visually consistent with the rest of The Cluster?
- Does the interface look like a real product rather than a coding tutorial?

---

# 33. Brand Signature

A subtle signature element should appear throughout the product:

**cluster marker**

Use a small three-node or connected-point motif in:

- Logo
- Empty states
- Loading indicators
- Favicon
- Connection illustrations

Keep it geometric and minimal.

Do not turn it into a decorative logo repeated everywhere.

---

# 34. Example Dashboard Composition

```text
THE CLUSTER                          Last 30 days  All platforms  ↻
──────────────────────────────────────────────────────────────────

Dashboard
Your social performance at a glance.

┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Audience   │ │ Views      │ │ Engagement │ │ Growth     │
│ 248.4K     │ │ 832K       │ │ 42.1K      │ │ +8.6%      │
│ +8.6%      │ │ +14.2%     │ │ +6.4%      │ │            │
└────────────┘ └────────────┘ └────────────┘ └────────────┘

┌──────────────────────────────────────┐ ┌────────────────────┐
│ Audience growth                      │ │ Platform performance│
│                                      │ │                    │
│       ╱╲       ╱╲                    │ │ YouTube      +4.2% │
│  ╱╲ ╱  ╲ ╱╲ ╱  ╲                   │ │ Instagram   +11.4% │
│ ╱  ╲    ╲   ╲                       │ │ X            +2.1% │
└──────────────────────────────────────┘ └────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│ Content performance                                           │
│                                                               │
│ Thumbnail  Title           Platform  Views  Engagement       │
│ ...                                                        → │
└───────────────────────────────────────────────────────────────┘
```

The final UI should have more visual polish than this wireframe, but this hierarchy should remain.
