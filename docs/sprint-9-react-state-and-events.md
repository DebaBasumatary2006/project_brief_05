# Sprint 9: React State and Event Handling

## Sprint Goal
Use React component state and event handlers to make the frontend respond to user input without page reloads.

## Completed Work
- Added the reusable `Welcome` component to the Dashboard, passing `name` and `project` as props.
- Kept the notification count in component state and incremented it with a functional state update.
- Kept the name field controlled by React state and associated it with an accessible label.
- Implemented a local Login/Logout status toggle with a functional state update.
- Continued using the shared `Button`, `Card`, and `PageTitle` components.

## Behavior
- Add Notification increments the counter.
- Typing in Your name immediately updates the displayed name.
- Login changes the card to a logged-in message and Logout returns it to the signed-out message.

These are frontend learning examples. The counter and login status are not connected to a backend and reset when the Dashboard component is remounted or refreshed.

## Verification
Browser interaction checks confirmed the count reached 2 after two clicks, the entered name rendered, and the status toggled in both directions. Build and lint checks are recorded after implementation.

## GitHub
No commit or push was performed. Work remains local as requested.
