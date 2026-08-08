# ClientVault

A lightweight CRM (Client Relationship Manager) built for freelancers to track clients, project status, and notes — with a free/pro plan gating system, dark mode, and a responsive UI.

![ClientVault dashboard preview](public/bgimage.png)

## Features

- **Authentication** — simple login flow with persisted sessions
- **Client management** — add, edit, and remove clients
- **Project status tracking** — mark clients as Lead, Active, or Completed
- **Notes** — add, edit, and delete notes per client
- **Free / Pro plan gating** — free plan capped at 3 clients, with an in-app upgrade flow
- **Dark mode** — app-wide light/dark theme toggle, persisted across sessions
- **Fully responsive** — usable from mobile to desktop
- **PDF export** — coming soon

## Tech Stack

- **React** (Vite) — component architecture and hooks
- **React Router** — client-side routing, protected routes, dynamic params
- **Tailwind CSS v4** — utility-first styling and dark mode
- **Context API** — auth, plan, theme, and client data state, with custom hooks (`useAuth`, `usePlan`, `useTheme`, `useClients`)
- **localStorage** — client-side data persistence (no backend yet)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/razamughal333/taskflow-SAAS.git
cd taskflow-SAAS
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder.

## Project Structure

```
src/
├── components/       # Reusable UI (Navbar, ClientCard, ProtectedRoute)
├── context/          # React Context providers (Auth, Plan, Theme, Clients)
├── hooks/            # Custom hooks wrapping each Context
├── pages/            # Route-level pages (Login, Dashboard, ClientDetail, Upgrade, NotFound)
├── data/             # Seed/fake data
├── App.jsx           # Route definitions and provider tree
└── main.jsx          # App entry point
```

## Data & Persistence

All data (clients, notes, plan, auth session, theme) currently lives in the browser's `localStorage` — there is no backend or database yet. Data is scoped per browser/device and is not shared across sessions.

## Roadmap

- [ ] Real backend + database (replacing localStorage)
- [ ] Axios-based API integration
- [ ] Actual PDF export for client details
- [ ] Real payment integration for the Pro plan
- [ ] Redux Toolkit for state management at scale

## License

This project is for personal/portfolio use.
