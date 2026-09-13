# Complete Portfolio Redesign and Theme Toggle

## Scope
- Finish the Mist & Teal editorial redesign across the remaining homepage elements.
- Rename the portfolio project and its development popup from “Cyber Saathi” to “AI Saathi.”
- Add an accessible light/dark mode control in the homepage navigation.
- Keep CyberGuard routes and its internal security tool naming unchanged.

## Implementation
1. Define matching light and dark semantic color tokens so every existing section, card, form, modal, and footer changes theme consistently.
2. Add a persistent theme controller that uses the visitor’s saved choice, otherwise follows their device preference, and avoids a flash of the wrong theme.
3. Add sun/moon controls to desktop and mobile navigation with clear labels and focus states.
4. Replace leftover dark gradients, glows, and hardcoded colors in the AI Saathi floating control and development panels with the shared editorial styles.
5. Rename the portfolio card and popup copy to AI Saathi while preserving its in-development behavior and LinkedIn link.
6. Check the complete homepage at desktop and mobile sizes, including navigation, project cards, both development popups, contact form, and theme switching.

## Technical Details
- Use a `dark` class on the document root and `localStorage` for persistence.
- Keep Sora, Plus Jakarta Sans, and JetBrains Mono unchanged.
- Use only existing React, Tailwind, and icon dependencies.
- Do not modify backend behavior or the separate CyberGuard application.
