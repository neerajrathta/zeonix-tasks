
# Authentication API

## Setup Instructions

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up `.env` with your MongoDB URI and JWT_SECRET.
4. Run the project: `npm start`.

## Endpoints

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and get a JWT.
- `GET /api/auth/admin`: Access restricted to admin users.
