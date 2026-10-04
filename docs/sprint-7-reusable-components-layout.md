# Sprint 7: Reusable Components and Application Layout

## Sprint Goal
Build a consistent React UI from composable components and shared layout elements, reducing repeated markup across screens.

## Completed Work
- Extended the shared Button to forward standard button props, support `type`, and accept additional CSS classes.
- Extended Card with optional title, description, child content, and additional classes; it renders as a semantic article.
- Extended PageTitle with a class override for page-specific presentation.
- Reused PageTitle on Home and Product Entry in addition to Dashboard, Login, Profile, and Not Found.
- Reused Card for the Home inventory metric tiles and retained Cards for Dashboard, Login, Profile, and Not Found content.
- Reused Button for Dashboard, Login, Profile, and Product Entry actions.
- Improved Navbar with a home link, an accessible navigation label, a visible active state, and responsive menu styling.
- Kept the shared Footer in MainLayout with the project name, current year, and team credit; made its layout responsive.

## Component Locations
```text
client/src/components/
├── layout/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── Sidebar.jsx
└── ui/
    ├── Button.jsx
    ├── Card.jsx
    └── PageTitle.jsx
```

## Verification
- `npm run build` completed successfully.
- `npm run lint` completed successfully.
- Browser checks confirmed four Home metric Cards, a working Dashboard notification Button, Product Entry submit/reset Buttons, shared page headings, active navigation, and the shared footer.

## GitHub
No commit or push was performed. The sprint remains local as requested.
