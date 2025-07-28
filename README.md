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
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── calendar.js
│   │   └── yelp.js
│   └── server.js
├── frontend/
│   ├── src/components/
│   │   ├── TherapistCard.jsx
│   │   ├── AIChatbot.jsx
│   │   ├── EventForm.jsx
│   │   └── Navbar.jsx
│   ├── App.jsx
│   └── ...
├── .firebase/
├── .github/workflows/
├── firebase.json
├── .firebaserc
├── .env.example
└── README.md
```

---

## 🔗 Deployed Application

Try the live app here:  
🌐 [https://local-mental-health-find-96e8c.web.app](https://local-mental-health-find-96e8c.web.app)

---

## 🧪 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mmjsk0805/local-mental-health-finder.git
cd local-mental-health-finder
```

### 2. Add environment variables

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

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 4. Run the application locally

```bash
# In one terminal
cd backend
npm run dev

# In another terminal
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 📷 Screenshots

### 🏠 Home Page

![Home](./screenshots/home.png)

### 💡 Get Started Section

![Get Started](./screenshots/getstarted.png)

### 🧑‍⚕️ Search Input Page

![Search](./screenshots/search.png)

### 🔍 Filled Search Example

![Search1](./screenshots/search1.png)

### 🤖 AI Recommendations

![AI Results](./screenshots/searchAI.png)

### 📋 Yelp Therapist Results

![Search Results](./screenshots/searchresult.png)

### 📅 Create Event Page

![Calendar](./screenshots/event.png)

### 💬 Chatbot Interface

![Chatbot](./screenshots/chat.png)

---

## 🧭 Learning Journey

### 💡 What inspired this project?

This project was inspired by the real struggle many people face trying to find mental health support. It's hard enough to ask for help—finding the right provider or even knowing what to look for can be overwhelming. I wanted to build something that made those first steps easier, less lonely, and more intuitive.

### 🌍 Potential impact on users and the broader community

The app lowers the barrier to care by offering a way to search for therapists based on symptoms, book appointments with a few clicks, and talk to an AI assistant that offers support 24/7. It can be a meaningful bridge for people who aren’t ready or able to access therapy yet.

### 🛠 Technologies I learned

- Google OAuth 2.0 + Calendar API
- Yelp Fusion API
- OpenAI GPT API for conversation generation
- Tailwind CSS
- Firebase + Render deployment
- CORS, .env, and secure API key handling

### ⚙️ Challenges and takeaways

- Debugging redirect errors taught me how OAuth2 flows really work
- Prompt engineering gave me control over chatbot tone and usefulness
- Multi-platform deployment helped me structure my project cleanly
- Most importantly, I learned how to design for vulnerable users with care and intention

---

## 📄 License

MIT License  
© 2025 [Jaden Moon](https://github.com/mmjsk0805)
