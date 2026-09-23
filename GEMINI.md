# Project Rules & Guidelines for VinFast EV Companion

1. **Automatic Git Commit & Push:**
   - Always commit all recent changes with the exact commit message `'update site'` and push to GitHub (`origin main`) whenever any changes are made.
   - Always verify the build with `npm run build` (`tsc -b && vite build`) before committing.

2. **Language & UI Requirements:**
   - The header language switcher must remain strictly `[ EN | PH ]`.
   - The AI Sales Specialist chat responses must never contain markdown formatting characters (`**`, `*`, `#`, `` ` ``).
   - Ensure the mobile and tablet version of the website and modals (including the AI Specialist chat) fit the exact width of mobile phones and tablets without horizontal overflow.
