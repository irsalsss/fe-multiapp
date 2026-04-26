# Frontend Multi-App Workspace

A unified frontend monorepo architecture managing multiple React/Vite applications under a single domain, powered by Lerna and Docker.

## Repository Structure

This repository uses **npm workspaces** and **Lerna** to manage multiple frontend applications and shared packages.

- `apps/ai-thread/` - The AI-powered chat application.
- `apps/dashboard/` - (Coming soon) The central dashboard.
- `packages/ui-kit/` - (Coming soon) Shared Tailwind UI components.
- `packages/core/` - (Coming soon) Shared hooks, Zustand stores, and API services.

## Installation

Run the install command from the root directory to install dependencies and link all workspaces automatically:

```bash
npm install
```

## Local Development

To spin up all frontend applications simultaneously for local development, run:

```bash
npx lerna run dev --parallel
```
*(Alternatively, you can navigate into a specific app folder like `apps/ai-thread` and run `npm run dev` directly).*

## Production & Docker Architecture

This workspace utilizes a **Unified Domain Architecture** using an Nginx Reverse Proxy. All apps are served on the same domain but under different path routes. This helps solve CORS issues and allows for seamless shared authentication state.

To build the static assets and serve the entire ecosystem via Docker:

```bash
docker compose up --build
```

Once running, the Nginx Gateway will route traffic seamlessly. You can access the applications locally at:
- **AI Thread:** `http://localhost:8080/app/ai-thread/`

## Core Tech Stack

- **Infrastructure:** Lerna, npm Workspaces, Docker, Nginx
- **Framework:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4
- **State Management:** TanStack React Query (Server), Zustand (Client)
- **Routing:** React Router DOM
- **Authentication:** Clerk
- **AI Integration:** Google Gemini API (via backend)
- **Testing:** Jest

## Design Inspiration

Thanks to the Figma community for the original chat design inspiration:
[@ThreadGPT-Redesign](https://www.figma.com/design/ZcdYFLfNlOxu3c7tVzmU5R/ThreadGPT-Redesign--Community-?node-id=0-1&t=wCJ7Zz6Z61jADRB8-0)
