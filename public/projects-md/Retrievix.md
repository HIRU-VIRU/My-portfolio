# Retrievix - AI Document Intelligence Platform

Retrievix is an enterprise-grade AI Document Intelligence Platform built with **C#**, **.NET 8**, and **ASP.NET Core Web API**. It is designed around **Clean Architecture**, leveraging **Entity Framework Core**, **PostgreSQL** with `pgvector` for robust vector search, and **Google Cloud Vertex AI** for state-of-the-art embeddings and LLM generations (Gemini 2.5/3.5 Flash).

It also features a beautiful, dynamic **Next.js (React)** frontend for seamless interactions.

## 🌟 Key Features

- **Multi-Format Document Ingestion**: Upload PDF, DOCX, and TXT files securely.
- **Asynchronous Processing Pipeline**: Background processing, chunking, and embedding generation via `Channel<T>` and `BackgroundService`.
- **Advanced Vector Search**: High-performance semantic similarity search using PostgreSQL and `pgvector` (HNSW index).
- **Retrieval-Augmented Generation (RAG)**: Highly accurate context-aware Q&A using Vertex AI Gemini Models with real-time UI citations.
- **Deduplication & Caching**: Smart content-hashing for deduplication and StackExchange.Redis caching.
- **Metrics & Observability**: Structured JSON logging (Serilog) with Correlation IDs and pipeline telemetry.
- **Premium User Interface**: Dark-mode Next.js frontend built with Tailwind CSS v4 and Framer Motion, featuring document status indicators and hover-to-view citations.

## 🏗️ Architecture

The backend strictly follows Clean Architecture and SOLID principles:

- **Domain**: Core entities (`Document`, `Chunk`), value objects (`ContentHash`), and enums.
- **Application**: Interfaces, DTOs, and orchestrating services (`DocumentService`, `ChatService`).
- **Infrastructure**: Implementations of EF Core context, Vertex AI clients, Redis cache, Postgres pgvector search, and file parsing (OpenXml, PdfPig).
- **Api**: REST Controllers, Custom Middlewares (API Key Auth, Global Exception Handling, Request Timing), and DI composition root.
- **Frontend**: Next.js App Router providing a seamless chat and document management interface.

## 🚀 Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/)
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) (Configured for ADC)

### 1. Authenticate with Google Cloud
Ensure your local environment has Application Default Credentials (ADC) for Vertex AI:
```bash
gcloud auth application-default login
gcloud config set project your-gcp-project-id
```

### 2. Start Infrastructure
Launch the PostgreSQL (with pgvector) and Redis containers:
```bash
docker-compose up -d
```

### 3. Run the .NET 8 Backend
Navigate to the API folder, ensure migrations are applied, and run the server. It will automatically run on `http://localhost:5287`.
```bash
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$PATH:$HOME/.dotnet:$HOME/.dotnet/tools

cd src/Retrievix.Api
dotnet run
```
*Note: A default API Key (`dev-api-key`) is configured in `appsettings.json`.*

### 4. Run the Next.js Frontend
In a new terminal window, start the user interface:
```bash
cd frontend
npm install
npm run dev
```
Navigate to **`http://localhost:3000`** in your browser.

## 💡 Usage Guide

1. **Upload**: Use the left sidebar in the UI to upload a `.pdf`, `.docx`, or `.txt` file.
2. **Index**: The backend parses the file into overlapping chunks, generates 768-dimensional embeddings via `text-embedding-004`, and indexes them in PostgreSQL. The UI will show a green dot when processing completes.
3. **Chat**: Type a question in the main chat area. The backend searches the vector space for the most relevant chunks and prompts Gemini Flash for an answer.
4. **Citations**: The AI response includes citation badges. Hover over them to see the exact text chunks used to generate the answer.

## 🧪 Testing
The project includes a robust xUnit testing suite using Moq and FluentAssertions.
```bash
dotnet test
```

## 📦 Deployment
The backend includes a `Dockerfile` optimized for Google Cloud Run deployment, and GitHub Actions workflows are predefined for CI/CD.
