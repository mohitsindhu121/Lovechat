# Romantic Couples Chat App

## Overview

A romantic couples chat application designed for emotional connection between partners. The app provides a real-time messaging experience with a soft, romantic aesthetic inspired by WhatsApp's chat patterns, Hinge's romantic styling, and Instagram's profile interactions. Features include live chat messaging, a decorative love calendar, and animated falling hearts background.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state with 1-second polling for real-time chat updates
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for falling hearts and smooth transitions
- **Typography**: Custom Google Fonts - Dancing Script (romantic headers), Playfair Display (elegant subheadings), Quicksand (body text)

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Pattern**: RESTful API with type-safe route definitions in `shared/routes.ts`
- **Validation**: Zod schemas for request/response validation, integrated with Drizzle via drizzle-zod

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database table definitions
- **Migrations**: Managed via `drizzle-kit push` command

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Route page components
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
└── shared/           # Shared types and schemas
    ├── schema.ts     # Drizzle table definitions
    └── routes.ts     # API contract definitions
```

### Build System
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **pg**: Node.js PostgreSQL client
- **connect-pg-simple**: Session store for PostgreSQL (available but not currently used)

### UI Component Libraries
- **Radix UI**: Headless component primitives (dialog, dropdown, popover, etc.)
- **shadcn/ui**: Pre-styled component collection built on Radix
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **Vaul**: Drawer component
- **cmdk**: Command palette component

### Data & Forms
- **TanStack React Query**: Async state management
- **React Hook Form**: Form handling with `@hookform/resolvers`
- **Zod**: Schema validation
- **date-fns**: Date formatting utilities

### Styling & Animation
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx/tailwind-merge**: Class name utilities
- **Framer Motion**: Animation library
- **react-day-picker**: Calendar component