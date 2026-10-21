# Changelog

## 2026-10-22

- Finalized the mobile Submission Success responsive state from the supplied 750×1336 mockup, including the corrected pattern origin, five-line confirmation copy, Home anchor, hidden progress/submit overlays, and Explore More CTA spacing.
- Rebuilt and rechecked the mobile state at 375×668 CSS px / DPR 2 with fresh normal and contrast overlays; no visible geometric ghost remains, with residual browser raster differences recorded in the local QA evidence.

## 2026-10-21

- Consolidated the submit Contact step into the existing single-page submission flow so Enter, back, and next actions transition internally without switching to a second page layout.
- Removed the duplicate route-specific Contact shell and kept one responsive Contact Information component as the source of truth.
- Reworked Contact responsive styling for mobile and portrait tablet breakpoints, including shared sizing, typography, field spacing, wrapping, borders, and select controls.
- Fixed mobile and tablet select labels being clipped by replacing the undersized fixed select height with the component line-height.
- Restored the mobile `(←) Home` CTA when the Contact step is active while preserving the tablet progress layout.
- Refined the shared responsive viewport sizing and progress positioning used by the submit Contact flow.
- Added the responsive tablet Poster Entries state with the supplied uploaded-entry artwork, add-poster control, entry actions, progress state, and footer navigation alignment.
- Corrected the tablet Poster Entries vertical origin, divider thickness, row rhythm, thumbnail crop, add-card spacing, progress placement, and footer anchors against the supplied 864×1236 reference viewport.
- Rebuilt and rechecked the tablet Poster Entries section with fresh normal and contrast overlays; build passes, while automated visual QA still reports raster/image differences that prevent a Visual QA PASS.
- Rebuilt and rechecked the submit Contact layout at mobile and portrait-tablet viewports; remaining visual text/progress differences are still tracked separately from the successful build.
- Corrected the tablet Add/Edit Poster state so editor mode keeps the single-page flow, shows only the top progress line with Cancel and Save actions, and hides the inherited Home/progress labels.
- Matched the tablet Poster Details form styling to the supplied mockup, including field rules, inactive text opacity, select chevron, upload-card spacing, and the darker Supporting Assets card.
- Rebuilt and rechecked the tablet Add Poster state at 864×1503 CSS px / DPR 2 with fresh normal and contrast overlays; no visible geometric ghost remains in the reviewed form, while automated raster diff remains FAIL and is recorded separately.
- Added the responsive mobile Poster Entries layout from the supplied 750×1746 mockup, including the left-aligned title and copy, three-line intro wrapping, add-poster card, uploaded thumbnails, entry actions, and mobile footer label.
- Removed the forced intro line break so the copy wraps from the responsive content width instead of duplicating the tablet layout on mobile.
- Added a mobile-only footer label variant so Poster Entries shows `Poster (→)` on mobile while retaining `Consent (→)` at tablet and desktop sizes.
- Rebuilt and rechecked the mobile Poster Entries section with fresh normal and contrast overlays at 375×873 CSS px / DPR 2; structural alignment is substantially corrected, but the latest automated visual QA remains FAIL because the overlay still shows small progress/action text raster and edge differences.
- Added the mobile Add/Edit Poster form state from the supplied 750×1746 mockup, including fixed Cancel/Save actions, title and intro spacing, all visible fields, select chevron, and field rules.
- Removed the mobile submit gradient from editor mode so the lower `Printing Method` field remains visible, hid the editor's inherited progress labels while retaining its top rule, and corrected the inactive label color to the mockup's sampled value.
- Rebuilt and rechecked the mobile Add Poster state at 375×873 CSS px / DPR 2 with fresh normal and contrast overlays; the complete visible form is aligned without an observable geometric ghost, while automated raster diff remains FAIL at 19,374 differing pixels / 97 flagged tiles.
- Added responsive Consent layouts for mobile and portrait tablet, reusing the established submit-panel origin, typography scale, intro spacing, checkbox sizing, divider rhythm, and fixed footer navigation.
- Corrected the tablet Submission Success panel origin so the pattern, heading, confirmation copy, and Explore More CTA align with the supplied 1728×2472 (2x) mockup at an 864×1236 CSS viewport; tightened the confirmation copy line-height to remove the lower-line text drift.
- Rebuilt and rechecked the tablet Submission Success state with fresh normal and contrast overlays; browser fonts and assets were ready, while the automated raster comparison remains FAIL because of residual renderer-level pixel differences.
- Added the mobile Submission Success layout from the supplied 750×1336 mockup: mobile-scale pattern, five-line confirmation copy, matching vertical rhythm, Home anchor, clean success state without the progress bar or submit gradient, and centered Explore More CTA.
- Rebuilt and rechecked the mobile Submission Success state at 375×668 CSS px / DPR 2 with fresh normal and contrast overlays; no visible geometric ghost remains, while automated raster comparison remains FAIL because of residual text raster differences.

