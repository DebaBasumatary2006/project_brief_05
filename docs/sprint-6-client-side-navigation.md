# Sprint 6: Client-Side Navigation with React Router

## Sprint Goal
Connect the existing React pages with centralized client-side routes and display them within a persistent shared layout.

## Completed Work
- Confirmed `react-router-dom` is installed in the client dependencies.
- Confirmed `BrowserRouter` wraps the app in `client/src/main.jsx`.
- Kept `client/src/App.jsx` focused on rendering `AppRoutes`.
- Centralized routes in `client/src/routes/AppRoutes.jsx`.
- Used `NavLink` for the application navigation.
- Put Home, Dashboard, Login, Profile, Product Entry, and the fallback 404 page under `MainLayout`.
- Added a wildcard route for invalid paths.

## Route Map
| Path | Page |
| --- | --- |
| `/` | Home |
| `/dashboard` | Dashboard |
| `/login` | Login |
| `/profile` | Profile |
| `/product-entry` | Product Entry |
| Any unmatched path | Not Found (404) |

## Verification
The client production build completed successfully with `npm run build`.

Browser checks confirmed:
- Home, Dashboard, Profile, Login, and an invalid URL render the expected page heading.
- The shared navigation appears on each route.
- Refreshing an invalid URL continues to render the 404 page.

## GitHub
No commit or push was performed. Sprint work remains local as requested.
