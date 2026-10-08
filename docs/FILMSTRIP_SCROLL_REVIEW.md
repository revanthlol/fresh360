# Filmstrip scroll refinement

The homepage keeps its existing fonts, brand colours, supplied footage, Sanity content, product filtering, and quick-view modal. Navigation and section order are Home, Brands, Products, About, Process, Contact.

| Before | After | Why |
| --- | --- | --- |
| Video fitted inside an ivory background | Cover-fit footage with a small hero edge bleed | Removes the visible vertical media boundary. |
| Introduction animation started once on intersection | Scroll-derived line reveals | Forward, reverse, and direct navigation produce consistent poses. |
| Three brands shared a short gallery timeline | Introduction plus three brands share one filmstrip timeline | Each panel has a readable full-height hold before the next transition. |
| Next panel entered while current text was still presenting | First 80 percent of each segment presents its story; final 20 percent hands off | Separates reading and movement. |
| Outgoing panel stayed full size | Outgoing panel moves upward and scales from 1 to 0.92 | Makes the filmstrip handoff visible while preserving subject continuity. |
| Brand videos looped independently | Scroll progress seeks paused videos through their full source duration | Video and text respond to the same scroll position, including reverse scrolling. |
| Original long-keyframe video used for playback | Derived silent, fast-start H.264 copies with a keyframe every eight frames | Reduces decoding work during seeks. Original uploads remain untouched. |
| Four small product cards per desktop row | Three larger cards within a wider collection | Gives product photography more space. Filters and modal navigation remain intact. |
| Sections had inconsistent vertical presence | Homepage sections have at least one small viewport of height | Makes the page rhythm consistent while letting longer content grow. |

## Timeline contract

The moving subjects are four persistent panel wrappers, two introduction text lines, two brand text states, and three paused video elements. The gallery spans nine viewport heights, giving eight viewport heights of scroll travel. Each panel gets two viewport heights of travel: 1.6 for presentation and 0.4 for handoff. Incoming panels rise into the frame as outgoing panels shrink and move up. The final brand holds its final pose before the sticky stage naturally releases.

Motion values derive directly from scroll position; no wheel interception, autoplay timer, or spring lag drives the gallery. Keyboard thumbnail selection jumps immediately to a readable pose. Deep links use the same positioning logic. Video seeks are coalesced to an animation frame and catch up after a pending seek finishes.

The HyperFrames keyframe skill's pose and continuity principles apply here. This remains an interactive Next.js page, not a HyperFrames render composition; its composition-specific CLI and timeline registration do not apply. Narrow/short viewports and reduced-motion settings retain ordinary-flow brand scenes. Reduced motion keeps image posters.

## Verification

Production build passed after allowing the existing Google Fonts requests outside the sandbox. Final TypeScript and whitespace checks passed. Browser access was unavailable, so visual timing, responsive crops, console output, and video-seek smoothness are not claimed as verified.
