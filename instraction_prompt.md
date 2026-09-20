# SPORTIFY — UPDATED DATA FETCHING ARCHITECTURE

## IMPORTANT ARCHITECTURE CHANGE

The frontend MUST NOT use Axios.

Do NOT install Axios.

Do NOT create a client-side Axios instance.

Do NOT create a generic browser API client.

Use the native Next.js `fetch()` API and Next.js server-side data fetching architecture.

---

# 1. NEXT.JS DATA FETCHING PRINCIPLE

The application should follow a **Server-First Data Fetching Architecture**.

Default approach:

```text
Next.js Server Component
        ↓
Feature Data Function
        ↓
native fetch()
        ↓
Express Backend API
        ↓
PostgreSQL
```

The browser should NOT directly communicate with the backend for normal initial page data.

---

# 2. FEATURE-BASED DATA DIRECTORY

All server-side data access functions must be organized by feature.

Use:

```text
src/
├── data/
│   ├── tournaments/
│   │   ├── get-tournaments.ts
│   │   ├── get-tournament.ts
│   │   ├── get-tournament-standings.ts
│   │   ├── get-tournament-fixtures.ts
│   │   ├── get-tournament-stats.ts
│   │   └── index.ts
│   │
│   ├── teams/
│   │   ├── get-teams.ts
│   │   ├── get-team.ts
│   │   ├── get-team-squad.ts
│   │   └── index.ts
│   │
│   ├── players/
│   │   ├── get-players.ts
│   │   ├── get-player.ts
│   │   ├── get-player-stats.ts
│   │   └── index.ts
│   │
│   ├── matches/
│   │   ├── get-matches.ts
│   │   ├── get-match.ts
│   │   ├── get-live-matches.ts
│   │   ├── get-match-events.ts
│   │   └── index.ts
│   │
│   ├── stats/
│   │   ├── get-top-scorers.ts
│   │   ├── get-top-assists.ts
│   │   └── index.ts
│   │
│   ├── notifications/
│   │   ├── get-notifications.ts
│   │   └── index.ts
│   │
│   └── users/
│       ├── get-users.ts
│       └── index.ts
│
├── actions/
│   ├── auth/
│   ├── tournaments/
│   ├── teams/
│   ├── players/
│   ├── matches/
│   └── notifications/
```

---

# 3. SERVER DATA FETCHING

Normal GET/read operations should be implemented as server-side functions.

Example:

```ts
import { Tournament } from "@/types/tournament";

export async function getTournaments(): Promise<Tournament[]> {
  const response = await fetch(
    `${process.env.API_URL}/api/v1/tournaments`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tournaments");
  }

  const result = await response.json();

  return result.data;
}
```

The exact implementation can be improved according to the project's Next.js version.

---

# 4. "USE SERVER" RULE

Do NOT blindly put `"use server"` in every data-fetching file.

Use the correct Next.js architecture.

### Server-side read functions

For example:

```text
src/data/tournaments/get-tournaments.ts
```

These can be normal server-only functions when called from Server Components.

---

### Server Actions

Use:

```ts
"use server";
```

for mutations/actions such as:

* create tournament
* update tournament
* delete tournament
* create team
* update player
* create match event
* update score
* approve team
* login/logout actions where appropriate
* form submissions

Example:

```ts
"use server";

export async function createTournament(formData: FormData) {
  // validate
  // send request to backend
  // revalidate relevant routes
}
```

---

# 5. SERVER-ONLY DATA ACCESS

Server-side API functions must never accidentally become browser code.

When necessary, use:

```ts
import "server-only";
```

Example:

```ts
import "server-only";

export async function getTournament(id: string) {
  const response = await fetch(
    `${process.env.API_URL}/api/v1/tournaments/${id}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tournament");
  }

  const result = await response.json();

  return result.data;
}
```

---

# 6. PAGE → DATA FUNCTION ARCHITECTURE

Pages should remain clean.

Do NOT write large fetch calls directly inside:

```text
page.tsx
```

Instead:

```text
src/app/tournaments/page.tsx
        ↓
src/data/tournaments/get-tournaments.ts
        ↓
Backend API
```

Example:

```tsx
import { getTournaments } from "@/data/tournaments/get-tournaments";

