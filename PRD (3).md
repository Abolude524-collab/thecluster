# The Cluster — Product Requirements Document (PRD)

**Version:** 1.0  
**Project Type:** Advanced Beginner → Intermediate frontend/full-stack learning project  
**Product:** The Cluster  
**Primary Goal:** Build a production-minded social media analytics dashboard that teaches API integration, asynchronous state management, OAuth concepts, data visualization, responsive UI architecture, and scalable frontend engineering.

---

## 1. Product Vision

**The Cluster** is a unified social media analytics workspace where creators, developers, small brands, and teams can connect supported social platforms and understand their performance from one dashboard.

The product should feel like a serious SaaS analytics product rather than a tutorial project.

The central idea:

> **Connect your platforms. See the whole picture.**

The dashboard aggregates metrics such as followers/subscribers, views, likes, comments, engagement, posting activity, and growth into a single visual workspace.

This is primarily a learning project, so the architecture must intentionally expose the developer to real engineering problems rather than hiding everything behind one giant component or hard-coded mockup.

---

# 2. Problem Statement

Social-media performance data is distributed across multiple platforms.

A user may need to:

1. Open one platform.
2. Check followers.
3. Check views.
4. Review recent posts.
5. Switch to another platform.
6. Compare performance manually.
7. Remember historical values.
8. Repeat the process later.

The Cluster reduces this fragmentation by presenting normalized analytics from connected platforms inside one interface.

---

# 3. Learning Objectives

By completing this project, the developer should understand:

### Frontend
- React component architecture
- Routing
- Reusable UI primitives
- Responsive design
- Tailwind CSS
- Dark/light themes
- Forms and validation
- Loading, empty, error, and success states
- Accessibility
- Component composition
- Client-side caching
- Optimistic UI where appropriate

### APIs
- REST API concepts
- HTTP methods
- Headers
- Query parameters
- Pagination
- Rate limits
- Error handling
- API response normalization
- Async/await
- AbortController
- Retry strategies

### Authentication
- OAuth 2.0 concepts
- Authorization vs authentication
- Access tokens
- Refresh tokens
- Secure token handling
- Connected-account lifecycle
- Permission/scopes concepts

### Data Visualization
- Chart.js
- Time-series datasets
- Tooltips
- Legends
- Dynamic filters
- Comparative datasets
- Derived metrics

### Engineering
- Feature-based project structure
- Environment variables
- API abstraction
- Service layers
- Type-safe thinking even when using JavaScript
- Testing
- Git workflows
- Documentation
- Deployment

---

# 4. Product Scope

## MVP

The MVP must include:

- Dashboard
- Platform connection center
- Overview metrics
- Platform filters
- Date-range filters
- Growth chart
- Engagement chart
- Content performance table
- Recent activity
- Dark/light mode
- Responsive layout
- Loading states
- Empty states
- Error states
- Mock API layer
- Real API adapter architecture
- Basic OAuth flow simulation
- Search/filter functionality
- Settings page

## Post-MVP

Potential future capabilities:

- Team workspaces
- Multiple users
- Scheduled reports
- CSV export
- PDF reports
- AI-generated insights
- Competitor tracking
- Content recommendations
- Posting calendar
- Alerts
- Custom dashboards
- Saved views
- Webhooks
- Real-time updates
- Mobile application

---

# 5. Target Users

## Primary

### Creator
Wants to understand whether content is growing.

### Developer
Wants a portfolio-quality project demonstrating API integration.

### Small Brand
Wants a unified performance overview without switching between platforms.

### Student
Wants to learn how production dashboards are structured.

---

# 6. Supported Platforms

The initial provider set is:

- YouTube
- Instagram
- X

All three platforms must be treated as **independent provider integrations**. The Cluster must not assume that every platform exposes the same account types, metrics, permissions, endpoints, or analytics capabilities.

## 6.1 Account Linking

The intended production experience is:

