# Hospital Automation — Backend

FastAPI + MongoDB backend for the Hospital Automation Dashboard (Patient / Doctor / Reception portals).

Replaces the frontend's mock data (`src/mockData/index.js`, `src/services/api.js`) with a real API and database.

## Tech stack
- **FastAPI** — async Python web framework
- **MongoDB** (via **Motor**, the async driver)
- **JWT** auth (python-jose) + **bcrypt** password hashing (passlib)
- **Pydantic v2** for request/response validation

## 1. Prerequisites
- Python 3.11+
- A MongoDB instance — any of:
  - Local install (`mongod` running on `localhost:27017`)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier (recommended — no local install needed)
  - Docker: `docker run -d -p 27017:27017 --name mongo mongo:7`

## 2. Setup

```bash
cd hospital-backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# then edit .env — set MONGO_URI (and JWT_SECRET_KEY to something random/secret)
```

## 3. Seed the database

Populates MongoDB with the same demo doctors/patients/appointments/etc. your frontend already used as mock data, plus the 3 demo login accounts:

```bash
python -m app.seed
```

Demo accounts (unchanged from the frontend):
| Email | Password | Role |
|---|---|---|
| patient@hospital.com | patient123 | patient |
| doctor@hospital.com | doctor123 | doctor |
| reception@hospital.com | reception123 | reception |

## 4. Run the server

```bash
uvicorn app.main:app --reload --port 5000
```

- API base URL: `http://localhost:5000`
- Interactive docs (Swagger UI): `http://localhost:5000/docs`

> Your frontend's `src/services/api.js` already defaults to `http://localhost:5000/api` via `VITE_API_URL`, so no frontend config change is needed if you run the backend on port 5000.

## 5. Connect the frontend

In `src/services/api.js`, replace the mock function bodies with real calls to `API` (the axios instance already configured there), e.g.:

```js
export const getDoctors = async () => {
  return API.get('/doctors');
};

export const loginUser = async (email, password) => {
  return API.post('/auth/login', { email, password });
};
```

Store the returned `token` (e.g. in `localStorage.setItem('hospital_auth_token', token)`) — the axios interceptor already set up in `api.js` will attach it to every subsequent request automatically.

## API endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/auth/login | — | Returns `{ user, token }` |
| GET | /api/auth/me | any | Current user from token |
| GET | /api/doctors | any | |
| POST/PUT/DELETE | /api/doctors | reception | |
| GET | /api/patients | any | |
| POST/DELETE | /api/patients | reception | |
| PUT | /api/patients/{id} | reception, doctor | |
| GET | /api/appointments | any | |
| POST/PUT/DELETE | /api/appointments | any | |
| GET | /api/medical-records | any | |
| POST/PUT/DELETE | /api/medical-records | doctor | |
| GET | /api/prescriptions | any | |
| POST/PUT/DELETE | /api/prescriptions | doctor | |
| GET | /api/invoices | any | |
| POST/PUT/DELETE | /api/invoices | reception | |
| GET | /api/health | — | Health check |

All protected routes require `Authorization: Bearer <token>`.

## Docker

```bash
docker build -t hospital-backend .
docker run -p 8000:8000 --env-file .env hospital-backend
```

(Point `MONGO_URI` in `.env` at an Atlas cluster or a reachable Mongo container — `localhost` won't resolve correctly from inside the container.)
