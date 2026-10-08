# Product framing and content-flow correction

The latest user screenshot showed unwanted image side bands and a sage product background. The user also reported that content sections did not come into focus promptly.

| Before | After | Why |
| --- | --- | --- |
| Product background inherited the site sage | Product section uses its original slate surface | The requested shared background concerns the content sections. |
| Wide fixed-height image frames used contain fitting | Desktop cards have viewport-aware width and a matching 3:4 image frame with cover fitting | Removes side bands without excessively cropping the portrait source images. |
| Measured content sections gained sticky holds and 35svh spacers | Content sections stay in ordinary document flow | Removes delayed section arrival and extra travel. |
| Scroll-driven low-opacity text and shrinking content wrappers | Content is fully visible by default; a brief early entry transition adds feedback | Content no longer waits for a scroll phase to become readable. |
| Resize measurement, fit state, and per-frame content animations | One-shot intersection observation | Reduces ongoing layout and animation work. |

About, Process, Testimonials, and Contact retain the shared gradient. The hero and brand filmstrip remain intact, along with product filters, carousel controls, modal behavior, and inquiry form.

Production build and whitespace validation passed. Browser rendering remains unverified because no browser surface is connected.
