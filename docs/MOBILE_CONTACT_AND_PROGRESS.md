# Mobile contact and progress corrections

| Before | After | Why |
| --- | --- | --- |
| Contact grid sized itself around a long select label | Explicit one-column phone grids, min-width constraints, and smaller card padding | Keeps the form inside the viewport. |
| Custom popup on phone | Native phone selects, existing desktop select retained | Avoids overflow and uses platform selection behavior. |
| Floating chat button stayed over focused fields | Chat button hides on phones while a form field is focused | Gives the mobile keyboard and controls more room. |
| Input labels lacked explicit associations | Name, email, phone, and message labels target their controls | Improves focus and accessibility. |
| Desktop process progress line hidden | Five-step pinned presentation with visible horizontal progress | Restores progress and holds the process until completion. |
| Four teaser steps | Source, Press, Test, Bottle, Deliver | Bottle uses the bottling/cold-chain statement already in ProcessStory; no new process claim was invented. |
| No sitewide reading indicator | Thin scroll-driven bar at the top of public pages | Shows page progress without intercepting scrolling. Studio/admin remain excluded. |

Process progress reaches full at 90 percent of its scroll range. The final 10 percent keeps the final step on screen before the sticky stage releases. Step buttons provide direct navigation, with immediate keyboard selection. Reduced motion and short viewports show all steps in normal flow.

Production build and whitespace validation passed. No inquiry was submitted. Mobile rendering, console errors visible in the supplied screenshot, and real-device keyboard behavior remain unverified without a connected browser.
