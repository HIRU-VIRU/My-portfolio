# VerifyX AI - Multi-Agent Background Verification Platform

> AI-powered background verification system that reduces verification time from 20 days to 5 seconds using multi-agent orchestration and mocked DigiLocker APIs.

## 🎯 Project Overview

VerifyX AI is a hackathon project that leverages multi-agent AI orchestration to automate background verification processes. The platform uses 6 specialized AI agents running in parallel to verify identity, employment history, documents, and detect fraud in real-time.

**Key Metrics:**
- ⚡ Verification time: 20 days → 5 seconds
- 🎯 P95 latency: < 120 seconds
- 🔄 Concurrent runs: 50+
- 📊 Confidence score: Up to 97%

## 🏗️ Architecture

```
React Dashboard (Real-time SSE)
    ↓
FastAPI Backend (Async)
    ↓
Multi-Agent Orchestrator (LangGraph)
    ├─ Document Intelligence Agent (OCR + Computer Vision)
    ├─ Mock DigiLocker Service (Internal API)
    ├─ Identity Verification Agent
    ├─ Employment History Agent
    ├─ Fraud Analytics Agent
    └─ Audit & Compliance Agent
    ↓
PostgreSQL + Redis + MinIO Storage
```

## 🛠️ Tech Stack

### Backend
- FastAPI 0.104+
- Pydantic 2.5+
- LangGraph/CrewAI (Multi-agent orchestration)
- SQLAlchemy + asyncpg
- aioredis
- httpx

### ML/Computer Vision
- PyTorch
- OpenCV
- Tesseract/EasyOCR

### Frontend
- React 18 / Next.js 14
- TypeScript
- TailwindCSS
- EventSource (SSE)

### Infrastructure
- Docker Compose
- PostgreSQL 16
- Redis 7
- MinIO (S3-compatible storage)

## 📋 Micro Tasks Breakdown

### Phase 1: Project Setup & Infrastructure (Day 1)

#### Task 1.1: Environment Setup
- [ ] Initialize Git repository
- [ ] Create project directory structure
- [ ] Setup Python virtual environment
- [ ] Install core dependencies from requirements.txt
- [ ] Create .env.example file with all required variables
- [ ] Setup .gitignore for Python, Node, and Docker

#### Task 1.2: Docker Infrastructure
- [ ] Create Dockerfile for FastAPI backend
- [ ] Create Dockerfile for React frontend
- [ ] Write docker-compose.yml with all services
- [ ] Configure PostgreSQL service with initialization scripts
- [ ] Configure Redis service
- [ ] Configure MinIO service with default buckets
- [ ] Test docker-compose up and verify all services

#### Task 1.3: Database Setup
- [ ] Design and create SQLAlchemy models for VerificationRun
- [ ] Design and create SQLAlchemy models for ConsentSession
- [ ] Design and create SQLAlchemy models for Evidence
- [ ] Design and create SQLAlchemy models for AgentEvent
- [ ] Design and create SQLAlchemy models for AuditRecord
- [ ] Create Alembic migration scripts
- [ ] Write database initialization script
- [ ] Add indexes for performance optimization

### Phase 2: Backend Core (Day 2-3)

#### Task 2.1: FastAPI Application Structure
- [ ] Create main FastAPI application with CORS middleware
- [ ] Setup dependency injection for database sessions
- [ ] Create base response models with Pydantic
- [ ] Implement error handling middleware
- [ ] Setup logging configuration
- [ ] Create health check endpoint
- [ ] Implement JWT authentication middleware

#### Task 2.2: Redis Cache Layer
- [ ] Setup Redis connection pool
- [ ] Create cache utilities for session management
- [ ] Implement cache invalidation strategies
- [ ] Add cache decorators for frequently accessed data

#### Task 2.3: Storage Layer (MinIO)
- [ ] Setup MinIO client connection
- [ ] Create document upload utilities
- [ ] Implement secure document retrieval
- [ ] Add document deletion with 30-day TTL
- [ ] Create presigned URL generation for secure access

