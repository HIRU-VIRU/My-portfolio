Automated LinkedIn job scraper that monitors internship opportunities in India and sends email notifications when new positions are found.

Features
🔄 Automated hourly scraping of LinkedIn job postings
🎯 Multi-role search (SWE, ML, Data Science, SDE, AI Engineering interns)
📧 Email notifications with beautifully formatted HTML emails
🚀 Manual scrape trigger via dashboard
💾 SQLite-based storage with deduplication
🎨 Dark-themed modern dashboard with real-time stats
🔐 Configurable SMTP settings through the UI
Tech Stack
Technology	Badge
Backend	FastAPI
Language	Python
Frontend	React
Styling	TailwindCSS
Database	SQLite
Job Scraping	python-jobspy
Task Scheduling	APScheduler
Getting Started
Prerequisites
Python 3.11+
Node.js 16+
Yarn package manager
Google Cloud Platform account (for Gemini AI)
Gmail account with app password (for email notifications)
Configuration
1. Backend Environment Setup
cd backend
cp .env.example .env
Edit backend/.env and configure:

GCP_PROJECT_ID: Your Google Cloud project ID
GOOGLE_APPLICATION_CREDENTIALS: Path to your GCP service account JSON file
CORS_ORIGINS: Your frontend URL (e.g., http://localhost:3000)
SMTP_HOST, SMTP_USER: Your email settings
2. Frontend Environment Setup
cd frontend
cp .env.example .env
Edit frontend/.env and configure:

REACT_APP_BACKEND_URL: Your backend URL (e.g., http://localhost:8000)
For detailed production deployment instructions, see DEPLOYMENT.md

Terminal 1: Backend Setup & Start
# Navigate to the project root
cd /path/to/job-scrapper

# Navigate to backend directory
cd backend

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate  # On macOS/Linux
# OR
venv\Scripts\activate     # On Windows

# Install all dependencies from requirements.txt
pip install -r requirements.txt

# Start the backend server
uvicorn server:app --reload --host 0.0.0.0 --port 8000
Backend will run on: http://localhost:8000

Terminal 2: Frontend Setup & Start
# Navigate to the project root
cd /path/to/job-scrapper

# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Start the development server
yarn start
Frontend will run on: http://localhost:3000

Quick Start (After First Time Setup)
Terminal 1: Backend
cd backend
source venv/bin/activate  # Activate venv
uvicorn server:app --reload --host 0.0.0.0 --port 8000
Terminal 2: Frontend
cd frontend
yarn start