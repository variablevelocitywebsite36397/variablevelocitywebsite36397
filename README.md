# Variable Velocity — FTC Team 36397

Official website for **Variable Velocity**, FIRST Tech Challenge Team 36397.

**Dream. Build. Ascend.**

## About

This repo hosts the source for our team website — a single-page site covering who we are, our season journey, team roster, community outreach, resources, and how to support us.

## Structure

```
.
├── index.html   # the site (single file: HTML + CSS + JS)
├── logo.png     # team logo
└── README.md
```

## Running locally

No build step needed — it's a static site. Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying with GitHub Pages

1. Go to **Settings → Pages** in this repo
2. Under **Source**, select the `main` branch and `/ (root)` folder
3. Save — your site will be live at `https://<your-username-or-org>.github.io/variablevelocitywebsite36397/`

## Editing

- All page content, styles, and scripts live in `index.html`.
- Swap `logo.png` to update the team logo (keep the filename, or update the `<img>`/favicon references in `index.html`).
- Sections marked with `[bracketed placeholder text]` still need real team info — roster names/photos, location, contact details, fundraising goal, and season results.

## Team

FTC Team 36397 — Variable Velocity
