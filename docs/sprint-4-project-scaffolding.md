# Sprint 4: Project Scaffolding & Development Environment

## Sprint Goal
This sprint converts the project plan into a real working development environment by setting up the frontend React application, backend Express server, dependency installation, folder organization, and local verification of communication between the client and server.

## Deliverables
- React frontend initialized and running
- Express backend initialized and running
- Standardized client and server folder structure
- Required dependencies installed
- Local environment verified with working commands
- Project documentation updated
- Repository synchronized and pushed to GitHub

## Frontend Setup
The client application was initialized with Vite and includes:
- React 19
- Vite 8
- React Router DOM
- Axios
- project global CSS and modular page structure

### Frontend structure
```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Backend Setup
The server was configured as a standalone Node.js + Express application with:
- Express.js
- CORS
- Dotenv
- Mongoose
- JWT and bcryptjs support for later authentication modules
- Nodemon for development

### Backend structure
```text
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── app.js
├── server.js
├── package.json
├── README.md
└── public/
```

## Dependencies Installed
### Frontend
- react
- react-dom
- react-router-dom
- axios
- vite
- eslint

### Backend
- express
- cors
- dotenv
- mongoose
- bcryptjs
- jsonwebtoken
- nodemon

## Run Instructions
### Frontend
```bash
cd client
npm install
npm run dev -- --host 0.0.0.0
```

### Backend
```bash
cd server
npm install
npm run start
```

## Verification
The following checks were completed successfully:
- `npm run build` in client completed successfully
- Express server started on `http://localhost:5000`
- API endpoint `http://localhost:5000/api/test` returned a successful JSON response
- React app served successfully on `http://localhost:5174/`
- Browser render showed the Home page content correctly

## Git Workflow
The Sprint 4 work was committed and pushed to the GitHub repository using a descriptive commit message.

## Outcome
The project now has a working MERN foundation with separate frontend and backend applications, required dependencies installed, proper folder organization, and readiness for feature development in the next sprint.
