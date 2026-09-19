# The Cluster — Social Analytics Dashboard

> **One view. Every signal.**

**The Cluster** is a serious, production-minded social-media analytics workspace built to aggregate metrics across **YouTube**, **Instagram**, and **X (Twitter)** into a single, unified interface.

It is designed to demonstrate real-world frontend engineering practices, strongly typed provider adapter patterns, asynchronous data handling with simulated latency, partial failure resiliency, custom design system, and development-mode OAuth authorization simulation.

---

## 🌟 Key Features

- **Unified Dashboard**: Aggregates total audience, total views, average engagement rate, and growth trends across YouTube, Instagram, and X.
- **Provider Adapter Architecture**: Decouples UI components from raw provider API shapes via normalized data contracts.
- **Asynchronous Mock API Layer**: Simulates 400–1200ms network latency, rate limiting, and controlled error simulation.
- **Partial Failure Resiliency**: If one provider (e.g., Instagram) encounters an error, available signals from YouTube and X continue to render without taking down the entire dashboard.
- **Development OAuth 2.0 Simulator**: Interactive authorization flow modal with permission scope checklist, simulated token exchange, and toast notifications.
- **Interactive Chart.js Visualizations**: Audience growth line charts and engagement breakdown bar charts with screen-reader accessible summaries.
- **Content Library**: Searchable, filterable, and paginated data table for posts and video performance signals with detailed single-item views.
- **Custom Design System**: Deep Graphite dark mode palette (`#0B0D10`, `#12161C`, `#181D25`), Signal Lime (`#C7F36B`), Cluster Electric (`#6C63FF`), and typography combining *Space Grotesk* and *Inter*.
- **Dark / Light Theme System**: Complete theme toggling with system preference fallback.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Custom CSS Variables
- **Routing**: React Router DOM v7
- **Data Visualization**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **Dates**: date-fns
- **Testing**: Vitest + React Testing Library + jsdom

---

## 📁 Project Architecture

```text
src/
├── app/
│   ├── router.tsx                # Route definitions
│   └── providers.tsx             # Context Providers wrapper
├── components/
│   ├── ui/                       # Design system primitives (Button, Card, Badge, Modal, etc.)
│   ├── layout/                   # AppShell, Sidebar, Topbar & Header filter controls
│   └── charts/                   # Chart.js GrowthChart & EngagementChart
├── features/
│   ├── dashboard/                # Dashboard overview, KPI cards & platform cards
│   ├── analytics/                # Deep-dive analytics tabs
│   ├── content/                  # Searchable content table & detail view
│   ├── connections/              # Account connections & OAuth simulator
│   └── settings/                 # Profile, appearance, notifications & security
├── services/
│   ├── api/                      # apiClient (latency/error simulation) & mockDatabase
│   ├── providers/                # Provider adapters & normalizers (YouTube, Instagram, X)
│   ├── analyticsService.ts       # Metric aggregator with partial failure handling
│   └── connectionService.ts      # Connection state & OAuth simulator logic
├── context/                      # ThemeContext, FilterContext, ToastContext
├── hooks/                        # Custom data fetching hooks (useDashboardData, useContentData)
└── types/                        # Normalized domain & filter TypeScript definitions
```

---

## 🚀 Getting Started

### Prerequisites

Node.js (v18+) and npm.

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/the-cluster.git
cd the-cluster

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🧪 Running Tests & Build

```bash
# Run static type checking
npm run lint

# Run Vitest unit tests
npm run test

# Run production build
npm run build
```

---

## 🎓 Engineering Concepts Demonstrated

1. **Normalized Provider Data Model**: Prevents dashboard components from depending directly on raw API responses (e.g. `subscriberCount` vs `followers_count`).
2. **Metric Capability Boundaries**: Represents unsupported provider metrics explicitly as `null` (e.g., basic Instagram API does not expose post shares) rather than fabricating fake data.
3. **Controlled Failures**: Allows testing network resiliency by triggering partial provider errors without breaking valid platform datasets.
4. **Accessible Semantics**: ARIA roles, keyboard focus-visible rings, focus trapping in modals, and screen-reader summaries on data charts.

---

## 📄 License

MIT License.
