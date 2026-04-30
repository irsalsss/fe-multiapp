# Frontend Multi-App Workspace

A unified frontend monorepo architecture managing multiple React/Vite applications under a single domain, powered by Lerna and Docker.

## Repository Structure

This repository uses **npm workspaces** and **Lerna** to manage multiple frontend applications and shared packages.

- `apps/ai-thread/` - The AI-powered chat application ([Live Demo](https://i-faaza.com/app/ai-thread)).
- `apps/dashboard/` - (Coming soon) The central dashboard.
- `packages/ui-kit/` - (Coming soon) Shared Tailwind UI components.
- `packages/core/` - (Coming soon) Shared hooks, Zustand stores, and API services.

## Related Repositories

- **Backend:** [be-multiapp](https://github.com/irsalsss/be-multiapp)

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
- **AI Thread (Local):** `http://localhost:5173/app/ai-thread`
- **AI Thread (Live):** [https://i-faaza.com/app/ai-thread](https://i-faaza.com/app/ai-thread)

- **Me (Local):** `http://localhost:5173/app/me`
- **Me (Live):** [https://i-faaza.com/app/me](https://i-faaza.com/app/me)

## Core Tech Stack

- **Infrastructure:** Lerna, Docker, Nginx
- **Framework:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS v4
- **Component Styling:**
  - **[Class Variance Authority (CVA)](https://cva.style/)**: We use CVA to manage component variants (like types and sizes) in a declarative and type-safe manner, eliminating the need for complex conditional logic within component bodies.
  - **[Tailwind Merge (twMerge)](https://github.com/dcastil/tailwind-merge)**: We use `twMerge` to intelligently merge Tailwind CSS classes, ensuring that variant-specific styles or custom `className` props correctly override base styles without conflicts.
- **State Management:** TanStack React Query (Server), Zustand (Client)

- **Routing:** React Router DOM
- **Authentication:** Clerk
- **AI Integration:** Google Gemini API (via backend)
- **Testing:** Jest

## Design Inspiration

Thanks to the Figma community for the original chat design inspiration:
[@ThreadGPT-Redesign](https://www.figma.com/design/ZcdYFLfNlOxu3c7tVzmU5R/ThreadGPT-Redesign--Community-?node-id=0-1&t=wCJ7Zz6Z61jADRB8-0)