## 2026-10-19

- Added the responsive poster-page layouts for the Ownership contest hero and Sections 01–07 across mobile, portrait tablet, and desktop breakpoints.
- Added tablet layouts for the About the Theme, Creative Exploration, References, About the Programme, Jury Members, How It Works, and Key Dates sections, including their typography, dividers, artwork, cards, timelines, and calls to action.
- Added responsive artwork compositions for the References and How It Works sections, preserving the intended image proportions, placement, layering, and crop behavior at each viewport.
- Added the tablet Jury Members grid with responsive artwork treatment, member copy, and consistent two-column card spacing.
- Added the tablet Key Dates timeline with aligned milestone labels, dates, separators, and responsive section introduction.
- Standardized responsive sizing through the shared `vw()` helper and centralized mobile, portrait-tablet, landscape-tablet, and desktop breakpoint helpers.
- Restricted the 864px tablet design to portrait tablet widths so wider viewports use the desktop layout consistently.
- Updated the shared responsive breakpoints so mobile ends at 600px and tablet begins at 601px, while retaining the 864px portrait-tablet ceiling.
- Fixed the mobile submit CTA to activate by width in both orientations and scaled its decorative artwork canvas proportionally across the full mobile range.
- Matched the mobile submit CTA to the supplied 750×1000 reference by preserving the eight visible artwork motifs at proportional viewport sizes; corrected the earlier ninth-motif overflow caused by a fixed mobile canvas scale.
- Added the mobile-specific CTA line breaks (`Read the`, `Guidelines`, and `(→)`), top-label wrapping, mobile palette, centered artwork crop, and proportional artwork scaling.
- Replaced the submit artwork's large generated div hierarchy with eight compact, data-driven motif blocks measured from the supplied 1440×800 desktop page mockup; each motif keeps its own measured layer count instead of forcing a fixed layer count.
- Kept each motif and layer as an independent div for future animation, removed the SVG/image render path, and corrected the desktop CTA palette and artwork anchors against the 1440px QA frame.
- Centered every layer vertically against its motif wrapper and largest layer, retaining the measured layer widths, heights, and per-motif layer counts.
- Corrected responsive typography, line wrapping, alignment, section spacing, artwork bounds, colors, navigation states, and CTA presentation across the poster page and shared homepage/footer components.
- Revalidated the updated layouts against the supplied mobile and tablet references with fresh normal and contrast overlays; confirmed the mobile artwork count at eight motifs and recorded remaining automated raster/text differences for follow-up.

## 2026-10-18