```text
The Cluster
    ↓
Connect platform
    ↓
Provider authorization / OAuth
    ↓
User grants requested permissions
    ↓
Authorization callback
    ↓
Connected account
    ↓
Fetch permitted data
    ↓
Normalize provider response
    ↓
The Cluster dashboard
```

During development, the application will use an **OAuth simulator** so the complete account-linking UX can be developed without requiring production provider credentials.

The simulator must be clearly labelled:

> Development simulation — no real provider authorization is being performed.

The production architecture must leave a clean path for replacing the simulator with real provider OAuth.

---

## 6.2 YouTube

YouTube should support account/channel linking through Google's OAuth authorization flow.

The integration should be designed to support:

- Basic channel/account information
- Subscriber/audience metrics where available
- Views
- Likes
- Comments
- Video/content performance
- Historical analytics available through the permitted YouTube analytics/reporting APIs

The implementation must distinguish between:

- YouTube Data API information
- YouTube Analytics information
- Data requiring user authorization

Do not assume that all analytics are available through one endpoint.

---

## 6.3 Instagram

Instagram should support linking through the applicable Meta/Instagram authorization flow.

The implementation must account for the fact that Instagram API capabilities can depend on:

- Account type
- Professional/business/creator status
- Requested permissions
- Available API product
- Provider restrictions

The Cluster must **not** promise identical analytics for every Instagram account.

Where a requested metric is unsupported, unavailable, or not authorized, represent it as unavailable rather than fabricating a value.

Example:

```js
{
  platform: "instagram",
  metrics: {
    audience: 84200,
    views: 183000,
    likes: 9200,
    comments: 610,
    shares: null
  }
}
```

The UI should communicate unsupported metrics clearly.

---

## 6.4 X

X should support account linking through the applicable X OAuth flow.

The implementation must account for:

- OAuth authorization
- User permissions/scopes
- API access level
- Endpoint availability
- Rate limits
- Provider plan restrictions

The application must not assume that every X developer account has identical access to analytics or historical data.

If a requested metric or endpoint is unavailable under the current API access, the provider adapter should return an explicit unsupported/unavailable state.

---

## 6.5 Provider Capability Model

The application must maintain a capability model rather than assuming feature parity.

Example:

```js
{
  youtube: {
    audience: true,
    views: true,
    likes: true,
    comments: true,
    shares: false,
    historicalAnalytics: true
  },

  instagram: {
    audience: true,
    views: true,
    likes: true,
    comments: true,
    shares: null,
    historicalAnalytics: true
  },

  x: {
    audience: true,
    views: true,
    likes: true,
    comments: true,
    shares: true,
    historicalAnalytics: null
  }
}
```

Use:

- `true` = supported
- `false` = known unsupported
- `null` = dependent on account/API access/permissions

The exact capability matrix must be verified against current provider documentation when implementing real integrations.

---

## 6.6 Normalized Platform Model

The dashboard must consume a normalized application model.

Example:

```js
{
  id: "youtube",
  name: "YouTube",
  icon: "...",
  connected: true,
  accountName: "Tech Channel",
  handle: "@techchannel",

  capabilities: {
    audience: true,
    views: true,
    likes: true,
    comments: true
  },

  metrics: {
    audience: 12400,
    views: 832000,
    likes: 42100,
    comments: 3800,
    engagementRate: 7.8
  }
}
```

The dashboard must never need to know whether the original provider called the metric:

```text
followers
subscribers
audience
followers_count
subscriberCount
```

Provider-specific terminology is normalized at the service/provider layer.

---

## 6.7 Provider Adapter Contract

Each provider should expose a common conceptual contract:

```js
getProfile()
getCapabilities()
getOverview()
getGrowth()
getContent()
disconnect()
```

Provider-specific implementation details remain inside the provider adapter.

The dashboard should interact with the common contract rather than directly calling YouTube, Instagram, or X APIs.

---