### Phase 3: Mock DigiLocker Service (Day 3-4)

#### Task 3.1: Mock DigiLocker Service Implementation
- [ ] Create mock DigiLocker service class
- [ ] Design realistic document templates (Aadhaar, PAN, etc.)
- [ ] Implement mock session creation with UUID
- [ ] Create simulated authentication flow (auto-approve after delay)
- [ ] Generate mock documents with realistic data
- [ ] Add digital signature simulation
- [ ] Implement document versioning and metadata
- [ ] Create test data generator for various scenarios

#### Task 3.2: Mock Document Database
- [ ] Create in-memory document store
- [ ] Add pre-seeded valid documents (10+ samples)
- [ ] Add pre-seeded fraudulent documents (5+ samples)
- [ ] Implement document retrieval by user ID
- [ ] Add document templates (Aadhaar, PAN, Driving License, Passport)
- [ ] Create utility to generate random valid documents
- [ ] Add mock EPFO employment records

#### Task 3.3: Consent Flow APIs
- [ ] POST /api/v1/consents/session - Initiate mock DigiLocker session
- [ ] GET /api/v1/consents/session/{id}/status - Return simulated auth status
- [ ] POST /api/v1/consents/session/{id}/docs - Fetch mock documents
- [ ] Add realistic delay simulation (500ms-2s)
- [ ] Implement session expiry handling (30 min TTL)
- [ ] Add request/response validation
- [ ] Create Postman collection for testing

#### Task 3.4: Realistic Data Generation
- [ ] Generate valid Aadhaar numbers (with proper checksum)
- [ ] Generate valid PAN numbers (pattern: ABCDE1234F)
- [ ] Create realistic names, addresses, dates
- [ ] Generate mock photos for identity documents
- [ ] Create consistent data across document types
- [ ] Add edge cases (expired docs, mismatched info)
- [ ] Implement fraud patterns (tampered dates, fake signatures)

### Phase 4: Multi-Agent Orchestrator (Day 4-6)

#### Task 4.1: LangGraph State Machine
- [ ] Install and configure LangGraph
- [ ] Define verification state schema
- [ ] Implement state transitions (CREATED → COMPLETED)
- [ ] Create state persistence to database
- [ ] Add state machine visualization utilities

#### Task 4.2: Agent Base Class
- [ ] Create abstract BaseAgent class
- [ ] Implement input/output validation
- [ ] Add execution timing and metrics
- [ ] Create agent error handling
- [ ] Implement agent logging with context

#### Task 4.3: Document Intelligence Agent
- [ ] Setup Tesseract/EasyOCR for OCR
- [ ] Implement text extraction from images/PDFs
- [ ] Add forgery detection using Computer Vision
- [ ] Implement ELA (Error Level Analysis)
- [ ] Create confidence scoring logic
- [ ] Write unit tests with sample documents

#### Task 4.4: DigiLocker Orchestrator Agent
- [ ] Integrate mock DigiLocker service
- [ ] Implement document fetching logic
- [ ] Add document validation
- [ ] Verify mock digital signatures
- [ ] Store documents in MinIO
- [ ] Simulate realistic API latency

#### Task 4.5: Identity Verification Agent
- [ ] Parse Aadhaar data from documents
- [ ] Parse PAN data from documents
- [ ] Cross-match data fields
- [ ] Flag inconsistencies
- [ ] Calculate identity confidence score
- [ ] Generate verification report

#### Task 4.6: Employment History Agent
- [ ] Extract employment data from documents
- [ ] Validate employment dates
- [ ] Check EPFO-style data (if available)
- [ ] Cross-reference with provided claims
- [ ] Calculate employment verification score
- [ ] Generate discrepancy report

#### Task 4.7: Fraud Analytics Agent
- [ ] Implement duplicate document detection
- [ ] Create risk scoring algorithm
- [ ] Add pattern detection for common fraud types
- [ ] Check against fraud database
- [ ] Calculate overall risk score
- [ ] Generate fraud indicators report

