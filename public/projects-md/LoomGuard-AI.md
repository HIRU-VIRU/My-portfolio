<div align="center">

# LoomGuard-AI

**AI-Powered Fabric Defect Detection — Built for the Hackathon**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://loomguard-ai.vercel.app)
[![API](https://img.shields.io/badge/API-Hugging%20Face%20Space-yellow?style=for-the-badge&logo=huggingface)](https://huggingface.co/spaces/your-username/loomguard-ai)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

*Detects fabric defects in real-time using a custom-trained YOLO model and a modern dark-mode industrial dashboard.*

</div>

---

## The Problem

Manual fabric inspection on production lines is slow, inconsistent, and expensive. A trained quality inspector can miss up to 25% of defects during a high-throughput shift. LoomGuard-AI solves this by running a lightweight, CPU-optimized AI model that can scan batches of fabric images in seconds and return precision bounding boxes around every defect.

---

## Features

| Feature | Description |
|---|---|
| **Single Scan** | Drag-and-drop or click-to-upload a single fabric image for instant inference |
| **Batch Processing** | Upload multiple images simultaneously — results rendered in a responsive 3-column grid |
| **YOLO Bounding Boxes** | Normalized center coordinates (`xywhn`) rendered on an HTML5 Canvas overlay with animated draw-in |
| **X-Ray Vision Mode** | Toggle a CSS filter (`grayscale + contrast + invert`) on the image to visually isolate defects |
| **Export CSV** | One-click download of a full inspection report with per-defect rows (`Timestamp, Filename, Class, Confidence, BBox`) |
| **Cinematic Intro** | GPU-optimized intro animation using Framer Motion (radial burst, no `scale: 50` lag) |
| **4 Defect Classes** | Hole · Knot · Line · Stain — each with a unique neon color |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          JUDGE'S BROWSER                            │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              Next.js 14  (Vercel — Edge CDN)                │   │
│  │                                                             │   │
│  │  • App Router + TypeScript                                  │   │
│  │  • Tailwind CSS dark-mode industrial UI                     │   │
│  │  • Framer Motion animations                                 │   │
│  │  • react-dropzone for file ingestion                        │   │
│  │  • HTML5 Canvas for bounding box rendering                  │   │
│  │  • Client-side CSV export (no server needed)                │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │  multipart/form-data                  │
│                             │  POST /api/analyze                    │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│           FastAPI  (Hugging Face Docker Space — Port 7860)          │
│                                                                     │
│  • python:3.11-slim base image                                      │
│  • opencv-python-headless  (no GUI deps — fast build)               │
│  • Ultralytics YOLO → loads best.onnx at startup                    │
│  • ONNX Runtime for CPU-optimized tensor inference                  │
│  • Returns { batch_data: [ { filename, detections: [...] } ] }      │
└─────────────────────────────────────────────────────────────────────┘
```

### Why this split?

- **Vercel** handles global CDN distribution, SSL, and instant frontend redeploys — zero DevOps.  
- **Hugging Face Spaces** provides free Docker-based GPU/CPU hosting purpose-built for ML models, with a persistent container that keeps the 78 MB ONNX model warm.

### API Contract

```
POST /api/analyze
Content-Type: multipart/form-data

Body: files[] — one or more image files

Response:
{
  "batch_data": [
    {
      "filename": "fabric_01.jpg",
      "image_width": 640,
      "image_height": 480,
      "inference_ms": 312.4,
      "detections": [
        {
          "class": "Hole",
          "confidence": 0.94,
          "bbox": [0.45, 0.33, 0.12, 0.08]   // [x_center, y_center, w, h] normalized
        }
      ]
    }
  ]
}
```

---

## Model

| Property | Value |
|---|---|
| Architecture | YOLOv8 (custom fine-tuned) |
| Format | ONNX (CPU-optimized, no CUDA required) |
| Classes | `Hole`, `Knot`, `Line`, `Stain` |
| Input | RGB fabric images (any resolution) |
| Confidence threshold | 0.25 |
| Inference device | CPU |

---

## Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) — App Router, Server Components
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) — custom neon color palette
- [Framer Motion](https://www.framer.com/motion/) — all animations
- [react-dropzone](https://react-dropzone.js.org/) — file ingestion
- [lucide-react](https://lucide.dev/) — icon set

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — async Python web framework
- [Ultralytics YOLO](https://github.com/ultralytics/ultralytics) — model loading & inference
- [ONNX Runtime](https://onnxruntime.ai/) — CPU inference engine
- [Pillow](https://python-pillow.org/) — image decoding
- [opencv-python-headless](https://pypi.org/project/opencv-python-headless/) — image preprocessing

**Infrastructure**
- [Vercel](https://vercel.com/) — frontend hosting
- [Hugging Face Spaces](https://huggingface.co/spaces) — Docker-based ML API hosting

---

## Local Setup

### Prerequisites
- Node.js ≥ 18
- Python 3.11+
- The `models/v2/best.onnx` model file

### 1. Clone

```bash
git clone https://github.com/Git-by-Devi/LoomGuard-AI.git
cd LoomGuard-AI
```

### 2. Backend

```bash
# Create a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r hf-space/requirements.txt

# Start the API server
cd backend
uvicorn main:app --reload --port 8000
```

API available at: `http://localhost:8000`  
Swagger docs: `http://localhost:8000/docs`

### 3. Frontend

```bash
cd frontend

# Copy environment config
cp .env.example .env.local
# Edit .env.local → set NEXT_PUBLIC_API_URL=http://localhost:8000

# Install and run
npm install
npm run dev
```

App available at: `http://localhost:3000`

---

## Project Structure

```
LoomGuard-AI/
├── backend/              # Local FastAPI dev server
│   ├── main.py           # Routes: /health, /api/analyze, /api/analyze/batch
│   └── schemas.py        # Pydantic models (Pydantic v2, alias serialization)
│
├── frontend/             # Next.js 14 App Router project
│   ├── src/
│   │   ├── app/          # page.tsx, globals.css, layout.tsx
│   │   ├── components/   # FabricAnalyzer, DetectionCanvas, DropZone, ...
│   │   └── types/        # detection.ts — shared TypeScript interfaces
│   └── vercel.json
│
├── hf-space/             # Hugging Face Docker Space (production API)
│   ├── app.py            # FastAPI app with YOLO inference
│   ├── Dockerfile        # python:3.11-slim + opencv-headless
│   └── requirements.txt
│
├── models/
│   └── v2/best.onnx      # Custom-trained YOLO ONNX model (78 MB)
│
├── Dockerfile            # Render-compatible build (alternative deployment)
└── render.yaml           # Render blueprint
```

---

## Deployment

| Layer | Platform | Trigger |
|---|---|---|
| Frontend | Vercel | Push to `main` |
| Backend | Hugging Face Docker Space | Push to `main` (HF Space synced from GitHub) |

### Environment variables

**Vercel Dashboard → Settings → Environment Variables:**

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://your-username-loomguard-ai.hf.space` |

---

## License

MIT © 2026 LoomGuard-AI Team
