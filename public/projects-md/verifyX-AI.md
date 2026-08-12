<div align="center">

# 🛡️ VerifyX-AI

### _Privacy-Preserving Identity Verification & Liveness Detection_

**Hackathon Submission**

> _"Design an end-to-end, privacy-preserving identity verification system combining multi-modal liveness detection, W3C Verifiable Credentials, and Zero-Knowledge age proofs to guarantee user authenticity without compromising raw personal data."_

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React Native](https://img.shields.io/badge/React_Native-Expo-61DAFB?logo=react&logoColor=white)](https://expo.dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![SnarkJS](https://img.shields.io/badge/SnarkJS-Circom-FF6F00)](#)
[![PyTorch](https://img.shields.io/badge/PyTorch-DL_Models-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org)

</div>

---

VerifyX-AI is an end-to-end, privacy-preserving identity verification and liveness detection system. Built with zero-knowledge proofs (ZKPs), verifiable credentials (W3C standard), and advanced deep learning ensemble models, it guarantees high assurance of user authenticity without compromising privacy. 

The architecture encompasses a scalable FastAPI backend, a cross-platform React Native/Expo mobile wallet, a Zero-Knowledge circuit layer (Circom), and a Next.js Relying Party demonstration application.

## 🌟 Key Features & Innovations

### 1. Multi-Modal Liveness & Deepfake Detection
Unlike standard single-model solutions, VerifyX-AI employs a highly robust dual-model ensemble strategy. Both models operate completely offline/locally for maximized privacy and speed:
- **Silent-Face-Anti-Spoofing (MiniFASNet)**: Handles passive liveness detection, immediately catching 2D print attacks, screen replays, and physical mask overlays.
- **Deepfake Classifier (HuggingFace SigLIP)**: Synthesizes high-dimensional facial embeddings to identify AI-generated or manipulated video/image injections.
*Both deep learning pipelines must independently agree and authorize the session before enrollment progresses.*

### 2. Zero-Knowledge Proofs (ZK) for Age Verification
We leverage **Circom** and **SnarkJS (Groth16)** to allow users to prove they meet platform requirements (e.g., Age >= 18) without ever revealing their actual Date of Birth.
- The cryptographic proof is generated entirely **on-device** inside the mobile app.
- The backend merely verifies the mathematical validity of the proof along with the public current-year signal.

### 3. W3C Verifiable Credentials (JWT-VC)
Identities are formalized into secure **Verifiable Credentials** strictly adhering to W3C standards:
- Formatted as `JWT-VC` (JSON Web Token Verifiable Credentials).
- Signed securely with `did:key` utilizing the `Ed25519` curve.
- Allows fully decentralized, offline verification of claims via seamless QR code sharing.

### 4. Advanced Anomaly Detection Engine
A continuous rule-based scanning system catches coordinated bot attacks and multiple-account abuse:
- Tracks device fingerprints across sessions.
- Flags duplicate IPs and sub-minute burst enrollments.
- Outputs a weighted fraud score via an anomaly evaluation algorithm.
- **Visual Analytics:** The admin dashboard visualizes these clustered fraud rings via interactive D3 force-directed anomaly graphs.

### 5. On-Device Secure Enclave Storage
The mobile application maps securely parsed credentials straight into the native Keystore/Keychain environments of iOS and Android using `expo-secure-store`. Credentials never sit exposed in plain-text configuration.

---

## 🏗️ System Architecture

VerifyX-AI's codebase is structurally split into 4 core domain boundaries:

### Backend (`/backend`)
A high-performance **FastAPI** service serving as the central Issuer and global Verifier components.
- **Tech Stack:** Python, FastAPI, Uvicorn, PyTorch/Transformers (for DL models).
- **Core Responsibilities:** Processing multipart liveness frame uploads, evaluating Deepfake inferences, signing scalable VC tokens utilizing Ed25519, verifying ZK proofs securely, and assigning fraud anomaly scores.

### Mobile Application (`/mobile`)
A **React Native (Expo)** cross-platform Digital Identity Wallet.
- **Tech Stack:** React Native, Expo Router.
- **Core Responsibilities:** Acquiring camera streams organically, generating on-device ZK proofs via a secure SnarkJS webview pipeline setup, managing robust local wallet state management, and projecting high-fidelity QR codes connecting data from issuer -> holder -> verifier. 

### Relying Party Mock (`/mock-cryptox`)
A **Next.js** web application portal simulating a high-risk onboarding flow platform.
- **Tech Stack:** Next.js (App Router), Tailwind CSS.
- **Core Responsibilities:** Mock onboarding workflows processing verifiable credential artifacts securely and requesting algebraic ZK age proofs over integrated endpoints, along with visualizing real-time platform risk telemetry in the admin dashboard.

### ZK Circuits (`/circuits`)
The cryptographic deterministic constraints engine formatting polynomial proof commitments structure.
- **Tech Stack:** Circom, SnarkJS.
- **Core Responsibilities:** R1CS constraint processing allowing privacy-preserving constraints solving dynamically parametrized requirements.

---

## ⚙️ Local Setup & Installation

### Backend (FastAPI)
```bash
cd backend
# Recommended: Create a virtual environment using 'uv' or 'pip'
uv venv && source .venv/bin/activate
uv pip install -r requirements.txt

# Run the API server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
> *Ensure your deep-learning models (MiniFASNet and SigLIP) are cached locally in `~/.cache/huggingface` before startup to ensure secure and air-gapped demo environments.*

### Mobile Wallet (Expo/React Native)
```bash
cd mobile
npm install

# Start the Expo Metro Bundler
npx expo start

# Build Targets Setup
# Press 'a' for Android emulator
# Press 'i' for iOS simulator
```

### Mock Exchange App (Next.js)
```bash
cd mock-cryptox
npm install

# Start the local development web server
npm run dev
```

### ZK Circuit Compilation (Optional/Development)
The project comes with pre-compiled `.wasm`, `.zkey`, and `verification_key.json` files. If you need to natively recompile the `age_check` logic definitions:
```bash
cd circuits
circom age_check.circom --r1cs --wasm --sym
snarkjs powersoftau new bn128 12 pot12_0000.ptau
snarkjs groth16 setup age_check.r1cs pot12_final.ptau age_check_final.zkey
```

---

## 🔐 Core Verification Workflows

The platform coordinates through a highly-decoupled architecture:
1. **Liveness Evaluation Phase:** The mobile application requests local camera feeds, capturing liveness frames. `POST /liveness/analyze` uploads this data against both neural DL pipelines ensuring no physical/algorithmic attacks bypass the threshold.
2. **VC Protocol Engine Phase:** `POST /vc/issue` handles authorized valid sessions, building an encapsulated W3C compliant signed token validating verifiable identity parameters persistently formatted as a JWT string.
3. **Zero Knowledge Generation:** Based on the Verifiable Credential constraints, SnarkJS generates parameterized validity tokens (`age >= 18`) confirming policy configurations completely isolated on the mobile unit's computational boundary.
4. **Third-Party Evaluation:** Web platforms securely validate cryptographic representations (`POST /zk/verify-proof`) confirming properties transparently.
5. **Anomaly Evaluation Engine Context:** Fraud pipelines simultaneously categorize telemetry signals monitoring IP, DeviceFP, and session velocities against dynamic models.

---
*VerifyX-AI — Because authenticating humanity shouldn't require compromising privacy.*

---

## Connect With Us  

Team members  | Connect  
------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------  
GAUTHAM KRISHNA S  | [<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/heyitsgautham/)
HIRUTHIK SUDHAKAR | [<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/hiruthik-sudhakar/)
KISHORE B     |  [<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/kishorebalamurugan/) 
