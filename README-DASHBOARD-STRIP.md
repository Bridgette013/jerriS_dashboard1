# Dashboard Strip — JerrisWorld.com
## Removes all dashboard code from the live site. Your product idea is preserved in git history.

---

## STEP 1: Replace files (included in this pack)

| File | Action |
|------|--------|
| `src/App.jsx` | REPLACE — dashboard imports, routes, layout, ProtectedRoute all removed. 404 page added. |
| `src/main.jsx` | REPLACE — AuthProvider wrapper removed. |
| `public/_redirects` | REPLACE — /dashboard/* and /login now 302 to homepage. |

---

## STEP 2: Remove the hidden login link from Home.jsx

Open `src/pages/Home.jsx` and **DELETE** this block (it's at the very bottom, right before the closing `</div>` and `export`):

```jsx
      {/* Secret door */}
      <Link to="/login" style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        width: '20px',
        height: '20px',
        opacity: 0
      }}>.</Link>
```

Also remove the `Link` import if it's only used for that hidden door. Check the top of Home.jsx:
- If `Link` is imported AND used elsewhere in the file (like the Quick Links section), keep the import.
- If `Link` is used in the Quick Links section, it stays. Just delete the hidden door block.

---

## STEP 3: Delete these files/folders

```
DELETE src/pages/Login.jsx
DELETE src/pages/Login.css
DELETE src/pages/dashboard/              (entire folder)
  - Dashboard.jsx
  - ContentCalendar.jsx
  - LinkTracker.jsx
  - Hub.jsx
  - Hub.css
  - Customize.jsx
  - (and any other files in this folder)
DELETE src/context/AuthContext.jsx
DELETE netlify/functions/auth.cjs         (if exists)
DELETE netlify/functions/data.cjs
```

---

## STEP 4: Clean up App.css

Open `src/App.css` and **DELETE** everything from the `DASHBOARD LAYOUT` comment section down through the dashboard-specific styles. Specifically remove:

- `.dashboard-layout` and all child selectors
- `.dashboard-sidebar` and all child selectors
- `.sidebar-brand`, `.sidebar-title`, `.sidebar-subtitle`
- `.sidebar-nav`, `.sidebar-link`, `.sidebar-link.active`
- `.sidebar-footer`, `.back-link`, `.logout-btn`
- `.loading-screen`, `.loading-spinner`, `@keyframes spin`
- `.dashboard-main`
- The responsive rules for `.dashboard-sidebar` and `.dashboard-main` inside media queries

**KEEP** everything above the dashboard section (brand variables, reset, public site layout, header, nav, footer, scrollbar, empty state, page header, responsive rules for `.site-header`).

---

## STEP 5: Check for unused dependencies

```bash
npm uninstall @netlify/blobs   # only if nothing else uses it
```

Check `package.json` — if `@netlify/blobs` was only there for the dashboard data function, remove it.

---

## STEP 6: Commit & deploy

```bash
git add -A
git commit -m "Strip dashboard from live site — product concept preserved in git history"
git push
```

---

## WHAT THIS FIXES

- **Security:** No more plaintext password storage in localStorage (Hub)
- **Security:** No more hidden login route discoverable via DOM inspection
- **Security:** No more dashboard routes accessible by URL guessing
- **Performance:** Smaller JS bundle (removed 6+ page components + auth context)
- **SEO:** Cleaner sitemap — no dashboard URLs to accidentally index
- **UX:** Proper 404 page instead of silent fallback to homepage
- **Maintenance:** Simpler codebase — public site only

---

## YOUR PRODUCT IDEA IS SAFE

The dashboard concept (self-owned no-code site builder + biz management tools) lives in:
- Git commit history (full code recoverable anytime)
- `temp_app.txt` in the project
- This conversation context

When you're ready to build it for real, fork it into its own repo with:
- Proper auth (Supabase, Clerk, or similar)
- Real database (not localStorage)
- Its own domain
- Multi-tenant architecture if you're selling it
