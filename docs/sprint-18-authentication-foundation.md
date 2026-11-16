# Sprint 18: Authentication Foundation

## Scope

Sprint 18 adds account registration and credential verification to the existing inventory application. It does not add JWTs, persistent login state, protected routes, or authorization; the brief reserves those features for a later sprint.

## User data and password handling

The Mongoose `User` model stores a trimmed name, a normalized unique email, a bcrypt password hash, and timestamps in the `users` collection. Registration validates the name, email, and minimum password length before hashing the password. Login compares the submitted password with the stored hash. API responses contain only the user's ID, name, and email, and the password field is excluded from default model queries.

## API

| Method | Endpoint | Result |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Creates an account and returns `201` |
| `POST` | `/api/auth/login` | Verifies credentials and returns `200` |

Duplicate emails return `409`; invalid registration data and missing login fields return `400`. Unknown emails and incorrect passwords return the same `401` response to avoid revealing which credential failed. Unexpected database errors use the existing generic `500` response.

The Postman collection is `server/postman/Sprint18-Authentication.postman_collection.json`. Set its `testPassword` variable to a local test value of at least eight characters before running the requests.

## React pages

- `/register` provides controlled Name, Email, Password, and Confirm Password fields, client-side validation, loading and feedback states, and a React Router link to Login.
- `/login` provides controlled Email and Password fields, request/error/success states, and a React Router link to Register.
- Both pages call the API through `client/src/services/authService.js` and share the responsive styles in `client/src/pages/auth.css`.

Login displays the successful response but does not store a session or authorize the user. This deliberately matches the Sprint 18 boundary: persistent authentication and protected routes belong to a subsequent sprint.

## Run and verify

1. Start MongoDB, then run `npm run dev` from `server/`.
2. Run `npm run dev` from `client/`.
3. Register at `/register`; confirm the account is created and duplicate email registration is rejected.
4. Sign in at `/login`; confirm valid credentials succeed and incorrect or unknown credentials receive the same error.
5. In MongoDB Compass, inspect the `users` collection and confirm `password` contains a bcrypt hash, not the submitted password.
6. Import the Sprint 18 Postman collection, set a local `testPassword`, and run the requests in order.
7. Run `npm test` from `server/`, and `npm run lint` and `npm run build` from `client/`.

Do not use a real password or commit local environment credentials.