- Added the complete mobile responsive pass across the homepage content and shared visual components.
- Added the responsive mobile footer layout, including the description, Explore and Socials columns, contact block, copyright row, mobile Back to Top marker, and oversized UNBLOCKED wordmark.
- Refined mobile footer anchors, typography scale, spacing, and bottom positioning.
- Added mobile responsive layouts for the shared theme sections, including Ownership, Permanence, Energy, and Peers titles, labels, content, artwork bounds, and section-specific artwork bars.
- Updated mobile theme content and labels, including Ownership line breaks, Energy’s Dependence label, and the Peers copy.
- Added the mobile Hidden Systems composition with responsive copy, artwork placement, and partner-logo layout.
- Added the mobile Submit Work composition with CSS-based artwork bars, responsive title, CTA, and View Brief placement.
- Added responsive mobile artwork and layout states without relying on flattened artwork images, keeping the visual elements ready for future animation.

## 2026-10-17

- Added the external submission API integration with a server-only API key, configurable endpoint/contest environment variables, multipart upload handling, request validation, and secure server-side submission forwarding.
- Added submission-form edit validation, loading/error/success states, file upload limits, and the connected submit action.
- Added the complete fullscreen submission experience with internal Contact, Poster, Poster Details, Consent, and Submission Success panel transitions without page navigation.
- Added the reusable submission progress indicator and footer navigation with dynamic step labels and fixed positioning while panel content scrolls smoothly with bottom spacing.
- Added poster entry management for add, edit, remove, poster files, and optional supporting assets, including uploaded-entry previews and the submitted-success state.
- Added homepage hero CTA actions for Submit Work and Explore Themes, fixed decorative layers that blocked link clicks, and moved hero artwork into an animation-ready component.
- Added reusable responsive ThemeSection behavior and portrait-tablet layouts for the homepage hero, hidden systems, theme sections, and shared footer CTA artwork.
- Added the complete responsive portrait-tablet footer layout with the description, Explore links, Socials links, contact email, copyright, Back to Top action, and oversized UNBLOCKED wordmark.
- Added Instagram and Twitter (X) footer links with the tablet spacing and alignment from the supplied mockup.
- Updated the footer copy to include the complete participation and creative expression statement.
- Added the mobile portrait homepage breakpoint for the supplied 750×1336 mockup, including the Home/Menu header, mobile wordmark scale, responsive hero copy and CTA placement, and mobile artwork sizing.
- Fixed mobile header positioning so the Menu control does not add layout height or push the hero content down.
- Captured mobile visual QA evidence with normal and contrast-text 50% overlays at 1x; build passed, while the automated visual diff remains flagged for small SVG edge and antialiasing differences.

## 2026-10-15

- Fixed the homepage decorative layer intercepting clicks on CTA links.
- Activated the homepage hero CTAs for Submit Work and Explore Themes.
- Rebuilt the Submit page as a fullscreen split layout without the global header or footer.
- Added the internal submission flow for Contact, Poster, Poster Details, Consent, and Submission Success panels without page navigation.
- Added reusable contact, poster entries, poster details, consent, progress, and footer navigation components.
- Added poster entry management with add, edit, remove, file upload, titles, and uploaded-entry previews.
- Added the complete poster form fields, poster files upload area, supporting assets upload area, and scrollable panel content.
- Added smooth Lenis scrolling for long Submit panel content while keeping progress and footer navigation fixed.
- Added dynamic progress indicators, internal back/next actions, and dynamic CTA labels for each submission step.
- Added custom consent checkboxes and the original-work, terms, and privacy consent options.
- Added the submitted-success state with the supplied SVG artwork, confirmation copy, and Explore More action.
- Added consistent 24px bottom spacing to Submit content panels.
- Added the reusable FAQ accordion behavior and aligned its expand/collapse icons with the reference layout.
- Added the shared footer to the guidelines page.
- Added configurable footer CTA labels and a guidelines variant that shows only `Submit Entry (→)`.
- Added portrait-tablet responsive styling for the homepage hero at the supplied 864×1238 viewport.

## 2026-10-14

- Added local-only project structure conventions.
- Organized homepage components into role-based folders.
- Consolidated Ownership, Permanence, Energy, and Peers into the shared ThemeSection wrapper.
- Removed superseded per-section style files.