## 6.8 Metric Availability Rules

The Cluster must never manufacture cross-platform equivalence.

If YouTube provides a metric and Instagram does not, the application should display:

```text
— Not available
```

or an equivalent accessible state.

Do not convert unrelated provider metrics simply to make a chart appear complete.

Charts must be capable of handling:

- missing datasets
- partial platform data
- unsupported metrics
- different measurement definitions

This is an intentional product requirement.

---

## 6.9 Cross-Platform Metric Definitions

Some metrics will be calculated by The Cluster rather than directly returned by providers.

For example:

```text
Growth Rate =
((current value - previous value) / previous value) × 100
```

Engagement rate may be derived differently depending on the available denominator:

```text
Engagement Rate =
(total engagements / available reach or views) × 100
```

The UI must make the calculation definition available where it could otherwise be misleading.

The product should avoid presenting two similarly named metrics as directly comparable when their underlying provider definitions differ.

---

## 6.10 Connection States

Every provider must support:

```text
Available
Connecting
Connected
Refreshing
Expired
Permission Required
Rate Limited
Unavailable
Error
Disconnected
```

The UI should explain the relevant state.

For example:

```text
Instagram

Analytics access requires a supported professional account.

[Review connection]
```

or:

```text
X

Some analytics are unavailable with the current API access.

[View details]
```

---

## 6.11 Partial Failure Requirement

A failure from one provider must not take down the entire dashboard.

Example:

```text
YouTube       ✓ Loaded
Instagram     ✓ Loaded
X             ⚠ Unavailable
```

The dashboard should continue rendering available data.

This is a core requirement because real third-party APIs can fail independently.

---

## 6.12 Real API Integration Boundary

MVP development uses:

```text
Mock Provider
```

Production integration will use:

```text
YouTube Adapter → Google APIs
Instagram Adapter → Meta/Instagram APIs
X Adapter → X APIs
```

The React dashboard must remain unchanged or require only minimal changes when moving from mock providers to real providers.


---

# 7. Important API Strategy

The application should support two environments:

## Development Mode

Use a local mock API.

The mock API should behave like a real API:

- Network delay
- Pagination
- Occasional failures
- Different response shapes before normalization
- Authentication simulation
- Empty results
- Rate-limit simulation

Do NOT simply import a giant `mockData.js` file directly into React components.

Instead:

```text
UI
 ↓
Hooks
 ↓
Services
 ↓
API Client
 ↓
Provider Adapter
 ↓
Real API / Mock API
```

## Production/Real API Mode

Real provider integrations should be implemented behind adapters.

Example:

```text
providers/
  youtube/
    youtube.adapter.js
  instagram/
    instagram.adapter.js
  x/
    x.adapter.js
```

The application should be able to replace a provider without rewriting dashboard components.

---

# 8. Core User Stories

## Authentication

- As a user, I want to sign in so my dashboard can be personalized.
- As a user, I want to sign out securely.
- As a user, I want my connected platforms to persist.

## Connecting Platforms

- As a user, I want to connect YouTube.
- As a user, I want to connect Instagram.
- As a user, I want to connect X.
- As a user, I want to see which accounts are connected.
- As a user, I want to disconnect an account.
- As a user, I want to know what permissions I granted.

## Analytics

- As a user, I want to see my overall audience size.
- As a user, I want to see audience growth.
- As a user, I want to see views.
- As a user, I want to see engagement.
- As a user, I want to compare platforms.
- As a user, I want to change the date range.
- As a user, I want to inspect individual content performance.

## Reliability

- As a user, I want clear loading indicators.
- As a user, I want useful errors instead of blank screens.
- As a user, I want to retry failed requests.
- As a user, I want partial platform failures not to destroy the entire dashboard.

---

# 9. Information Architecture

