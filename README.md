# 🤖 GEN-AI — AI-Powered Interview Prep

A full-stack AI application that generates personalized interview preparation plans based on your resume and job description using Google Gemini AI.

![GEN-AI Banner](https://img.shields.io/badge/AI-Powered-blueviolet) ![React](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 🌐 Live Demo

- **Frontend:** [https://gen-ai-orcin.vercel.app](https://gen-ai-orcin.vercel.app)
- **Backend:** [https://gen-ai-backend-u7rz.onrender.com](https://gen-ai-backend-u7rz.onrender.com)

---

## ✨ Features

- 📄 Upload your resume (PDF) or write a self-description
- 💼 Paste any job description
- 🤖 AI generates a personalized interview report including:
  - **Match Score** — how well your profile matches the job
  - **Technical Questions** — with intentions and model answers
  - **Behavioral Questions** — with intentions and model answers
  - **Skill Gaps** — with severity levels
  - **Preparation Roadmap** — a day-wise plan to prepare
- 📥 Download an AI-generated tailored resume as PDF
- 🔐 User authentication (register/login/logout)
- 📋 View all your past interview reports

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router
- Axios
- SCSS

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Google Gemini AI (`@google/genai`)
- Multer (file uploads)
- PDF Parse (resume parsing)
- Puppeteer (PDF generation)
- JWT + Cookie Authentication
- CORS

---

## 📁 Project Structure

```
GEN-AI/
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/   # Protected route
│   │   │   │   ├── hooks/        # useAuth hook
│   │   │   │   ├── pages/        # Login, Register
│   │   │   │   └── services/     # Auth API calls
│   │   │   └── interview/
│   │   │       ├── hooks/        # useInterview hook
│   │   │       ├── pages/        # Home, Interview
│   │   │       └── services/     # Interview API calls
│   │   ├── style/                # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── Backend/
    ├── src/
    │   ├── config/               # Database connection
    │   ├── controller/           # Auth, Interview controllers
    │   ├── middleware/           # Auth middleware, File upload
    │   ├── models/               # User, InterviewReport models
    │   ├── routes/               # Auth, Interview routes
    │   ├── services/             # AI service (Gemini)
    │   └── app.js
    ├── server.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/mohitwaghela2212/GEN-AI.git
cd GEN-AI
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` folder:
```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |

---

## 📸 Screenshots

### Home Page
Upload your resume and paste the job description to generate your interview plan.

### Interview Plan
View your personalized technical questions, behavioral questions, skill gaps and preparation roadmap.

---

## 🚢 Deployment

- **Frontend** is deployed on [Vercel](https://vercel.com)
- **Backend** is deployed on [Render](https://render.com)

---

## 👨‍💻 Author

**Mohit Waghela**
- GitHub: [@mohitwaghela2212](https://github.com/mohitwaghela2212)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
