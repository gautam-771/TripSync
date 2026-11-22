# TripSync Frontend

Complete React + Vite frontend for the TripSync Spring Boot application.

## Open in IntelliJ IDEA
1. Extract `tripsync-frontend-complete.zip`.
2. Open IntelliJ IDEA.
3. Select **File → Open**.
4. Choose the extracted `tripsync-frontend-complete` folder (the folder containing `package.json`).
5. If IntelliJ asks, trust the project and allow Node.js/npm configuration.

This is a React frontend, not a Maven/Java project. IntelliJ IDEA can open and run it when Node.js support is available.

## Run
Requirements: Node.js 18+ (Node.js 20+ recommended).

Open the IntelliJ Terminal in the project root and run:

```bash
npm install
```

Copy `.env.example` to `.env` and set your backend URL:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Then run:

```bash
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

## Included pages and integrations
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Change password: `PATCH /auth/change-password`
- Dashboard / trips: `GET /api/trips`
- Create trip: `POST /api/trips`
- Trip details, update/delete, members and member roles
- Invite trip member
- Day itineraries and activities
- Expense creation and member balances
- Settlement recording
- Trip document upload, list, download and delete
- Notifications and mark-as-read
- Admin user list, update, status, password reset and delete

## Backend notes to be aware of
1. **CORS:** Spring Boot must allow `http://localhost:5173` and Authorization headers. If the browser reports a CORS error, configure CORS in Spring Security.
2. **Current-user profile:** No authenticated profile endpoint was present in the supplied controller code. The frontend displays the signed-in email and does not invent profile data.
3. **Admin navigation:** The admin link is shown only if a role is present in the stored login response. Your supplied `AuthResponse` contains token fields only, so the admin link may not appear automatically. The admin API itself still enforces ADMIN authorization. You can navigate directly to `/admin/users` when signed in as an administrator.
4. **Invitation deep link:** The invitation email currently includes a token but the accept/reject controller requires both `tripId` and token. A frontend cannot infer the trip ID from the supplied email URL. The backend email URL should be updated to include `tripId`, or an endpoint should be added to resolve a token to its trip.
5. **Settlement URL:** The frontend currently calls `/api/trips/{tripId}/settlements/settlements`, matching the controller mapping supplied in the project review. If you correct the backend mapping to a single `/settlements`, update `src/api/featureApi.js` accordingly.
6. **Settlement history:** The supplied controller only confirmed settlement creation. This frontend records settlements and refreshes balances; it does not fabricate a settlement-history endpoint.
7. **Trip member permissions:** Backend service authorization is authoritative. UI role labels are informational; frontend controls do not replace backend authorization.
8. **Documents:** The upload UI accepts the file types discussed in the backend review. The backend remains authoritative for file type and size validation.

## Troubleshooting
- `npm` not recognized: install Node.js LTS, restart IntelliJ, and check `node -v` and `npm -v`.
- Network error: confirm Spring Boot is running and `.env` points to its port.
- CORS error: allow Vite origin in backend CORS configuration.
- 401: sign in again; the frontend attaches the saved JWT as `Authorization: Bearer <token>`.
- 403 on admin page: the signed-in account does not have ADMIN privileges.
