// Featured project order and card details, per the client's 01.10.2026 review.
// Each card carries one accent colour, cycling light blue -> pink -> green down the
// list, applied to the capsule, the field labels and the "View project" link.
// Copy comes from the capabilities brochure and the client's review notes; the
// word "carbon" is wrapped in .c-green per the brand rule.
const BLUE = 'var(--blue)', PINK = 'var(--magenta)', GREEN = 'var(--lime)';

export const projects = [
  {
    slug: 'the-lampworks', accent: BLUE,
    img: '/assets/lampworks-cgi.png', alt: 'The Lampworks build-to-rent development',
    capsule: 'The Lampworks', tag: 'Residential', title: 'The Lampworks',
    client: 'Regal ME / Build Fifty5',
    project: '148 build-to-rent apartments across five blocks',
    sector: 'Residential', value: 'c. &pound;23.0m',
    fact: 'RIBA Stage 4C construction issue, BIM Level 2',
    indexTag: '&pound;23m &middot; Residential'
  },
  {
    slug: 'chelmsford-care-home', accent: PINK,
    img: '/assets/chelmsford-care-home-cgi.jpg', alt: 'CGI of the new 60-bed care home at Chelmsford for Lovett Care',
    capsule: 'Lovett Care', tag: 'Later Living &amp; Care', title: 'Chelmsford Care Home',
    client: 'Lovett Care',
    project: 'New purpose-built 60-bed care home (use Class C2)',
    sector: 'Later Living &amp; Care', value: 'c. &pound;10.0m',
    fact: 'Full MEP consultancy under Design and Build, BREEAM Excellent In-Use',
    indexTag: '&pound;10m &middot; Later Living &amp; Care'
  },
  {
    slug: 'national-trust-carbon-impact-studies', accent: GREEN,
    img: '/assets/national-trust-photo.jpg', alt: 'National Trust carbon impact studies',
    capsule: 'National Trust', tag: 'Heritage', title: 'Site-wide carbon impact studies',
    client: 'National Trust',
    project: 'Net zero <span class="c-green">carbon</span> masterplanning across multiple UK estates',
    sector: 'Heritage', scope: '40+ sites studied UK-wide',
    fact: 'Supporting the Trust&rsquo;s 2030 net zero pledge',
    indexTag: 'Heritage &middot; Building Physics'
  },
  {
    slug: 'knowle-retirement-village', accent: BLUE,
    img: '/assets/knowle.jpg', alt: 'Knowle Retirement Village',
    capsule: 'Opus, Knowle', tag: 'Later Living', title: 'Knowle Retirement Village',
    client: 'Opus Villages',
    project: 'New-build retirement village (RIBA Stage 3 design)',
    sector: 'Later Living &amp; Care', value: 'c. &pound;34.0m',
    fact: 'EPC A, net zero energy options appraised',
    indexTag: '&pound;34m &middot; Later Living'
  },
  {
    slug: 'curborough-craft-centre', accent: PINK,
    img: '/assets/curborough-cgi.jpg', alt: 'CGI of Curborough Craft Centre: timber-clad retail units around a landscaped courtyard',
    capsule: 'McPhillips', tag: 'Mixed-use &amp; Retail', title: 'Curborough Craft Centre',
    client: 'McPhillips',
    project: 'Mixed-use farm diversification project in Lichfield: six large-scale retail units, a children&rsquo;s nursery and garden centre',
    sector: 'Mixed-use &amp; Retail',
    fact: 'The existing Farm, Countryside and Garden Centre will more than double in size',
    indexTag: 'Mixed-use &amp; Retail'
  },
  {
    slug: 'melrose-grange', accent: GREEN,
    img: '/assets/melrose-grange-cgi.jpg', alt: 'CGI of Melrose Grange care home, St Mellons, Cardiff',
    capsule: 'Hallmark', tag: 'Later Living &amp; Care', title: 'Melrose Grange, Cardiff',
    client: 'Hallmark Luxury Care Homes',
    project: '85-bed care home providing residential, dementia and nursing care, St Mellons',
    sector: 'Later Living &amp; Care', value: 'c. &pound;18.0m',
    fact: 'The first all-electric care home in the Hallmark portfolio',
    indexTag: '&pound;18m &middot; Later Living &amp; Care'
  },
  {
    slug: 'shepperton-studios', accent: BLUE,
    img: '/assets/shepperton-internal.jpg', alt: 'Shepperton Studios F&B fit-out',
    capsule: 'Shepperton Studios', tag: 'Retail &amp; Hospitality', title: 'Shepperton Studios',
    client: 'Space Group',
    project: 'Cat B food and beverage fit-out across three buildings',
    sector: 'Retail &amp; Hospitality', value: 'c. &pound;2.0m',
    fact: 'RIBA Stage 4 design, BIM Level 2 clash-free model',
    indexTag: '&pound;2m &middot; Retail &amp; Hospitality'
  },
  {
    slug: 'tyntesfield-cow-barn', accent: PINK,
    img: '/assets/tyntesfield-cow-barn.jpg', alt: 'The Cow Barn cafe at National Trust Tyntesfield',
    capsule: 'National Trust', tag: 'Heritage', title: 'Tyntesfield Cow Barn',
    client: 'National Trust',
    project: 'Refurbishment of the Grade II listed Cow Barn cafe and shop, Wraxall',
    sector: 'Heritage', value: '&pound;2.0m',
    fact: 'RIBA Stage 4 MEP design within a Victorian farm building',
    indexTag: '&pound;2m &middot; Heritage'
  },
  {
    slug: 'corner-house-port-loop', accent: GREEN,
    img: '/assets/corner-house-port-loop-cgi.jpg', alt: 'CGI of Corner House 1 at Icknield Port Loop, Birmingham',
    capsule: 'Urban Splash', tag: 'Residential', title: 'Corner House, Port Loop',
    client: 'Urban Splash / Create.iF',
    project: '22 new apartments over five storeys at Icknield Port Loop, Birmingham',
    sector: 'Residential', value: 'c. &pound;15m',
    fact: 'Full MEP design, RIBA Stage 2 to Stage 4',
    indexTag: '&pound;15m &middot; Residential'
  },
  {
    slug: 'kings-hill-care-home', accent: BLUE,
    img: '/assets/kings-hill-cgi.jpg', alt: 'CGI of the new 78-bed care home at King’s Hill for Lovett Care',
    capsule: 'Lovett Care', tag: 'Later Living &amp; Care', title: 'King&rsquo;s Hill Care Home',
    client: 'Lovett Care',
    project: 'New purpose-built 78-bed care home (use Class C2)',
    sector: 'Later Living &amp; Care', value: 'c. &pound;11.0m',
    fact: 'BREEAM Excellent In-Use energy strategy, Part O overheating assessment',
    indexTag: '&pound;11m &middot; Later Living &amp; Care'
  },
  {
    slug: 'calke-abbey-hub-kitchen', accent: PINK,
    img: '/assets/calke-abbey-hub-kitchen.jpg', alt: 'The new timber-clad Hub Kitchen at Calke Abbey with roof-mounted solar PV',
    capsule: 'National Trust', tag: 'Heritage', title: 'Calke Abbey Hub Kitchen',
    client: 'The National Trust',
    project: 'New-build Hub Kitchen, BBQ kiosk and refurbishment works at Calke Abbey, Derbyshire',
    sector: 'Heritage', value: 'c. &pound;1.2m',
    fact: 'Completed summer 2026, with a <span class="c-green">carbon</span> impact study and roof-mounted solar PV',
    indexTag: '&pound;1.2m &middot; Heritage'
  }
];

// Projects index only: Batsford sits after the eleven featured projects.
export const indexExtra = [
  {
    slug: 'batsford-arboretum', accent: GREEN,
    img: '/assets/batsford-arboretum.jpg', alt: 'Batsford Arboretum visitor building extension',
    capsule: 'Batsford Arboretum', indexTag: '&pound;2m &middot; Heritage'
  }
];