```text
The Cluster
│
├── Dashboard
│   ├── Overview
│   ├── Growth
│   ├── Engagement
│   ├── Platform comparison
│   └── Recent content
│
├── Analytics
│   ├── Overview
│   ├── Audience
│   ├── Engagement
│   ├── Content
│   └── Platform detail
│
├── Content
│   ├── All content
│   ├── Top performers
│   └── Content detail
│
├── Connections
│   ├── Connected accounts
│   ├── Available platforms
│   └── Permissions
│
└── Settings
    ├── Profile
    ├── Appearance
    ├── Notifications
    └── Security
```

---

# 10. Dashboard Requirements

The dashboard is the primary screen.

It must contain:

### Header
- Workspace/user name
- Date range
- Refresh button
- Notification indicator
- Profile menu

### Summary cards

Minimum:

1. Total audience
2. Total views
3. Engagement
4. Audience growth

Each card should include:

- Current value
- Percentage change
- Comparison period
- Small visual trend
- Platform indicator where useful

Example:

```text
TOTAL AUDIENCE
248.4K
↑ 8.6%
vs previous period
```

### Main chart

Primary chart:

**Audience Growth**

Capabilities:

- 7 days
- 30 days
- 90 days
- 12 months
- Custom range
- Platform filter

### Secondary chart

**Engagement Overview**

Show:

- Likes
- Comments
- Shares
- Saves where supported

### Platform comparison

A visual comparison of connected platforms.

### Content performance

Table columns:

- Content
- Platform
- Published
- Views
- Likes
- Comments
- Engagement rate

---

# 11. Analytics Definitions

The product should clearly define calculated metrics.

## Engagement Rate

For content:

```text
Engagement Rate =
(total engagements / reach or views) × 100
```

The denominator must be documented because platforms expose different metrics.

Never pretend that metrics from different platforms are perfectly equivalent.

## Growth Rate

```text
Growth Rate =
((current value - previous value) / previous value) × 100
```

Handle zero and null values safely.

---

# 12. Date Range System

Supported presets:

- Today
- 7 days
- 30 days
- 90 days
- 12 months
- Custom

Changing the date range must update all compatible dashboard widgets.

Use one centralized filter state rather than separate state variables scattered across components.

Example:

```js
{
  range: "30d",
  startDate: "...",
  endDate: "...",
  platforms: ["youtube", "instagram", "x"]
}
```

---

# 13. Platform Connection System

Each platform should have a connection card.

Example states:

### Disconnected

```text
YouTube
Connect your YouTube account

[ Connect ]
```

### Connecting

```text
Connecting...
```

### Connected

```text
YouTube
@ExampleChannel
Connected 2 hours ago

[ View account ] [ Disconnect ]
```

### Error

```text
Connection failed

[ Try again ]
```

---

# 13.1 Provider Access and Documentation Requirement

Real provider integrations are subject to each platform's current developer policies, API products, permissions, account requirements, rate limits, and access plans.

Therefore:

1. Do not hard-code assumptions about provider capabilities.
2. Verify current official provider documentation before implementing a real integration.
3. Request only the minimum permissions required for the feature.
4. Explain requested permissions to users.
5. Gracefully handle denied permissions.
6. Gracefully handle expired or revoked authorization.
7. Treat provider API errors as normal application states.
8. Do not claim a metric is supported until it has been verified against the relevant provider API.
9. Keep provider-specific logic isolated so API changes affect one adapter rather than the entire product.

For the learning MVP, simulated provider responses should model these constraints realistically.

---

# 14. OAuth Learning Mode

Because actual platform OAuth credentials may not be available during development, implement:

```text
OAuth Simulator
```

The simulator should teach the real flow:

```text
Connect
 ↓
Authorization screen
 ↓
Grant permissions
 ↓
Callback
 ↓
Exchange authorization code
 ↓
Store connection state
 ↓
Fetch account data
```

The UI should explicitly label simulated authentication as:

> Development simulation

Do not pretend a fake OAuth flow is real authentication.

---

# 15. API Architecture

Recommended structure:

