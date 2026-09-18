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

## 18 Sept 2026 review round (client feedback, layout and styling only)

Applied: navy-first palette with magenta and lime demoted to text accents; all inner-page banners on the homepage navy duotone; header CTA transparent with white outline; menu is a right-hand side panel; white-wordmark-on-white-tile logo on dark banners (`logo-white-tile-mep.png`), blue version for light pages, navy tile fades in behind the docked homepage logo; enquiry form (first name, last name, company, email) replaces the old CTA band on every page (`Cta.astro`); "Sustainability" renamed Building Physics (pillar, services block moved under the three discipline cards, footer); homepage differentiator is Building Physics with the "How it works" button removed; client band white with blue label; sectors as a static two-column list; featured project cards larger with a hover reveal (client, project, sector, value, key fact); testimonials as three short staggered quotes linking to project pages; About fully navy with white outlines, leadership photo and careers photo removed, directors as a hover row, Vision above the team, team 4-wide, top "Join us" pill removed, "chartered" removed from copy; Contact white with the full address (Unit 612/13B), mobiles removed, map embedded by address (no "JQ Modern" label), separate careers form.

Forms: interim only. `public/js/site.js` shows the thank-you state client-side and sends nothing until the HubSpot account exists; swap in the HubSpot embed or Forms API post and keep the markup.

## Known gaps / decisions to revisit

- Case studies still to add from the SharePoint tender documents: Coswell Hotel & Spa, Kerber Craft Centre.
- Client logo band still shows the eight logos from the Aug build; the full back-page set from the brochure (National Trust, Netto, Walmart first; defunct organisation removed) is to be supplied and dropped in.
- Director bios: hover text is placeholder pending marked-up copy.
- Departed team member still in the team grid (which file to remove not yet confirmed); Adam's colour headshot to be checked on SharePoint; all headshots to be reshot by a photographer.
- Homepage loading animation (ident burst, from the holding page) not yet ported; the loading element the client referred to as the "skull" is to be replaced by it.
- Capabilities and Services overlap flagged by the client; content pass to follow.
- Google sitemap submission deliberately held back until content is final.

- Office phone number is a placeholder (flagged "Number TBC" on Contact, per draft).
- RIBA stage bullets on the homepage are example content pending final copy (noted on-page).
- Accreditation logos on About are placeholders, still to be supplied.
- Services child pillar pages (mechanical, electrical, public health, sustainability, SBEM etc.) are phase 2; blocks are anchored sections for now, chips non-linked.
- "Meet the full team" page (`/about/team`) not yet built; link removed from About until it exists.
- Carbon-impact model screenshots on Services are placeholders; export the two visuals from the brochure.
- One staff headshot (SG_Staff.HEIC) would not convert; not on the About team board.
- The downloadable brochure is the V6 May 2026 WIP; swap `public/Rubix-Capabilities-Brochure.pdf` when final.
- Batsford Arboretum has no site photography; its index card uses the logo and the case study runs without an image column.
