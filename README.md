# ALFA DESIGNS — Premium Business Website

A responsive, bilingual (English/Sinhala) static website for ALFA DESIGNS by ALFA STUDIO.

## Features
- Luxury dark theme with purple/blue accents
- Custom ALFA SVG logo
- Responsive navigation and mobile menu
- Sinhala/English text toggle
- Animated reveal sections, floating visual elements, ticker and scroll progress
- Services and starting prices
- Design concept gallery (clearly labeled concept previews, not claimed customer projects)
- Packages and inquiry links
- Quick starting-estimate calculator
- Contact form that prepares an inquiry in WhatsApp
- WhatsApp floating contact button, phone, email, Facebook and TikTok links
- FAQ, SEO metadata, favicon, `robots.txt`, `sitemap.xml`, 404 page and a scripted quick-assistant demo
- Reduced-motion accessibility support

## Business details configured
- Brand: ALFA DESIGNS
- Studio: ALFA STUDIO
- Owner: Yehan Pabasara
- Phone / WhatsApp: 0712941115
- Email: yehanpabasara69@gmail.com
- Facebook: https://www.facebook.com/share/19dqWCDrpA/
- TikTok: https://www.tiktok.com/@mathaka_page_1?_r=1&_t=ZS-9Ae9ltmxczl
- Instagram and YouTube intentionally omitted.

## Run locally
Open `index.html` in a modern browser. For a more reliable local preview, use VS Code with the Live Server extension. No build step or package install is required.

## GitHub Pages publishing
1. Create a repository for the static site.
2. Upload the contents of this folder (upload the files inside it, not the outer folder as an extra nested level).
3. In repository **Settings → Pages**, choose the publishing source supported by your repository (usually deploy from a branch) and select the `main` branch and `/ (root)`.
4. Wait for the deployment workflow to finish, then open the URL shown in Settings → Pages.
5. Check the mobile layout, navigation, contact links and browser console after publishing.
6. Replace the placeholder URL in `sitemap.xml` with the actual public URL. If using a project URL such as `username.github.io/repository-name/`, update it accordingly.

## Important: static-site limitations
GitHub Pages only serves static files. This package does **not** include a secure admin dashboard, persistent customer/order database, real online payment processing, or a server-side AI assistant. The inquiry form opens WhatsApp with a pre-filled message; it does not store form submissions on a server. The quick assistant is a local scripted demo, not a live AI service. The calculator provides a rough starting estimate only. Do not advertise a working payment gateway or database until a backend/provider has been configured and tested.

See `BACKEND_INTEGRATION.md` for the rollout checklist. For real orders and secure data storage, connect a backend such as Supabase/Firebase and configure authentication, database rules, privacy policy and form validation. For online payments, select a payment provider available to your business and implement/test its secure server-side flow. Never put secret API keys in frontend JavaScript or a public GitHub repository.

## Before launch
- Confirm service pricing and terms.
- Confirm Facebook/TikTok URLs are the correct business profiles.
- Replace concept gallery art with actual work when available, keeping concepts labeled accurately until then.
- Add a privacy policy and any applicable business/legal details.
- Test WhatsApp on both mobile and desktop.
- Test all links and the final published URL.
- Consider the GitHub Pages terms and whether the intended commercial use is appropriate for your site; if not, use hosting whose terms fit the business.