```text
src/
├── app/
├── components/
├── features/
│   ├── dashboard/
│   ├── analytics/
│   ├── content/
│   ├── connections/
│   └── settings/
├── services/
│   ├── api/
│   ├── auth/
│   └── providers/
├── hooks/
├── lib/
├── utils/
├── constants/
└── data/
```

Provider abstraction:

```js
class SocialProvider {
  async getProfile() {}
  async getOverview() {}
  async getGrowth() {}
  async getContent() {}
}
```

Concrete adapters implement the same interface.

---

# 16. State Management

Use local React state for isolated UI state.

Use a dedicated global state solution only where state is genuinely cross-cutting.

Recommended global state:

- Auth/session
- Connected platforms
- Global filters
- Theme
- Workspace

Avoid putting every API response into global state.

Server/API state should have caching and invalidation semantics.

---

# 17. Error Handling

Every API request should account for:

- Loading
- Success
- Empty
- Unauthorized
- Forbidden
- Not found
- Rate limited
- Network failure
- Server failure
- Unknown failure

The UI must provide:

- Human-readable message
- Retry action
- Relevant technical information in development mode only

---

# 18. Performance Requirements

- Lazy-load heavy analytics views.
- Avoid unnecessary chart re-renders.
- Memoize expensive derived calculations.
- Debounce search.
- Cancel obsolete requests.
- Cache repeated API requests.
- Paginate content.
- Avoid loading all historical data at once.

Target:

- Fast first meaningful render on a normal connection.
- No visibly frozen UI during data fetching.

---

# 19. Accessibility

The application must target WCAG 2.2 AA principles.

Requirements:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible labels
- Sufficient contrast
- Chart summaries for screen readers
- Buttons must have meaningful labels
- Do not rely on color alone
- Reduced-motion consideration

---

# 20. Responsive Requirements

Breakpoints:

- Mobile: < 640px
- Tablet: 640–1024px
- Desktop: 1024px+

Mobile must not simply be a squeezed desktop.

Dashboard cards should reflow.

Sidebar becomes a mobile navigation mechanism.

Charts remain readable.

Tables should become cards or horizontally scroll when appropriate.

---

# 21. Theme

Two themes:

- Light
- Dark

The design system must use semantic tokens rather than hard-coded colors.

Example:

```css
--background
--surface
--surface-elevated
--text-primary
--text-secondary
--border
--accent
--success
--warning
--danger
```

---

# 22. Design Direction

Product personality:

- Technical
- Sharp
- Confident
- Modern
- Data-focused
- Minimal
- Slightly futuristic

Avoid:

- Generic purple SaaS gradients
- Excessive glassmorphism
- Overly rounded cards
- Huge hero sections
- Excessive animations
- Template-like dashboard layouts

---

# 23. Brand System

## Brand

**The Cluster**

Possible tagline:

> **One view. Every signal.**

## Primary Color

**Cluster Electric — `#6C63FF`**

Use sparingly as the brand accent.

## Secondary Accent

**Signal Lime — `#C7F36B`**

Use for positive growth, active states, and selected highlights.

## Dark Background

**Deep Graphite — `#0B0D10`**

## Surface

**Graphite — `#12161C`**

## Primary Text

**Cloud — `#F4F7FA`**

## Secondary Text

**Slate — `#8D98A8`**

## Danger

**Coral — `#FF6B6B`**

---

# 24. Typography

Primary font:

**Space Grotesk**

Use for:

- Headings
- Metrics
- Navigation
- Brand

Secondary/body font:

**Inter**

Use for:

- Body copy
- Tables
- Forms
- Supporting text

Numbers should use tabular/monospaced numeric styling where appropriate.

---

# 25. Animation

Animation should communicate state, not decorate the interface.

Use:

- 150–250ms transitions
- Subtle chart transitions
- Skeleton shimmer
- Dropdown transitions
- Sidebar transitions
- Toast entrance/exit

