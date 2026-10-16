<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Backend Setup

This project includes a Node.js/Express backend with MySQL for handling trial requests.

### To start the backend:

1. Ensure MySQL is installed and running
2. Import `backend/database.sql` into MySQL to create the database and table
3. Configure `backend/.env` with your MySQL credentials
4. Run:
   ```bash
   cd backend
   npm install
   npm start
   ```

The backend runs on port 3001 by default.

### API Endpoints:

- POST /api/demandes-essai - Create a new trial request
- GET /api/demandes-essai - Get all trial requests

### Security Features:

- Rate limiting (5 requests per 15 minutes, 10 per hour)
- CORS configured for frontend
- Server-side validation
- Helmet for HTTP security headers
