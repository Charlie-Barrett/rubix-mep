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
- The word "carbon" is always Rubix green (`.c-green` span); "low-carbon" is green as a whole phrase (13.10). Inherits on green surfaces. Page `<title>`/meta are exempt (unstylable).
- Footer logo is the white-square Rubix mark without "MEP" (`assets/logo-footer.png`).
- Sectors section is ON HOLD: no `/sectors` links anywhere; sector names appear as non-linked text.

## 18 Sept 2026 review round (client feedback, layout and styling only)

Applied: navy-first palette with magenta and lime demoted to text accents; all inner-page banners on the homepage navy duotone; header CTA transparent with white outline; menu is a right-hand side panel; white-wordmark-on-white-tile logo on dark banners (`logo-white-tile-mep.png`), blue version for light pages, navy tile fades in behind the docked homepage logo; enquiry form (first name, last name, company, email) replaces the old CTA band on every page (`Cta.astro`); "Sustainability" renamed Building Physics (pillar, services block moved under the three discipline cards, footer); homepage differentiator is Building Physics with the "How it works" button removed; client band white with blue label; sectors as a static two-column list; featured project cards larger with a hover reveal (client, project, sector, value, key fact); testimonials as three short staggered quotes linking to project pages; About fully navy with white outlines, leadership photo and careers photo removed, directors as a hover row, Vision above the team, team 4-wide, top "Join us" pill removed, "chartered" removed from copy; Contact white with the full address (Unit 612/13B), mobiles removed, map embedded by address (no "JQ Modern" label), separate careers form.

Forms: interim only. `public/js/site.js` shows the thank-you state client-side and sends nothing until the HubSpot account exists; swap in the HubSpot embed or Forms API post and keep the markup.

## 13 Oct 2026 review round (Alec walkthrough, recorded in Notion)

Applied: project tiles are less wide (projects grid 4:3, homepage carousel 3:2, were 16:10) so the near-square CGIs lose far less to the crop, and every image has a `pos` crop anchor in `src/data/projects.js` so the building, not sky or trees, fills the tile (Chelmsford bottom, Batsford top for the wavy roof, Corner House top so the roofline is not cut). Images always cover the tile; a letterbox/blurred-fill version was tried and rejected by Charlie. Capsules on the homepage carousel and the projects grid are now white with the accent-colour outline and text (pink was unreadable on navy); the sector capsule is white with navy. Lampworks capsule reads "Regal ME" (capsule = client, not project). Homepage carousel wraps at both ends. "Low-carbon" is now green as a whole phrase (`<span class="c-green">low-carbon</span>`), extending the carbon-green rule: carbon is bad, low carbon is good.

Curborough now uses the two full-width architect CGIs (courtyard = card image, Farmers Table street = second image) and Tyntesfield uses Charlie's own 4:3 exterior photo (converted from HEIC, 2000px); both back to a normal crop. Still waiting on from Rubix: the two carbon impact study visuals for Services, Adam's colour headshot (SharePoint staff photos, "AB"), Sarah's photo, HubSpot form embed codes. Team page tweaks (Stuart up, Dave down, Winnie zoom, names-on-image hover) not yet done. Calke Abbey source image was a close crop of the roof; replaced 14.10 with the full elevation photo.

## 14 Oct 2026: project imagery from Rubix

New images dropped into `public/assets/` (web-sized, max 2000px, JPEG q82) and wired in. Naming is `<project-slug>-<subject>.jpg`; a `-v2` suffix means it replaces an earlier file of the same shot.

- Calke Abbey: `calke-abbey-hub-kitchen-elevation.jpg` (full 4:3 PV elevation) is now the card, hero and crop anchor `center 65%`, answering the 13.10 note that the old source was a close crop of the roof. Gallery: `calke-abbey-hub-kitchen-gable.jpg` and `calke-abbey-bbq-kiosk.jpg`. The old `calke-abbey-hub-kitchen.jpg` / `-v2.jpg` are no longer referenced.
- The Lampworks: `lampworks-frontage-cgi.jpg` (16:9, 2000px) replaces the 885px `lampworks-cgi.png` crop for card, hero and first gallery image; crop anchor `center 60%`. `lampworks-cgi.png` no longer referenced. The supplied street-view file is the same as the existing `lampworks-street.jpg` and was not replaced.
- Corner House: `corner-house-port-loop-cgi-v2.jpg` (full 16:9 canal view) replaces the 831px crop for card, hero and gallery; anchor `center 30%`. Second gallery image `corner-house-port-loop-detail-cgi.jpg`.
- Melrose Grange (TO CONFIRM with Rubix: the two CGIs carry no signage and were placed on a best reading): gallery now `melrose-grange-courtyard-cgi.jpg` and `melrose-grange-bistro-cgi.jpg`; card and hero unchanged.
- Tyntesfield (TO CONFIRM with Rubix: the kitchen photos were placed here because the stone-and-brick walls match the Cow Barn and the copy mentions the bakery; they could be the Calke Abbey Finishing Kitchen refurbishment instead): gallery now `tyntesfield-cow-barn-kitchen.jpg` plus the existing shop photo. `tyntesfield-cow-barn-kitchen-2.jpg` is saved but unused.
- Curborough: the two supplied CGIs are identical in size to the files already in use and were not replaced.

`npm run build` could not be run from the Claude session (the shell cannot delete Vite cache files), so `dist/` is stale; run it locally or let Vercel build from source.

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