Avoid:

- Constant floating animations
- Excessive parallax
- Long transitions
- Animating every card on page load

---

# 26. Security Requirements

Never:

- Hard-code API secrets
- Store provider client secrets in frontend code
- Put refresh tokens in localStorage in a production architecture
- Trust client-side authorization alone

Development mock tokens are acceptable only as clearly simulated data.

---

# 27. Testing Requirements

Minimum:

### Unit
- Metric calculations
- Date utilities
- Number formatting
- API normalization

### Component
- Metric card
- Platform card
- Date selector
- Chart wrapper
- Content table

### Integration
- Dashboard loading
- Platform connection flow
- Error/retry flow
- Filter updates

### E2E
- Login
- Connect account
- Open dashboard
- Change date range
- Disconnect account

---

# 28. Definition of Done

The project is complete when:

- All MVP pages exist.
- Navigation works.
- Responsive layouts work.
- Mock API behaves asynchronously.
- API layer is separated from UI.
- Platform adapters exist.
- Dashboard renders normalized data.
- Charts are interactive.
- Date filters work.
- Platform filters work.
- Loading/empty/error states exist.
- Dark/light mode works.
- OAuth simulation works.
- Tests cover critical utilities and flows.
- README explains architecture.
- `.env.example` exists.
- No secrets are committed.
- Production build succeeds.
- App is deployable.

---

# 29. Suggested Milestones

## Phase 1 — Foundation
- Initialize project
- Install dependencies
- Configure Tailwind
- Configure fonts
- Establish design tokens
- Build routing
- Build layout

## Phase 2 — UI System
- Buttons
- Inputs
- Cards
- Badges
- Dropdowns
- Modal
- Toast
- Skeleton
- Empty states

## Phase 3 — Dashboard
- Summary cards
- Charts
- Platform comparison
- Content table
- Activity

## Phase 4 — Data Layer
- API client
- Mock API
- Normalizers
- Error handling
- Loading states

## Phase 5 — Connections
- Platform cards
- OAuth simulator
- Connection persistence
- Disconnect flow

## Phase 6 — Analytics
- Audience
- Engagement
- Content
- Platform details

## Phase 7 — Quality
- Responsive refinement
- Accessibility
- Tests
- Performance
- Security review

## Phase 8 — Deployment
- Environment variables
- Production build
- Deployment
- Monitoring/logging basics
- Documentation

---

# 30. Engineering Rules

1. Do not build everything in one file.
2. Do not put API calls directly inside presentation components.
3. Do not duplicate platform-specific logic.
4. Do not use fake data directly inside UI components.
5. Do not hide loading/error states.
6. Do not use `any`-style escape hatches conceptually even if JavaScript is used.
7. Keep functions small and focused.
8. Prefer composition over giant components.
9. Name variables by domain meaning.
10. Document non-obvious decisions.
11. Keep dependencies purposeful.
12. Do not over-engineer before the MVP works.
13. Refactor after functionality is verified.
14. Every major feature must be independently testable.
15. Build in vertical slices where possible.

---

# 31. Future AI Insight Layer

Do not implement this in MVP.

Future feature:

```text
Cluster Intelligence
```

It could analyze normalized metrics and produce:

- Growth observations
- Engagement anomalies
- Content trends
- Platform comparisons
- Suggested questions for deeper analysis

AI output must distinguish between:

- observed data
- calculated metrics
- generated interpretation

It should never fabricate metrics.

---

# 32. Success Criteria

The project succeeds as a learning project if the developer can explain:

- How data enters the application.
- How OAuth works.
- How API responses are normalized.
- Why provider adapters exist.
- How dashboard state is managed.
- How charts receive their data.
- How errors propagate.
- How caching works.
- How responsive UI is structured.
- How secrets are protected.
- How the application could move from mock APIs to real APIs.

If the developer cannot explain these systems, the project is not considered complete merely because the UI works.
