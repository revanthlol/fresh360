# Continuous sage layout and content-sized presentations

The supplied screenshots showed two regressions: product photography exceeded the viewport's available height, and forcing every section to one viewport left an excessive blank area below the testimonials.

| Before | After | Why |
| --- | --- | --- |
| Every homepage section had a viewport minimum | Only hero and brand scenes retain that minimum | Content sections size to their actual content. |
| Desktop product media height followed wide cards' portrait aspect ratio | Image height is capped against viewport height, with contain-fit photography | Keeps complete bottles visible without extending the section unnecessarily. |
| Separate ivory, slate, and sage section surfaces | One shared sage gradient beneath transparent content sections | About, Process, Testimonials, and Contact flow without hard background boundaries. |
| Vertical desktop process timeline | Four-column desktop presentation of the existing steps | Keeps the process readable within a shorter section. Phones retain the vertical layout. |
| Static content sections or tall empty screens | Short content-sized sticky holds, sequential reveals, and shrinking exits | Creates a slideshow rhythm without making every section a full-screen scene. |
| Form could share presentation motion | Contact stays in normal flow; focus cancels presentation transforms and reveals | Keeps interaction accessible and avoids pinning the form. |
| Navigation measured sections with offsetTop | Navigation measures document-relative rendered bounds | Keeps active links accurate inside presentation wrappers. |

## Reference and implementation

Reviewed the official [Motion scroll animation documentation](https://motion.dev/docs/react-scroll-animations) and [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). The implementation uses the project's existing Motion library and native CSS sticky positioning. No extra animation package, copied third-party component runtime, or wheel interception was added.

`ScrollPresentation` measures its content. It only pins content that fits below the navigation on suitable desktop viewports. Content holds for a short additional scroll distance; the final part shrinks the outgoing wrapper. Explicitly marked text and groups reveal in sequence from the same scroll progress. Larger content, Contact, narrow/short screens, and reduced motion stay in ordinary document flow. Keyboard focus immediately restores the readable state.

Original copy, verified testimonials, CMS data, inquiry controls, map, product filters, quick view, and brand video timeline are retained.

## Verification

Production build and whitespace checks passed. Browser access was unavailable, so rendered viewport fitting, scroll timing, console output, and responsive visual checks remain unverified.
