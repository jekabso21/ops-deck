## 📄 Final `README.md`

````md
# OpsDeck

> A modern, self-hosted operations platform for internal tooling — built with Next.js, NestJS, and PostgreSQL.

---

## 🚧 Status

This project is currently in early active MVP development.

It is intended as a **modular open-source base** that can later be extended into a full SaaS platform with self-hosted and cloud deployment options.

---

## 🧱 Monorepo Structure

```txt
apps/
  frontend/     → Next.js + Tailwind + ShadCN
  backend/      → NestJS + PostgreSQL (via Prisma)

packages/
  ui/           → Shared components (optional)
  utils/        → Shared helpers

prisma/         → Schema and migrations
docker/         → Dockerfiles and compose setup
docs/           → Obsidian-compatible documentation
````

---

## 🧪 Tech Stack

* **Frontend:** Next.js, Tailwind CSS, ShadCN, React Hook Form, Zod
* **Backend:** NestJS, PostgreSQL (via Prisma), Redis, MongoDB (optional)
* **Microservices (planned):** Golang (Fiber/Gin)
* **Database:** PostgreSQL (primary), MongoDB (forms), Redis, Meilisearch
* **API:** REST-first (v1), GraphQL (future)
* **Auth:** JWT + RBAC, NextAuth (optional)
* **Dev Tools:** Turbo, PNPM, ESLint, Prettier, GitHub Actions (planned)

---

## 🛠 Setup

### Install

```bash
pnpm install
```

### Dev

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

---

## 📜 License

Licensed under the [MIT License](./LICENSE).

---

## 🙋 Contributing

This repo is still in MVP phase. Once stabilized, contribution guidelines and issue templates will be opened.

---

## 🔗 Links

* [Project Docs](./docs)
* [Roadmap](./docs/02_architecture/roadmap.md)