#### Task 4.8: Audit & Compliance Agent
- [ ] Generate comprehensive verification report
- [ ] Create SHA-256 hash of audit trail
- [ ] Implement report signing
- [ ] Generate PDF report
- [ ] Store audit record in database
- [ ] Add blockchain anchor (optional)

#### Task 4.9: Parallel Execution Orchestrator
- [ ] Implement parallel agent execution
- [ ] Add timeout handling for agents
- [ ] Implement result aggregation logic
- [ ] Create decision engine (PASS/FAIL/REVIEW)
- [ ] Calculate overall confidence score
- [ ] Handle partial failures gracefully

### Phase 5: Verification APIs (Day 6-7)

#### Task 5.1: Verification Endpoints
- [ ] POST /api/v1/verify-runs - Start verification
- [ ] GET /api/v1/verify-runs/{id} - Get progress
- [ ] GET /api/v1/verify-runs/{id}/stream - SSE real-time updates
- [ ] GET /api/v1/reports/{id} - Final report + PDF
- [ ] Add request validation and sanitization
- [ ] Implement proper error responses

#### Task 5.2: Server-Sent Events (SSE)
- [ ] Create SSE endpoint for real-time updates
- [ ] Implement event streaming from agent execution
- [ ] Add heartbeat mechanism
- [ ] Handle client disconnections
- [ ] Test SSE with multiple concurrent clients

#### Task 5.3: Report Generation
- [ ] Create report template
- [ ] Implement PDF generation with ReportLab/WeasyPrint
- [ ] Add charts and visualizations
- [ ] Include agent execution timeline
- [ ] Add audit hash and signature
- [ ] Implement report caching

### Phase 6: Frontend Development (Day 7-9)

#### Task 6.1: React Project Setup
- [ ] Initialize React/Next.js project
- [ ] Setup TypeScript configuration
- [ ] Install and configure TailwindCSS
- [ ] Create component library structure
- [ ] Setup routing
- [ ] Configure API client with axios

#### Task 6.2: Dashboard UI Components
- [ ] Create main dashboard layout
- [ ] Build candidate submission form
- [ ] Implement document upload component
- [ ] Create progress tracker component
- [ ] Build agent status cards
- [ ] Design result display component

#### Task 6.3: Real-time Updates
- [ ] Implement EventSource for SSE
- [ ] Create real-time progress bars
- [ ] Add agent status indicators
- [ ] Implement live log streaming
- [ ] Handle reconnection logic

#### Task 6.4: Report Viewer
- [ ] Create report display component
- [ ] Implement PDF viewer
- [ ] Add download functionality
- [ ] Display confidence scores with charts
- [ ] Show agent execution timeline

#### Task 6.5: Fraud Detection Demo
- [ ] Create fraud scenario toggle
- [ ] Implement fake document upload
- [ ] Show FAIL detection in real-time
- [ ] Display fraud indicators clearly

### Phase 7: Testing & Quality Assurance (Day 9-10)

#### Task 7.1: Unit Tests
- [ ] Write tests for all agent classes
- [ ] Test database models and CRUD operations
- [ ] Test API client classes
- [ ] Test utility functions
- [ ] Achieve >80% code coverage

#### Task 7.2: Integration Tests
- [ ] Test complete DigiLocker flow
- [ ] Test multi-agent orchestration
- [ ] Test database transactions
- [ ] Test Redis caching
- [ ] Test MinIO storage operations

#### Task 7.3: E2E Tests
- [ ] Test complete verification flow
- [ ] Test SSE streaming
- [ ] Test report generation
- [ ] Test fraud detection scenario
- [ ] Test concurrent verification runs

#### Task 7.4: Performance Testing
- [ ] Load test with 50+ concurrent runs
- [ ] Measure P95 latency
- [ ] Test SSE with multiple clients
- [ ] Measure agent execution times
- [ ] Optimize bottlenecks

### Phase 8: Security & Compliance (Day 10)

#### Task 8.1: Security Implementation
- [ ] Implement AES-256 encryption for PII
- [ ] Add TLS 1.3 configuration
- [ ] Implement JWT token generation and validation
- [ ] Add PII redaction in logs
- [ ] Implement document TTL (30 days)
- [ ] Add rate limiting on APIs

