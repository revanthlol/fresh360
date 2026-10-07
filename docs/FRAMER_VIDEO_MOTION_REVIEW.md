# Video and scroll implementation review

The five supplied Framer links resolve successfully. Their modules depend on the Framer runtime, so their interactions are adapted to the existing Next.js and Motion setup rather than imported directly. No dependencies were added.

## Component mapping

| Source | Adaptation |
| --- | --- |
| [RadiusOnScroll](https://framer.com/m/RadiusOnScroll-z8Z2.js@qWwhyLW8hSoq6nxiihTS) | Scroll-linked hero radius and rounded brand panels opening into full-width frames. |
| [StickyScrollStory](https://framer.com/m/StickyScrollStory-2-x6oztN.js@3u60lLOoADWXFvcvY5Ek) | Brand tagline changes to its description as the sticky panel progresses. |
| [ImageScroller](https://framer.com/m/ImageScroller-kjnj.js@aP86nmOJy6tPfN0rRzeL) | Sticky video gallery with vertically stacking panels and a selectable thumbnail dock. |
| [Testimonial Rotation](https://framer.com/m/Testimonial-Rotation-JRnz0w.js@VcEYXbVlwUb8LpYlJsb6) | Existing testimonials rotate every 6.5 seconds, pausing on hover, focus, hidden tabs, offscreen placement, or manual pause. User confirmed these testimonials on 2026-10-07. |
| [Reveal Preloader](https://framer.com/m/Reveal-Preloader-0HTX.js@36SdoN1ndEg803lapJS1) | In-flow full-height introduction with a gradient curtain and two-line text reveal. Content access does not wait for a loading screen. |

## Design review

| Before | After | Why |
| --- | --- | --- |
| Static hero and brand photography | Four supplied videos with image posters | Use the approved assets while retaining immediate content and loading fallbacks. |
| Short “Three ways to refresh” heading strip | Full-height introduction with sage, ivory, and warm amber gradient | Gives the collection introduction its own slide using existing brand colours. |
| Separate static brand scenes | Native-scroll sticky stacking gallery on suitable desktop viewports | Makes the three brands a continuous sequence without intercepting wheel or touch input. |
| Static testimonial cards | One rotating quote with controls and stable reserved height | Keeps the verified voices readable and avoids layout jumps between quotes. |
| Playback regardless of relevance | Playback only while visible and active | Avoids downloading and playing all four videos at once. Reduced motion and data-saving preferences retain posters. |

Transform and opacity handle text and panel transitions. The explicitly requested frame-radius animation is the exception. Keyboard gallery selection is immediate. Narrow screens, short screens, and reduced-motion settings use normal-flow brand scenes.

## Typography review

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| Improvement | Collection introduction | Small single-line strip heading | Responsive two-line heading, tight tracking, balanced line height | Establishes the slide hierarchy without changing fonts. |
| Improvement | Brand story | Tagline and description shown together | Two overlapping text phases within reserved space | Preserves readable copy while matching scroll progression. |
| Improvement | Testimonials | Dense multi-card presentation | Larger quote text, constrained measure, distinct author and role | Improves reading rhythm and attribution. |

Approve for the inspected source scope: existing font family preserved, responsive type sizes, controlled heading tracking, readable body line heights, semantic heading levels, and reduced-motion treatment. Rendered wrapping, video crops, contrast over moving footage, and responsive visual QA: **Not verified**.

## Verification

- Production build passed.
- TypeScript check passed after keyboard-navigation integration.
- Whitespace/diff validation passed.
- Browser console, playback timing, and rendered responsive behavior were not verified in this pass.
- No Sanity production data was mutated.
