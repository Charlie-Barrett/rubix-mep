# Rubix MEP Website (dev environment)

Astro static site, built from the approved Aug 2026 draft pages and the V6 capabilities brochure. Ready to deploy on Vercel.

## Pages (12)

| URL | Source |
| --- | --- |
| `/` | Homepage V3 (client redraft, SBK reference) |
| `/about` | About Us V2 |
| `/services` | Services V2 (discipline blocks now anchored sections) |
| `/services/carbon-impact-studies` | New, from brochure p.8 + Coleton Fishacre study |
| `/capabilities` | New digital brochure page + PDF download |
| `/projects` | New index of the 5 case studies |
| `/projects/the-lampworks` | Project V1 draft |
| `/projects/knowle-retirement-village` | Project V1 draft |
| `/projects/shepperton-studios` | New, from brochure p.27 |
| `/projects/national-trust-carbon-impact-studies` | New, from brochure p.22-26 |
| `/projects/batsford-arboretum` | New, from brochure p.25 |
| `/contact` | Contact V1 |

## Run locally

```
npm install
npm run dev      # dev server at localhost:4321
npm run build    # static output in dist/
```

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub/GitLab).
2. In Vercel: New Project, import the repo. Astro is auto-detected (build `astro build`, output `dist`).
3. Set the production domain when ready; use the auto preview URL as the dev site to share with Alec.

## Standing brand rules (enforced, keep it that way)

- No em dashes anywhere in copy.
- The word "carbon" is always Rubix green (`.c-green` span); inherits on green surfaces. Page `<title>`/meta are exempt (unstylable).
- Footer logo is the white-square Rubix mark without "MEP" (`assets/logo-footer.png`).
- Sectors section is ON HOLD: no `/sectors` links anywhere; sector names appear as non-linked text.

## Known gaps / decisions to revisit

- Office phone number is a placeholder (flagged "Number TBC" on Contact, per draft).
- RIBA stage bullets on the homepage are example content pending final copy (noted on-page).
- Accreditation logos on About are placeholders, still to be supplied.
- Services child pillar pages (mechanical, electrical, public health, sustainability, SBEM etc.) are phase 2; blocks are anchored sections for now, chips non-linked.
- "Meet the full team" page (`/about/team`) not yet built; link removed from About until it exists.
- Carbon-impact model screenshots on Services are placeholders; export the two visuals from the brochure.
- One staff headshot (SG_Staff.HEIC) would not convert; not on the About team board.
- The downloadable brochure is the V6 May 2026 WIP; swap `public/Rubix-Capabilities-Brochure.pdf` when final.
- Batsford Arboretum has no site photography; its index card uses the logo and the case study runs without an image column.
