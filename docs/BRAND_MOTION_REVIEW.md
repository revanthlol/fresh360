# Hero and brand motion review

Scope: the new HeroSection, BrandScene, BrandStrip, shared brand configuration and their styles. The supplied JUST screen recording was inspected at one-second intervals. It shows full-width image panels overlapping as the next panel enters; that is the reference used for the desktop brand sequence.

## Design engineering

| Before | After | Why |
| --- | --- | --- |
| Three small brand cards | Three full-width photography panels that stack with native CSS sticky positioning | Scrolling shows the three distinct product ranges, matching the user's requested sequence |
| Separate text-only three-brand walkthrough followed by cards | One image-led brand sequence directly after the hero | Avoid repeating the same brand introduction before users reach the products |
| Old hero path and generic brand artwork | Four supplied photographs, shared with standalone brand pages | Keep product geometry and labels faithful to the user's assets |
| No image-linked transition in the brand cards | Small scroll-linked transforms on image and copy | Connect the incoming image and its accompanying brand text |
| Brand navigation could target an already-stuck panel | Normal-flow anchors independent of the sticky panels | Jump links retain the intended document positions while panels are pinned |
| Desktop effects at every device size | Ordinary flow on mobile, shorter screens and reduced motion | Keep content accessible without a forced scrolling sequence |

## Typography

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | components/shared/HeroSection.tsx:35 | Single heading treatment over the old image | Two readable display phrases with a short stagger and a fluid size | Keep text as semantic HTML, with image-independent wrapping |
| LOW | components/brand/BrandScene.tsx:53 | Card-sized brand titles | h2 display names on the homepage and h1 on standalone brand routes, using the existing Outfit family | Give each image panel a clear brand heading without adding a typeface |
| LOW | components/brand/BrandScene.tsx:54 | Separate card spacing and type rules | Shared tagline, body and declaration roles | Preserve 1.1 display, 1.4 tagline and 1.6 body line heights, with readable measures |
| LOW | components/brand/BrandScene.tsx:50 | No sequence position | Tabular sequence numbers | Keep the numeric width stable |

Verification: one production build passed. The final source edits also passed TypeScript and diff whitespace checks. The supplied photographs were inspected for composition. Source checks confirm no new dependency, visible default content, no wheel interception, keyboard jump handling, reduced-motion alternatives, retained brand filtering and full desktop image framing.

Not verified: rendered browser animation timing, 320px layout, actual 200% browser zoom, computed font values, console output and mobile touch behavior. No browser session is connected. The original image files remain uncommitted under the user's earlier instruction. Nothing was deployed.

Approve for the inspected source declarations. Rendered behavior remains Not verified.
