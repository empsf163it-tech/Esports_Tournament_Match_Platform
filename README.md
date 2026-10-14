# ARENA — Esports Tournament & Match Platform (Frontend Demo)

A responsive, multi-page esports website concept inspired by common tournament-management patterns. It is an original demo and is not affiliated with or copied from Toornament.

## Included pages
- `index.html` — landing page, featured tournaments, upcoming matches, leaderboard
- `tournaments.html` — tournament cards, search and game/status filters, registration-interest modal
- `tournament-detail.html` — event overview, prize distribution, schedule and sample bracket
- `matches.html` — match center with all/upcoming/live/completed tabs
- `teams.html` — team cards, search and game filters
- `media.html` — photography/video gallery with filters
- `login.html` — sign-in screen mockup
- `admin.html` — organizer dashboard demo, create sample tournament, approve sample registration, enter sample score
- `assets/style.css` — responsive design system and styles
- `assets/app.js` — frontend interactions

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser.
3. For a local web server, run `python -m http.server 8000` from the extracted folder and open `http://localhost:8000`.

No build step is required. Google Fonts and the media-gallery images use external URLs, so those assets need internet access. The layout remains usable if the remote fonts/images do not load.

## Important limitations
This ZIP is a **front-end prototype only**. It does not include a backend, database, real account authentication, persistent storage, real tournament registrations, email notifications, live match feeds, payment processing, or actual video hosting. Forms and dashboard actions are demonstration interactions only; refresh the page to reset them.

For production, add a backend (for example ASP.NET Core/C# or Node.js), a database (SQL Server or PostgreSQL), secure authentication and role-based authorization, validation, audit logs, backups, and secure media storage. Do not expose the demo admin page as a real admin console.

## Customize
- Change brand text/colors in `assets/style.css` and the HTML files.
- Replace sample tournaments, teams, dates, prize pools and scores with verified data.
- Replace remote gallery photos with licensed or owned event media.
- Add a real backend before collecting users' personal information or operating tournaments.