#### Task 8.2: Audit Trail
- [ ] Log all verification runs
- [ ] Track all document accesses
- [ ] Store agent execution history
- [ ] Implement immutable audit logs
- [ ] Add audit report generation

### Phase 9: Demo Preparation (Day 11)

#### Task 9.1: Test Data Seeding
- [ ] Create sample candidate data
- [ ] Generate test documents (valid)
- [ ] Generate test documents (fraudulent)
- [ ] Seed database with test data
- [ ] Create one-click demo scenarios

#### Task 9.2: Demo Script
- [ ] Prepare 8-minute demo flow
- [ ] Create presentation slides
- [ ] Setup demo environment
- [ ] Test complete demo flow
- [ ] Prepare backup scenarios

#### Task 9.3: Documentation
- [ ] Write API documentation (OpenAPI/Swagger)
- [ ] Create deployment guide
- [ ] Write user manual
- [ ] Document agent behaviors
- [ ] Create troubleshooting guide

### Phase 10: Deployment & Final Polish (Day 12)

#### Task 10.1: Deployment
- [ ] Setup production environment variables
- [ ] Deploy with Docker Compose
- [ ] Configure reverse proxy (Nginx)
- [ ] Setup SSL certificates
- [ ] Configure monitoring and logging

#### Task 10.2: Monitoring
- [ ] Add Prometheus metrics
- [ ] Setup Grafana dashboards
- [ ] Configure alerting
- [ ] Add application logging
- [ ] Setup error tracking (Sentry)

#### Task 10.3: Final Testing
- [ ] Full system test
- [ ] Performance validation
- [ ] Security audit
- [ ] Demo rehearsal
- [ ] Bug fixes and polish

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/HIRU-VIRU/VerifyX-AI.git
cd VerifyX-AI
```

2. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start with Docker Compose**
```bash
docker-compose up --build
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Manual Setup (Development)

#### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📊 API Documentation

### Consent Flow
```
POST   /api/v1/consents/session          - Initiate DigiLocker session
GET    /api/v1/consents/session/{id}/status - Check authentication status
POST   /api/v1/consents/session/{id}/docs - Fetch documents
```

### Verification
```
POST   /api/v1/verify-runs                - Start verification
GET    /api/v1/verify-runs/{id}          - Get verification progress
GET    /api/v1/verify-runs/{id}/stream   - Real-time SSE updates
GET    /api/v1/reports/{id}               - Download final report
```

## 🧪 Testing

### Run Unit Tests
```bash
pytest tests/unit -v --cov=app
```

### Run Integration Tests
```bash
pytest tests/integration -v
```

### Run E2E Tests
```bash
pytest tests/e2e -v
```

## 🎬 Demo Flow (8 minutes)

1. **Problem Statement** (1 min) - Show 20 days → 5 seconds
2. **Submit Candidate** (1 min) - Upload docs, click verify
3. **Live Agent Execution** (5 min) - Show 6 agents running in parallel
4. **Final Report** (30 sec) - Display 97% confidence, audit hash
5. **Fraud Scenario** (30 sec) - Submit fake docs, show FAIL detection

## 🔒 Security

- AES-256 encryption for PII at rest
- TLS 1.3 for external APIs
- JWT authentication
- PII redaction from logs
- 30-day document retention policy

## 🎯 Acceptance Criteria

- ✅ Complete mocked DigiLocker flow (initiate → status → fetch)
- ✅ All 6 agents run in parallel with real-time events
- ✅ P95 verification time < 120 seconds
- ✅ Fraud scenario triggers FAIL with rationale
- ✅ Dashboard shows live agent progress via SSE
- ✅ Generate signed PDF report with audit hash

## 🤝 Contributing

This is a hackathon project. Feel free to fork and experiment!

## 📄 License

MIT License

## 👥 Team

VerifyX AI Team

---

**Version:** 1.0 | **Status:** Ready for Implementation