export default async function TournamentsPage() {
  const tournaments = await getTournaments();

  return (
    <TournamentList tournaments={tournaments} />
  );
}
```

This keeps UI and data access separated.

---

# 7. TOURNAMENT FEATURE EXAMPLE

The complete tournament feature should follow:

```text
src/
├── app/
│   └── tournaments/
│       ├── page.tsx
│       └── [id]/
│           ├── page.tsx
│           ├── standings/
│           │   └── page.tsx
│           ├── fixtures/
│           │   └── page.tsx
│           └── stats/
│               └── page.tsx
│
├── components/
│   └── tournaments/
│       ├── tournament-card.tsx
│       ├── tournament-grid.tsx
│       ├── tournament-header.tsx
│       ├── tournament-tabs.tsx
│       ├── standings-table.tsx
│       ├── fixture-list.tsx
│       └── tournament-stats.tsx
│
├── data/
│   └── tournaments/
│       ├── get-tournaments.ts
│       ├── get-tournament.ts
│       ├── get-tournament-standings.ts
│       ├── get-tournament-fixtures.ts
│       └── get-tournament-stats.ts
│
├── actions/
│   └── tournaments/
│       ├── create-tournament.ts
│       ├── update-tournament.ts
│       ├── delete-tournament.ts
│       └── generate-fixtures.ts
│
└── types/
    └── tournament.ts
```

This pattern must be followed consistently for other features.

---

# 8. DEMO DATA DURING FRONTEND DEVELOPMENT

Before backend integration, use:

```text
src/data/
```

for frontend demo/mock data.

Organize it by feature:

```text
src/data/
├── tournaments/
├── teams/
├── players/
├── matches/
└── stats/
```

However, keep demo data separate from production API functions.

Recommended:

```text
src/
├── data/
│   ├── mock/
│   │   ├── tournaments.ts
│   │   ├── teams.ts
│   │   ├── players.ts
│   │   └── matches.ts
│   │
│   ├── tournaments/
│   ├── teams/
│   ├── players/
│   └── matches/
```

The UI must be designed so switching:

```text
Mock Data
```

to:

```text
Backend API
```

does not require rewriting components.

---

# 9. FETCH CACHING

Use Next.js native fetch caching intentionally.

For mostly static data:

```ts
fetch(url, {
  next: {
    revalidate: 60,
  },
});
```

For frequently changing data:

```ts
fetch(url, {
  cache: "no-store",
});
```

For live match data, do not rely on stale static caching.

---

# 10. REALTIME DATA

Initial Match Center data:

```text
Server Component
      ↓
getMatch()
      ↓
Backend API
```

After page hydration:

```text
Client Match Center
      ↓
Socket.io
      ↓
Live Match Updates
```

The initial server-rendered data should provide the baseline state.

Socket.io should update that state after connection.

Do NOT make Socket.io the only source of match data.

PostgreSQL remains the source of truth.

---

# 11. CLIENT COMPONENT RULE

Use Client Components only when required.

Examples:

* interactive filters
* dropdowns
* tabs requiring client state
* forms
* dialogs
* realtime match updates
* animations requiring client execution
* browser APIs

Everything else should remain Server Components where practical.

Do NOT add:

```tsx
"use client";
```

to every component.

---

# 12. SERVER ACTIONS FOR MUTATIONS

For frontend mutations, prefer Server Actions where appropriate.

Example:

```text
Admin Form
    ↓
Server Action
    ↓
Backend API
    ↓
Database
    ↓
revalidatePath()
```

Example architecture:

```text
src/actions/tournaments/create-tournament.ts
```

```ts
"use server";

export async function createTournament(formData: FormData) {
  // validate form data

  // call backend API

  // handle response

  // revalidate affected pages

  // return structured result
}
```

---

# 13. DO NOT CREATE A GENERIC API HOOK SYSTEM

Avoid unnecessary abstractions such as:

```text
useApi()
useFetch()
useAxios()
apiClient()
```

unless a real architectural requirement appears.

Feature-specific data functions are preferred.

---

# 14. AUTHENTICATION DATA FLOW

Authentication should also follow the server-first architecture.

Do not store sensitive authentication secrets in localStorage.

Use a secure authentication strategy.

Where appropriate:

```text
Browser
   ↓
Next.js Server Action
   ↓
Backend Authentication API
   ↓
Secure Cookie
```

Protected server-side data:

```text
Server Component
   ↓
Server Data Function
   ↓
Authenticated Backend Request
   ↓
API
```

---

# 15. ADMIN DATA ARCHITECTURE

Admin feature should follow:

```text
src/app/(dashboard)/admin/
        ↓
