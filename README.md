# Evently Backend

This is the **backend repository** for **Evently**, an event management application. It is built using **Node.js**, **Express**, and **MongoDB (with Mongoose)**. The backend handles user authentication, event creation and management, ticket booking, and payment processing using **Stripe**.

---

## Features

- User registration and authentication using **JWT** and **cookie-based sessions**
- Staff/user role management
- Event creation, editing, deletion (restricted to staff)
- Ticket booking and Stripe payment integration
- Booking management for users and staff
- Image/media handling via **Firebase**
- Google Calendar integration support

---

## Tech Stack

- **Node.js + Express** for the server
- **MongoDB + Mongoose** for the database
- **Stripe** for payment processing
- **Firebase** for media uploads (used in conjunction with frontend)
- **dotenv** for environment variable management
- **cookie-parser** for session handling

---

## Environment Variables

Before running the backend locally, create a `.env` file in the root directory and include the following variables:
For easy configuration with the frontend, I recommend making your PORT value 5000
```
PORT=
MONGO_URL=
JWT_SECRET_KEY=
STRIPE_SECRET_KEY=
```

> ⚠️ Make sure your MongoDB Atlas IP whitelist includes your current IP or `0.0.0.0/0` for open access (not recommended in production).

---

## Running Locally
To view the frontend please refer to the frontend repo by clicking [HERE](https://github.com/roseiaa/Evently-Client/blob/main/README.md)

1. Clone the repository:

   ```bash
   git clone https://github.com/roseiaa/Evently-Server.git
   cd Evently-Server

2. Install dependencies:

  ```bash
  npm install
  ```
3. Add your .env file with the required environment variables listed above.
  

4. Start the development server:

```bash
npm run dev
```
The server should start on the specified PORT (default is 5000 or 5001).

## Notes
Ensure your frontend is properly configured to send API requests to the correct backend URL.

For local development, you may need to enable CORS for http://localhost:5173 (Vite frontend default port).

In production, ensure all environment variables and secrets are properly configured on your hosting platform (e.g., Render, Heroku).



