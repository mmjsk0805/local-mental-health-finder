# 🧠 Local Mental Health Finder

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Backend-Express-green)](https://expressjs.com/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI-black)](https://platform.openai.com/)
[![Google Calendar API](https://img.shields.io/badge/API-Google_Calendar-red)](https://developers.google.com/calendar)

**Local Mental Health Finder** is a full-stack web application that helps users find local therapists based on their symptoms and location, book appointments through Google Calendar, and chat with an AI-powered mental health assistant powered by OpenAI.

This project was built with empathy, accessibility, and practical utility in mind—bringing together real-time search, calendar scheduling, and intelligent conversation into one platform for mental health support.

---

## 🚀 Features

- 🔍 Therapist search using the **Yelp Fusion API**
- 📅 Google Calendar event creation with **OAuth2**
- 🔐 Google login & authentication
- 💬 AI chatbot powered by **OpenAI GPT**
- 🌍 Fully connected frontend/backend + deployment

---

## 🧑‍💻 Tech Stack

| Layer      | Tools & Services                      |
| ---------- | ------------------------------------- |
| Frontend   | React.js, Tailwind CSS                |
| Backend    | Node.js, Express                      |
| AI         | OpenAI GPT                            |
| APIs       | Yelp Fusion API, Google Calendar API  |
| Auth       | Google OAuth2                         |
| Deployment | Firebase (Frontend), Render (Backend) |

---

## 📁 Project Structure

```
local-mental-health-finder/
├── backend/               # Express API for auth, calendar, and therapist search
│   ├── routes/
│   │   ├── auth.js
│   │   ├── calendar.js
│   │   └── yelp.js
│   └── server.js
├── frontend/              # React frontend
│   ├── src/components/
│   │   ├── TherapistCard.jsx
│   │   ├── AIChatbot.jsx
│   │   ├── EventForm.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   └── ...
├── .firebase/             # Firebase hosting setup
├── .github/workflows/     # GitHub Actions (CI/CD)
├── firebase.json
├── .firebaserc
├── .env.example
└── README.md
```

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mmjsk0805/local-mental-health-finder.git
cd local-mental-health-finder
```

### 2. Configure environment variables

#### `/backend/.env`

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-backend.com/oauth2callback
YELP_API_KEY=your-yelp-api-key
OPENAI_API_KEY=your-openai-api-key
FRONTEND_BASE_URL=https://your-frontend.com
```

#### `/frontend/.env`

```env
VITE_BACKEND_URL=https://your-backend.com
```

### 3. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

## 🔧 Running the App Locally

### Start the backend server

```bash
cd backend
npm run dev
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to use the app.

---

## 📌 Future Improvements

- [ ] Store and display user’s previous chatbot sessions
- [ ] Add mobile responsiveness
- [ ] UI theming (dark mode / accessibility)
- [ ] Allow feedback or review of therapist matches

---

## 📷 Screenshots (Coming Soon)

Feel free to submit a pull request with UI snapshots you'd like featured here.

---

## 🏗 Built With

- React + Tailwind CSS
- Node.js + Express
- OpenAI GPT
- Yelp Fusion API
- Google Calendar API + OAuth2
- Firebase + Render

---

## 📄 License

MIT License  
© 2025 [Jaden Moon](https://github.com/mmjsk0805)

---

## 🙌 Acknowledgments

This project was created with support from the Dartmouth developer community and built for people seeking clarity, care, and connection.

---