src/data/
        ↓
src/actions/
        ↓
Backend API
```

Example:

```text
admin/tournaments/page.tsx
        ↓
getAdminTournaments()
        ↓
GET /api/v1/tournaments
```

Mutation:

```text
Create Tournament Form
        ↓
createTournament()
        ↓
POST /api/v1/tournaments
        ↓
revalidatePath("/admin/tournaments")
```

---

# 16. BACKEND REMAINS THE BUSINESS LOGIC LAYER

Even though Next.js Server Actions are used, NEVER move important business rules into Next.js.

For example:

Frontend Server Action:

```text
createTournament()
```

may validate input and call:

```text
POST /api/v1/tournaments
```

But the backend remains responsible for:

* authorization
* business rules
* database operations
* tournament validation
* fixture generation
* points calculation
* permissions
* transaction handling

---

# 17. UPDATED FRONTEND ARCHITECTURE

The final frontend architecture should therefore look approximately like:

```text
sportify-frontend/

src/
│
├── app/
│
├── components/
│
├── data/
│   ├── mock/
│   ├── tournaments/
│   ├── teams/
│   ├── players/
│   ├── matches/
│   ├── stats/
│   ├── notifications/
│   └── users/
│
├── actions/
│   ├── auth/
│   ├── tournaments/
│   ├── teams/
│   ├── players/
│   ├── matches/
│   └── notifications/
│
├── lib/
│   ├── utils.ts
│   ├── env.ts
│   └── api/
│       ├── fetcher.ts
│       └── response.ts
│
├── hooks/
├── store/
├── types/
├── constants/
└── config/
```

---

# 18. CENTRAL FETCH HELPER

A small native-fetch helper MAY be created if it genuinely reduces duplication.

Example:

```text
src/lib/api/fetcher.ts
```

It must use native:

```ts
fetch()
```

NOT Axios.

Its responsibilities may include:

* base URL handling
* common headers
* JSON parsing
* standardized error handling
* authentication forwarding
* request configuration

Do not turn it into an overly complex abstraction.

---

# 19. FINAL DATA FLOW

For READ operations:

```text
Next.js Server Component
        ↓
Feature Data Function
        ↓
Native fetch()
        ↓
Express API
        ↓
Service
        ↓
Prisma
        ↓
PostgreSQL
```

For WRITE operations:

```text
Client Form
        ↓
Next.js Server Action
        ↓
Express API
        ↓
Validation
        ↓
Authorization
        ↓
Service
        ↓
Prisma
        ↓
PostgreSQL
        ↓
Server Action
        ↓
revalidatePath / revalidateTag
```

For LIVE operations:

```text
Server Component
        ↓
Initial Server Fetch
        ↓
Match Page
        ↓
Client Realtime Component
        ↓
Socket.io
        ↓
Backend
        ↓
Database + Broadcast
```

---

# 20. IMPORTANT

The previous instruction:

> "Axios or native fetch through a centralized API layer"

is REPLACED.

The project MUST NOT use Axios.

The preferred approach is:

### READ

Native Next.js `fetch()` inside feature-specific server-side data functions.

### WRITE

Next.js Server Actions using `"use server"` where appropriate.

### REALTIME

Socket.io only where realtime behavior is required.

### BACKEND

Express + Prisma + PostgreSQL remains the actual backend/business/data layer.

---

# 21. FEATURE OWNERSHIP RULE

Every feature should keep its related code close together.

For example:

```text
Tournament
├── page
├── components
├── data
├── actions
├── types
└── validation
```

Do not create one giant:

```text
api.ts
```

containing every feature's API logic.

Keep the code modular and feature-oriented.

---

# 22. ANTIGRAVITY MUST FOLLOW THIS

Before creating any page, determine:

1. Is this page public or protected?
2. Can it be a Server Component?
3. What data does it need?
4. Which feature owns that data?
5. Which `src/data/<feature>/` function should provide it?
6. Is the data static, revalidated, dynamic, or realtime?
7. Does the page require a Client Component?
8. Is the operation a read or mutation?
9. If mutation, should it use a Server Action?
10. What backend endpoint will ultimately provide the data?

Then implement accordingly.

Do NOT place random fetch calls inside UI components.

Do NOT use Axios.

Do NOT make everything `"use client"`.

Do NOT make every file `"use server"` unnecessarily.

Use Next.js Server Components and Server Actions according to their intended purpose.
