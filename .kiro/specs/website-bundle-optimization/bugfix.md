# Bugfix Requirements Document

## Introduction

The website's production bundle is excessively large due to Three.js (~600KB+ minified), `@react-three/fiber`, and `@react-three/drei` being bundled into the main chunk alongside all page routes. Combined with no code splitting in `vite.config.ts`, no compression, and `lucide-react` being incorrectly excluded from `optimizeDeps`, the initial page load is heavy and slow even for visitors who never visit the 3D-enhanced pages (About, Hero, Portfolio). The fix involves lazy-loading routes and 3D components, configuring Vite manual chunks, and correcting the `optimizeDeps` exclusion.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user visits any page of the website THEN the system loads the entire Three.js library (~600KB+), `@react-three/fiber`, and `@react-three/drei` in the initial bundle, regardless of whether the page uses 3D components.

1.2 WHEN the production build is generated THEN the system produces a single large JavaScript chunk containing all page routes, all 3D components, and all heavy dependencies with no code splitting.

1.3 WHEN a user visits the Home page THEN the system forces the browser to parse and execute Three.js and framer-motion code that is not needed for that page.

1.4 WHEN Vite pre-bundles dependencies THEN the system excludes `lucide-react` from `optimizeDeps`, causing it to be processed inefficiently and potentially triggering extra network requests in development.

### Expected Behavior (Correct)

2.1 WHEN a user visits any page of the website THEN the system SHALL load only the JavaScript required for that specific page, deferring Three.js and 3D component code until a page that uses them is navigated to.

2.2 WHEN the production build is generated THEN the system SHALL produce separate chunks for Three.js/3D libraries, framer-motion, vendor React libraries, and individual route pages via Vite manual chunk configuration.

2.3 WHEN a user visits the Home page THEN the system SHALL load a minimal initial bundle that excludes Three.js, so the page becomes interactive faster.

2.4 WHEN Vite pre-bundles dependencies THEN the system SHALL include `lucide-react` in `optimizeDeps` (or remove the exclusion) so it is pre-bundled correctly and served efficiently.

### Unchanged Behavior (Regression Prevention)

3.1 WHEN a user navigates to the About page THEN the system SHALL CONTINUE TO render the `About3D` 3D background component correctly.

3.2 WHEN a user navigates to the Portfolio page THEN the system SHALL CONTINUE TO render the `Portfolio3D` interactive 3D background component correctly.

3.3 WHEN a user navigates to the Home page THEN the system SHALL CONTINUE TO render the `Hero3D` 3D background component correctly.

3.4 WHEN a user navigates between pages THEN the system SHALL CONTINUE TO perform client-side routing without full page reloads.

3.5 WHEN a page is loading its lazy chunk THEN the system SHALL CONTINUE TO display a loading fallback (Suspense boundary) so the UI does not break.

3.6 WHEN a user interacts with animated elements using framer-motion THEN the system SHALL CONTINUE TO display animations correctly on all pages that use them.

3.7 WHEN a user clicks icons rendered via `lucide-react` THEN the system SHALL CONTINUE TO display and interact with those icons correctly.
