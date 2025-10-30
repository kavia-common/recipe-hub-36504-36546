# recipe-hub-36504-36546

Integration notes:
- Frontend uses REACT_APP_API_BASE_URL (defaults to http://localhost:3001) to call the backend.
- Axios client automatically attaches JWT from localStorage key "auth" as Authorization: Bearer <token>.
- Backend must enable CORS for http://localhost:3000 so the browser can call the API during development.

Environment examples:
- Frontend: see recipe_frontend/.env.example
- Backend: see ../recipe-hub-36504-36545/recipe_backend/.env.example