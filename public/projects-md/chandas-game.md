# Chandas Game

A gamified learning platform for mastering Sanskrit meters (Chandas) through interactive activities and lessons.

## Project Structure

```
Chandas-game/
├── backend/          # FastAPI backend server
├── frontend/         # React frontend application
└── tests/           # Test files
```

## Prerequisites

- **Python** 3.8+ (for backend)
- **Node.js** 14+ and npm (for frontend)
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HIRU-VIRU/Chandas-game.git
cd Chandas-game
```

### 2. Backend Setup

Navigate to the backend directory and set up the Python environment:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows (PowerShell):**
```powershell
.\.venv\Scripts\Activate.ps1
```

**Linux/Mac:**
```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

## Running the Application

### Start the Backend

From the `backend` directory with activated virtual environment:

```bash
cd backend
.\.venv\Scripts\Activate.ps1
python -m uvicorn server:app --reload --port 8000
```

The backend API will be available at `http://127.0.0.1:8000`

### Start the Frontend

From the `frontend` directory:

```bash
cd frontend
npm start
```

The frontend application will open at `http://localhost:3000`

## Quick Start (Both Servers)

**Backend Terminal:**
```powershell
cd D:\Projects\Chandas-game\backend
.\.venv\Scripts\Activate.ps1
python -m uvicorn server:app --reload --port 8000
```

**Frontend Terminal:**
```powershell
cd D:\Projects\Chandas-game\frontend
npm start
```

## Features

- 📚 Interactive Sanskrit lessons
- 🎮 Gamified learning experience
- ⭐ Progress tracking with stars and achievements
- 🗺️ Visual learning path with zigzag layout
- 🎯 Multiple activity types: lessons, practice, and quizzes
- 🌙 Dark mode support

## Tech Stack

### Backend
- FastAPI
- Uvicorn
- MongoDB (Motor)
- Python 3.x

### Frontend
- React 19
- React Router
- Tailwind CSS
- Radix UI components
- Lucide React icons

## Development

### Backend Development
- API runs with auto-reload enabled
- Swagger documentation available at `http://127.0.0.1:8000/docs`

### Frontend Development
- Hot reload enabled
- Development build (not optimized)
- Use `npm run build` for production build

## Troubleshooting

### Backend Issues
- **Module not found**: Ensure virtual environment is activated and dependencies are installed
- **Port already in use**: Change the port number in the uvicorn command

### Frontend Issues
- **Dependencies not found**: Run `npm install` again
- **Port 3000 in use**: The app will prompt to use a different port

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

## Contact

Repository: [https://github.com/HIRU-VIRU/Chandas-game](https://github.com/HIRU-VIRU/Chandas-game)