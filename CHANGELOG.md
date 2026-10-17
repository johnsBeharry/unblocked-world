# Changelog

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
