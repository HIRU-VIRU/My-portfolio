# SmartVision

> Edge-to-Cloud AI Pipeline for Seafood Export Compliance & Vendor Grading

SmartVision automates seafood quality control across two distinct workflows using a dual YOLO vision stack and Google Gemini on Vertex AI. The backend runs locally on an edge GPU (NVIDIA MX550, 2 GB VRAM) and is tunnelled to a cloud-hosted Next.js frontend via Ngrok.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Technology Stack](#technology-stack)
3. [Backend Module Structure](#backend-module-structure)
4. [API Reference](#api-reference)
5. [YOLO Model Inventory](#yolo-model-inventory)
6. [VRAM Management — ModelManager](#vram-management--modelmanager)
7. [Inference Pipelines](#inference-pipelines)
8. [Gemini Integration](#gemini-integration)
9. [Configuration & Environment Variables](#configuration--environment-variables)
10. [Frontend](#frontend)
11. [Getting Started](#getting-started)
12. [Project Status](#project-status)

---

## System Architecture

```
[Browser / Image Upload]
        │
        ▼
┌───────────────────────────┐  HTTPS (base64 JSON)  ┌──────────────────────────────────┐
│  Next.js Frontend          │ ◄───────────────────► │  FastAPI Backend (Local Edge)     │
│  Vercel · TypeScript       │                       │  NVIDIA MX550 · 2 GB VRAM         │
│  Tailwind CSS v4           │                       │  Python · Uvicorn                 │
│  React 19 · Next.js 16     │                       │  Exposed publicly via Ngrok        │
└───────────────────────────┘                       └──────────┬───────────────────────┘
                                                               │
                                        ┌──────────────────────┴──────────────────────────┐
                                        │ ModelManager (single GPU slot)                   │
                                        │  active slot: "export" | "vendor" | None         │
                                        └────────┬────────────────────┬────────────────────┘
                                                 │                    │
                                    ┌────────────▼──────┐  ┌──────────▼──────────┐
                                    │ seafood_best.pt    │  │ vendor_best.pt       │
                                    │ 8-class export     │  │ local grading model  │
                                    │ compliance model   │  │ (in training)        │
                                    └────────────┬──────┘  └──────────────────────┘
                                                 │ freshness/spoilage markers
                                                 │ (species labels stripped)
                                    ┌────────────▼──────────────────┐
                                    │ Gemini 2.0 Flash               │
                                    │ Vertex AI · Service Account    │
                                    │ Generates formal export report │
                                    └───────────────────────────────┘
```

---

## Technology Stack

| Layer             | Technology                                                  | Version                    |
|-------------------|-------------------------------------------------------------|----------------------------|
| Frontend          | Next.js · React · Tailwind CSS · TypeScript                 | Next 16 / React 19 / TS 5  |
| Backend framework | FastAPI · Uvicorn                                           | latest                     |
| Vision inference  | Ultralytics YOLO (FP16, CUDA)                               | latest                     |
| LLM               | Google Gemini 2.0 Flash via Vertex AI (`google-genai`)      | gemini-2.0-flash           |
| Auth              | GCP Service Account JSON (Application Default Credentials)  | —                          |
| Tunnel            | Ngrok (`pyngrok`)                                           | latest                     |
| Image processing  | OpenCV (`opencv-python-headless`) · NumPy                   | latest                     |
| Frontend deploy   | Vercel                                                      | —                          |
| Hardware target   | NVIDIA MX550 · 2.0 GB VRAM · CUDA                           | —                          |

---

## Backend Module Structure

```
backend/
├── app.py              ← FastAPI app, route definitions, CORS, Ngrok lifespan, thread-pool dispatch
├── model_manager.py    ← ModelManager class — lazy VRAM swap, FP16 flag, thread-safety lock
├── schemas.py          ← Pydantic request / response contracts for both endpoints
├── services.py         ← Business logic: run_export_pipeline / run_vendor_pipeline
├── gemini.py           ← Vertex AI client, generate_export_report / generate_vendor_report
├── config.py           ← .env loader, class-set constants, localization map, thresholds
├── requirements.txt    ← Python dependencies
└── models/
    ├── seafood_best.pt  ← Export compliance model (8 classes) — READY
    └── vendor_best.pt   ← Vendor grading model — IN TRAINING (drop .pt here when ready)
```

---

## API Reference

### `GET /health`

Liveness probe. Returns the name of the model currently resident on GPU.

```jsonc
// Response 200
{
  "status": "ok",
  "active_model": "export" | "vendor" | null,
  "fp16_enabled": true
}
```

---

### `POST /api/analyze-export`

Export compliance check on a batch of 1–5 fish images.

**Request**
```jsonc
{
  "images": ["<base64>", "<base64>", ...]  // 1 to 5 items
}
```

**Response**
```jsonc
{
  "annotated_images": ["<base64>", ...],         // one annotated JPEG per input
  "detections": [[{ "class_name", "confidence", "bbox": [x1,y1,x2,y2] }], ...],
  "spoilage_count": 1,                           // fish with ≥1 spoilage marker
  "total_fish": 3,
  "batch_verdict": "APPROVED" | "REJECTED",      // REJECTED if spoilage_count ≥ 2
  "report": "<Gemini compliance text>"
}
```

**Pipeline steps:**
1. Validate batch size ≤ 5 (HTTP 422 otherwise).
2. Sequential per-image YOLO inference (FP16, `conf=0.35`, `imgsz=640`).
3. Annotated frame captured; result tensors converted to plain Python and discarded.
4. Localization map applied to class names (`Bangus` → `Vanjiram`, `Tilapia` → `Jalebi Fish`).
5. Spoilage check on raw class names (`NonFresh-Eye`, `NonFresh-Skin`).
6. **Gemini Intercept:** species labels stripped; only freshness/spoilage markers forwarded to LLM.
7. Batch verdict computed: `REJECTED` if `spoilage_count ≥ 2`.
8. Single consolidated Gemini report generated for the whole batch.

---

### `POST /api/analyze-vendor`

Single-image freshness grading for local market produce.

**Request**
```jsonc
{
  "image": "<base64>"
}
```

**Response**
```jsonc
{
  "annotated_image": "<base64>",
  "detections": [{ "class_name", "confidence", "bbox": [x1,y1,x2,y2] }],
  "rotten_detected": false,
  "report": "<Gemini pricing text>" | null   // null if no rotten produce detected
}
```

> Gemini is only invoked when rotten produce (`Rotten Apple`, `Rotten Banana`) is detected.

---

## YOLO Model Inventory

### Model A — Export Compliance (`seafood_best.pt`)

| Category         | Classes                                                      |
|------------------|--------------------------------------------------------------|
| Species          | `Bangus`, `Tilapia`                                          |
| Fresh markers    | `Fresh-Eye`, `Fresh-Skin`, `VeryFresh-Eye`, `VeryFresh-Skin` |
| Spoilage markers | `NonFresh-Eye`, `NonFresh-Skin`                              |

Status: **READY** — file present at `backend/models/seafood_best.pt`.

### Model B — Vendor Grading (`vendor_best.pt`)

| Category       | Classes                                |
|----------------|----------------------------------------|
| Fresh produce  | `Fresh Apple`, `Fresh Banana`          |
| Rotten produce | `Rotten Apple`, `Rotten Banana`        |

Status: **IN TRAINING** — drop the `.pt` file into `backend/models/` when complete. The endpoint returns HTTP 503 until the file is present.

---

## VRAM Management — ModelManager

The NVIDIA MX550 provides exactly **2.0 GB of VRAM**. Both models cannot coexist on the GPU.

**Policy:** Only one model may be resident on the GPU at any time (`single-slot` constraint).

**Swap sequence** (executed inside `threading.Lock` to prevent race conditions):

```
1. Check _active_model tracker.
2. If the correct model is already loaded → return it immediately (fast path).
3. Otherwise:
   a. del self._model
   b. torch.cuda.empty_cache()
   c. YOLO(path).to("cuda")
   d. Update _active_model
4. Return the newly loaded model.
```

**Additional memory hygiene:**
- `half=True` globally — FP16 inference halves VRAM consumption.
- Result tensors are converted to plain Python lists immediately after inference and deleted.
- Neither model path is imported at module level.
- On application shutdown, `_unload()` is called to fully release VRAM.

**Graceful degradation:** If `vendor_best.pt` is absent, `get("vendor")` raises HTTP 503 instead of crashing with `FileNotFoundError`.

---

## Inference Pipelines

### Export Pipeline (`run_export_pipeline`)

```
for each image in batch (sequential, never PyTorch-batched):
    decode base64 → numpy BGR frame
    mm.get("export")           # VRAM swap if needed
    model.predict(half=True, conf=0.35, imgsz=640)
    plot annotated frame
    extract detections → plain Python list
    del results
    apply LOCALE_MAP to class_name
    accumulate spoilage_count, gemini_markers

determine verdict  (spoilage_count >= EXPORT_SPOILAGE_THRESHOLD=2 → REJECTED)
gemini.generate_export_report(markers_without_species, verdict, ...)
return ExportResponse
```

### Vendor Pipeline (`run_vendor_pipeline`)

```
decode base64 → numpy BGR frame
mm.get("vendor")               # VRAM swap if needed
model.predict(half=True, conf=0.35, imgsz=640)
plot annotated frame
extract detections → plain Python list
del results
apply LOCALE_MAP

if any detection in ROTTEN_CLASSES:
    report = gemini.generate_vendor_report(detections)
else:
    report = None

return VendorResponse
```

Both pipelines run synchronously and are dispatched through `asyncio.get_event_loop().run_in_executor(None, ...)` to keep the FastAPI async event loop unblocked during GPU inference.

---

## Gemini Integration

- **SDK:** `google-genai` (`from google import genai`) — unified Vertex AI SDK, **not** the legacy `google.generativeai`.
- **Model:** `gemini-2.0-flash` on Vertex AI.
- **Authentication:** GCP Service Account JSON via Application Default Credentials (`GOOGLE_APPLICATION_CREDENTIALS` env var). No API key required.
- **Generation config:** `temperature=0.4`, `max_output_tokens=512`, `thinking_budget=-1` (MEDIUM — model self-regulates reasoning depth).

**Export report prompt strategy:**
- Species labels (`Bangus`, `Tilapia`) are stripped from the detection list before the prompt is assembled.
- Only biological markers (`NonFresh-Eye`, `Fresh-Skin`, etc.) are forwarded.
- This forces the LLM to reason purely on biological degradation, enabling zero-shot generalization to unseen fish species.

---

## Configuration & Environment Variables

Create `backend/.env` with the following keys:

```dotenv
# Ngrok — expose local backend to the internet
NGROK_AUTH_TOKEN=<your_ngrok_token>
NGROK_ENABLED=true

# Google Cloud / Vertex AI — Service Account auth
GCP_CREDENTIALS_PATH=/absolute/path/to/service-account.json
GCP_PROJECT_ID=<your_gcp_project_id>
GCP_LOCATION=us-central1
```

**Key constants defined in `config.py`:**

| Constant                    | Value / Type                                        | Purpose                                    |
|-----------------------------|-----------------------------------------------------|--------------------------------------------|
| `SPOILAGE_CLASSES`          | `{"NonFresh-Eye", "NonFresh-Skin"}`                 | Triggers spoilage flag per fish            |
| `SPECIES_CLASSES`           | `{"Bangus", "Tilapia"}`                             | Stripped before Gemini prompt              |
| `FRESHNESS_CLASSES`         | `{"Fresh-Eye", "Fresh-Skin", …}`                    | Forwarded to Gemini as-is                  |
| `ROTTEN_CLASSES`            | `{"Rotten Apple", "Rotten Banana"}`                 | Triggers vendor Gemini report              |
| `EXPORT_MAX_BATCH`          | `5`                                                 | Route-level batch size limit               |
| `EXPORT_SPOILAGE_THRESHOLD` | `2`                                                 | Min spoiled fish count to reject a batch   |
| `LOCALE_MAP`                | `{"Bangus": "Vanjiram", "Tilapia": "Jalebi Fish"}`  | Applied post-inference, pre-response       |

---

## Frontend

- **Framework:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4
- **Deployment:** Vercel
- **API URL:** Configured via `NEXT_PUBLIC_API_URL` environment variable (set to the Ngrok public URL).
- **Key pages:**
  - `/` — Landing page (Hero, Features, How It Works, Stats, CTA)
  - `/export` — Export compliance workflow (batch upload up to 5 images → annotated results + Gemini report)
  - `/vendor` — Vendor grading workflow (single image → detections + optional pricing report)

**Component structure:**

```
src/
├── app/
│   ├── export/          ← ExportClient.tsx (stateful), page.tsx
│   └── vendor/          ← VendorClient.tsx (stateful), page.tsx
├── components/
│   ├── analysis/        ← AnalysisPageShell, ComplianceReport, DetectionBadge, ImageUploader, ResultsPanel
│   ├── home/            ← Hero, FeaturesSection, HowItWorks, StatsBar, CTASection
│   ├── layout/          ← Navbar, Footer
│   └── ui/              ← Button, Card, Badge (design system primitives)
├── lib/
│   └── api.ts           ← analyzeExport() / analyzeVendor() fetch wrappers
└── types/
    └── analysis.ts      ← Detection, ExportAnalysisResponse, VendorAnalysisResponse
```

---

## Getting Started

### Prerequisites

- Python ≥ 3.11, CUDA-capable GPU
- Node.js ≥ 20
- GCP project with Vertex AI enabled and a Service Account JSON
- Ngrok account and auth token

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Create backend/.env with your credentials (see Configuration section above)

uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The startup log will print the Ngrok public URL if `NGROK_ENABLED=true`.

### Frontend

```bash
cd frontend
npm install

# Create frontend/.env.local
echo "NEXT_PUBLIC_API_URL=https://<your-ngrok-subdomain>.ngrok-free.app" > .env.local

npm run dev          # development
npm run build && npm run start  # production
```

For Vercel deployment, set `NEXT_PUBLIC_API_URL` in the Vercel project environment variables.

---

## Project Status

| Component                              | Status         |
|----------------------------------------|----------------|
| FastAPI backend                        | Complete        |
| Export YOLO model (`seafood_best.pt`)  | Ready           |
| Vendor YOLO model (`vendor_best.pt`)   | In training     |
| Gemini export report                   | Complete        |
| Gemini vendor report                   | Complete        |
| Next.js frontend                       | Complete        |
| Vercel deployment                      | Ready           |
| Ngrok tunnel                           | Integrated      |

---

*SmartVision — Hackathon Build*
