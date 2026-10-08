# Problem Statement 05

## Problem Title

Knowledge Fragmentation and Retrieval Failure in Document-Heavy MSME Operations Due to Lack of Affordable Intelligent Document Systems

## Sector / Domain

**Primary:** MSME
**Secondary:** AI & ML

## Problem Summary / Elevator Pitch

Micro, Small, and Medium Enterprises (MSMEs) build up operational knowledge across thousands of unstructured documents: contracts, invoices, compliance records, technical manuals, correspondence, and reports. But they lack affordable systems to search, retrieve, and reason across this information. Critical business decisions get delayed or made with incomplete information because the right documents simply cannot be found, cross-referenced, or pulled together efficiently. Institutional knowledge ends up trapped in inaccessible file stores.

## Background & Context

India's MSME sector is vast, contributing significantly to GDP, exports, and employment. Tamil Nadu is among the leading states for MSME activity, with clusters in manufacturing (auto components, textiles, leather), IT services, and trading.

As MSMEs grow beyond the founder-managed stage, their document volumes explode: supplier contracts, purchase orders, quality certificates, tax filings, compliance documents, technical specifications, customer correspondence, and internal reports. These accumulate in a messy mix of physical files, email attachments, shared drives, and cloud storage folders with inconsistent naming and no systematic indexing.

When a business decision needs information from these documents, say, verifying contract terms during a supplier negotiation, locating a compliance certificate for an audit, or checking specifications from a past project, employees resort to manual searching, basic keyword searches in the file system, or simply asking colleagues who might remember where something is stored. This process is unreliable, slow, and entirely dependent on individual memory.

The problem gets worse with employee turnover. When a knowledgeable person leaves, the institutional knowledge about document locations and contents walks out the door with them.

## Problem Definition

The core problem is that MSMEs cannot effectively retrieve, cross-reference, or synthesise information from their own document repositories. Their documents are unstructured, scattered across multiple storage systems, and not semantically indexed. Keyword search fails because business questions rarely use the exact terminology found in documents, and the same concept may be worded differently across document types.

This persists because:
- Enterprise document management systems and knowledge bases are built for large organisations, priced accordingly, and too complex for MSMEs to operate.
- Simple file-sharing tools (Google Drive, Dropbox, email) offer basic keyword search but no semantic understanding, no cross-document reasoning, and no question-answering ability.
- Building and maintaining a structured knowledge base requires dedicated IT staff that most MSMEs do not have.
- The shift from physical to digital documents is incomplete in many MSMEs. Scanned PDFs and image-based documents need OCR before they can even be searched.
- Handling multiple document formats (PDF, DOCX, Excel, scanned images) adds technical complexity that generic search tools do not address.

The consequences are very real: contract terms get misremembered, compliance deadlines are missed because the relevant document cannot be found in time, specifications from past projects cannot be reused, and due diligence for business decisions (partnerships, investments, expansions) is incomplete because the relevant information is scattered everywhere.

## Key Challenges / Pain Points

- **Multi-format ingestion:** MSMEs keep information in PDF, DOCX, XLSX, scanned images, emails, and even physical files. Any retrieval system needs to handle all of this.
- **Semantic search requirement:** Business questions (like "What payment terms did we agree with supplier X?") rarely match document text word-for-word. Semantic understanding is essential.
- **Cross-document reasoning:** Answering a business question often means pulling together information from multiple documents (a contract plus an amendment plus an invoice, for example).
- **Accuracy and traceability:** When a system gives an answer, the user needs to be able to check it against the source document. Answers that cannot be traced back to a source destroy trust.
- **Cost constraints:** MSMEs operate on tight budgets. The solution cannot require expensive cloud infrastructure, specialised hardware, or enterprise software licenses.
- **Data privacy:** MSMEs handle sensitive business information (contracts, financial records). Solutions that require uploading everything to third-party cloud services raise legitimate privacy concerns.

## Stakeholders Affected

- MSME owners and managing directors making operational and strategic decisions
- Finance and accounts teams handling invoices, tax filings, and compliance documents
- Operations and procurement teams managing supplier contracts and specifications
- Legal and compliance staff responsible for regulatory document management
- New employees who join the organisation and need to access institutional knowledge
- Industry associations and government MSME support agencies

## Justification / Need for Solution

India's policy push toward MSME formalisation and digital transformation (Udyam registration, GST compliance, Digital India initiatives) is increasing the volume of documents that MSMEs must manage. The transition from informal to formal operations generates compliance, financial, and operational documents at a rate that manual management simply cannot keep up with.

At the same time, advances in retrieval-augmented generation (RAG), vector databases, and document processing pipelines have made it technically feasible to build intelligent document systems at a fraction of the cost of traditional enterprise solutions. The convergence of these two trends, increasing document volume and decreasing technology cost, creates a real opportunity to solve a problem that has historically been seen as an enterprise-only concern.

Enabling MSMEs to search, retrieve, and reason across their own documents would speed up decision-making, reduce compliance risks, preserve institutional knowledge through employee transitions, and support more informed business negotiations.

## Existing Solutions & Gaps

**Enterprise document management systems (SharePoint, M-Files, DocuWare):** Comprehensive but built for large organisations. Licensing costs, IT administration requirements, and implementation complexity put them out of reach for MSMEs.

**Cloud storage with search (Google Drive, Dropbox):** Affordable and accessible, but they only offer keyword search. No semantic understanding, no cross-document reasoning, and no question-answering capability.

**Generic AI chatbots:** Can answer general questions, but without ingesting and indexing the specific MSME's own documents, they have no access to the organisation's actual information and may generate inaccurate responses.

The specific gap: no affordable system exists that ingests an MSME's multi-format documents, creates a semantic index with vector embeddings, enables natural-language question-answering with source citations traceable to specific document locations, and works within MSME cost and infrastructure constraints.

## Type of Innovation

- Product
- Technology

## SDG Alignment

- **SDG 8, Decent Work and Economic Growth:** Improving MSME operational efficiency directly supports economic growth and the quality of employment these enterprises provide.
- **SDG 9, Industry, Innovation and Infrastructure:** Bringing intelligent document retrieval to the MSME segment addresses the digital infrastructure gap between large enterprises and small businesses.

## Target Beneficiaries

MSME owners and operators, finance and compliance staff in MSMEs, procurement and operations teams, industry clusters and MSME associations, and government agencies supporting MSME digitalisation programmes in Tamil Nadu and across India.

## Source of Problem

This problem was identified through the development of two enterprise-grade document intelligence systems. The first used a RAG architecture with PostgreSQL pgvector for vector search, asynchronous document processing pipelines, and LLM-powered question-answering with real-time citations. The second was an agentic RAG system for financial due diligence that processes thousands of pages across multiple document types with multi-hop reasoning, source citations, and confidence scoring. Both projects demonstrated the technical feasibility of intelligent document retrieval with traceable answers, while also highlighting how these capabilities (semantic search, cross-document synthesis, cited responses) address needs that are acutely felt in document-heavy MSME operations but remain completely unserved by affordable tools.

## Geographic Relevance

State, Tamil Nadu (with National applicability)

## Expected Outcome

- Faster document retrieval during day-to-day business operations
- Better decision quality through access to complete, cross-referenced information
- Lower compliance risk from missed or mislocated regulatory documents
- Institutional knowledge preserved regardless of individual employee tenure
- Natural-language access to document contents with source citations for verification
- Affordable deployment that fits within MSME budgets and infrastructure realities
