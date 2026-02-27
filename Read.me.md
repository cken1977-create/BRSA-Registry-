# BRSA Registry — BRSAregistry.com

**The Sovereign Registry of Behavioral and Organizational Readiness**

---

## What This Is

The public-facing institutional website for the BRSA Registry. This site is the federal front door of the institution — mandate, doctrine, public verification, and evaluator onboarding.

It is not a marketing site. It is not a template. It is a sovereign, permanent, institutional interface built to federal-grade standards.

---

## Architecture

This repository contains the static public site only.

```
brsaregistry/
└── index.html        # Complete public site — all six pages
```

**This site is one layer of a three-layer architecture:**

| Layer | Tool | Purpose |
|---|---|---|
| Public Site | This repo → Vercel | Mandate, doctrine, registry lookup UI, evaluator onboarding |
| Application Layer | Next.js (separate repo) | Evaluator dashboards, participant portals, readiness workflows |
| Registry Engine | Railway (legacyline-core) | All state changes, readiness logic, ledger events, API |

The public site never touches the registry engine directly. When the API is live, the Registry Lookup page connects through the application layer only.

---

## Pages

| Page | Path | Purpose |
|---|---|---|
| Homepage | `/` | Mandate, what the registry is, canonical states |
| Institutional Mandate | `/mandate` | Mission, authority, governance |
| Readiness Doctrine | `/doctrine` | FRARI standard, five principles, methodology |
| Registry Lookup | `/registry` | Public participant ID verification |
| Evaluator Onboarding | `/evaluators` | Requirements, controlled access, inquiry |
| Contact | `/contact` | Four departmental offices, response policy |

---

## Brand System

| Token | Value | Use |
|---|---|---|
| Sovereign Blue | `#0A1628` | Background, hero, headers |
| Federal White | `#F5F5F0` | Primary text, CTAs |
| Institutional Gray | `#6B7280` | Secondary text, captions |
| Readiness Green | `#1A6B3A` | Active / Verified state |
| Readiness Yellow | `#B58A00` | Conditional / Pending state |
| Readiness Red | `#8B1A1A` | Not Cleared / Inactive state |
| Rule Line | `#1E2D45` | Dividers, borders |

**Typography:** Playfair Display (headlines) + IBM Plex Sans (body) + IBM Plex Mono (labels, codes)

**Rules:** No gradients. No rounded corners. No animations beyond color shifts. No imagery. No decorative elements. Every future edit must conform to this system.

---

## Deployment

Hosted on Vercel. Deploys automatically on push to `main`.

**To deploy:**
1. Push changes to `main`
2. Vercel builds and deploys automatically
3. Live at `brsaregistry.com`

**To connect the custom domain:**
1. Vercel → Project Settings → Domains
2. Add `brsaregistry.com`
3. Point DNS to Vercel nameservers

---

## Registry Lookup — Current State

The Registry Lookup page is currently scaffolded with demo data. It is not connected to the live registry engine.

**Demo participant IDs:**
- `BRSA-00441892` → Green (Active / Verified)
- `BRSA-00882341` → Yellow (Conditional / Pending)
- `BRSA-00119877` → Red (Not Cleared)

**When the API is ready**, the lookup function in `index.html` will be updated to call the Kernel/Facade API endpoint. The UI does not change — only the data source.

---

## What This Site Is Not

- Not a Next.js app — that is the application layer (separate repo)
- Not connected to the registry engine — that is legacyline-core on Railway
- Not a CMS — content updates are made directly in `index.html`
- Not a marketing site — do not add startup UI patterns, gradients, animations, or personality

---

## Maintainer

BRSA Registry · Office of Registry Affairs  
BRSAregistry.com
