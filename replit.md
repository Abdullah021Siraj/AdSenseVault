# Overview

SmartFinance Pro is a comprehensive financial planning web application that provides free financial calculators, comparison tools, and educational guides. The platform helps users make informed financial decisions by offering loan calculators, mortgage calculators, investment calculators, and loan comparison features. Built as a full-stack application with React frontend and Express backend, it integrates Google Analytics for tracking user engagement and includes SEO optimization for financial content discovery.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The client-side is built with React 18 and TypeScript, utilizing Vite as the build tool and development server. The application follows a component-based architecture with:

- **UI Framework**: Radix UI components with shadcn/ui styling system for consistent, accessible interface components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form inputs
- **Analytics Integration**: Custom Google Analytics implementation with page view and event tracking

## Backend Architecture

The server uses Express.js with TypeScript in a modular structure:

- **Server Framework**: Express.js with middleware for JSON parsing, request logging, and error handling
- **Development Environment**: Vite integration for hot module replacement during development
- **Storage Interface**: Abstracted storage layer with in-memory implementation for user data
- **Route Organization**: Centralized route registration with API prefix structure
- **Error Handling**: Centralized error middleware with proper HTTP status codes

## Data Storage Solutions

The application uses a flexible storage architecture:

- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon Database serverless integration
- **Schema Definition**: Centralized schema definition in shared directory with Zod validation
- **Local Storage**: Browser localStorage for user preferences, calculation history, and bookmark status
- **Session Management**: PostgreSQL session store with connect-pg-simple for user sessions

## Authentication and Authorization

Basic user management infrastructure is implemented with:

- **User Schema**: Username/password based authentication schema
- **Storage Interface**: CRUD operations for user management (getUser, getUserByUsername, createUser)
- **Session Storage**: PostgreSQL-backed session management for persistent user state

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle ORM**: Type-safe database queries and migrations with PostgreSQL dialect

## Analytics and Tracking
- **Google Analytics 4**: User behavior tracking, page views, and conversion events
- **Custom Analytics Hooks**: React hooks for tracking calculator interactions and user engagement

## UI and Styling
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design system variables
- **Shadcn/ui**: Pre-built component library with consistent styling patterns

## Development Tools
- **Vite**: Fast development server and build tool with React plugin
- **TypeScript**: Type safety across frontend and backend code
- **ESBuild**: Fast JavaScript bundling for production builds

## Third-Party Integrations
- **Replit Services**: Development environment integration with cartographer and error modal plugins
- **Font Services**: Google Fonts integration for Inter font family
- **CDN Assets**: Unsplash images for financial content and guide illustrations