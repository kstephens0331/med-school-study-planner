# Med School Study Planner

## Overview

An intelligent study planning tool designed for medical students. Built with Next.js and TypeScript, this application helps students organize their coursework, generate AI-powered study materials, create flashcard decks, schedule review sessions, and track progress across complex medical curricula.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 13 (App Router) |
| **Language** | TypeScript |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth with Next.js helpers |
| **Validation** | Zod |
| **Testing** | Jest with ts-jest |
| **AI Features** | Integrated AI endpoints for study content generation |

## Features

- **AI-Powered Study Content** — Generate study materials, summaries, and practice questions via built-in AI endpoints
- **Flashcard System** — Create, organize, and review flashcard decks with spaced repetition
- **Block-Based Organization** — Structure study plans around curriculum blocks and modules
- **Spaced Repetition Reviews** — Schedule and track review sessions using evidence-based learning techniques
- **Secure Authentication** — Supabase Auth integration with protected API routes
- **Input Validation** — Zod-powered request validation for all API endpoints
- **Error Handling** — Centralized error handler with structured error responses
- **Test Coverage** — Jest test suite for API routes and business logic

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase project (free tier works)

### Installation

```bash
git clone https://github.com/kstephens0331/med-school-study-planner.git
cd med-school-study-planner
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    api/
      ai/          # AI-powered study content generation
      auth/        # Authentication endpoints
      blocks/      # Curriculum block management
      cards/       # Flashcard CRUD operations
      review/      # Spaced repetition review scheduling
  lib/
    api.ts          # API client utilities
    error-handler.ts # Centralized error handling
    supabase/       # Supabase client configuration
    validator.ts    # Zod validation schemas
    validators.ts   # Additional validation logic
supabase/            # Database migrations and config
types/               # Shared TypeScript type definitions
```

## License

Proprietary — StephensCode LLC. All rights reserved.

---

**Built by StephensCode LLC**
