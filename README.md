# Krishi Doctor AI — স্মার্ট কৃষি ডাক্তার
> **AI-Powered Mobile-First Agricultural Assistance Platform for Farmers in Bangladesh**

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/frontend-React%20%7C%20TypeScript%20%7C%20TailwindCSS-emerald)](package.json)
[![Backend](https://img.shields.io/badge/backend-FastAPI%20%7C%20Node.js%20Express-teal)](backend/)
[![AI Models](https://img.shields.io/badge/AI-Meta%20Model%20API%20%7C%20Gemini%20Vision-orange)](#7-exact-meta-model-and-its-role)

---

## 1. Project Overview & Video Demo
**Krishi Doctor AI (স্মার্ট কৃষি ডাক্তার)** is a production-grade, mobile-first agricultural assistance application built specifically for farmers in Bangladesh. Available in both **Bengali (বাংলা - Default)** and **English**, the application enables farmers to snap or upload leaf photos, visually localize affected disease lesions with interactive grounding masks, receive scientifically verified Department of Agricultural Extension (DAE) treatments, find certified nearby agricultural input shops, and monitor real-time weather spray advisories.

- **Demo Video Walkthrough (2-3 Minutes):** `[https://youtu.be/PLACEHOLDER_DEMO_VIDEO]` *(Replace with your recorded walkthrough link)*
- **Live Development URL:** `https://ais-dev-bqlgngxrngq5wgt75c7bsc-856905588490.asia-east1.run.app`

---

## 2. Problem Statement
In Bangladesh, smallholder farmers lose 15%–30% of their annual crop yields (rice, potatoes, tomatoes, vegetables) to fungal, bacterial, viral, and pest infestations. Farmers often lack direct access to plant pathologists, leading to:
1. **Misdiagnosis:** Mistaking fungal blight for nutrient deficiency or virus for insect damage.
2. **Indiscriminate Pesticide Overuse:** Spraying unverified cocktail chemicals without personal protective equipment (PPE) or observing Pre-Harvest Intervals (PHI).
3. **Pesticide Wastage Due to Rain:** Spraying immediately before downpours, washing expensive chemicals into water bodies.
4. **Counterfeit / Unknown Inputs:** Inability to find verified BADC/DAE certified dealers nearby.

---

## 3. Target Users & Intended Impact
- **Primary Users:** Smallholder and commercial farmers across all 64 districts and 8 divisions of Bangladesh.
- **Secondary Users:** Sub-Assistant Agriculture Officers (SAAO / উপ-সহকারী কৃষি কর্মকর্তা), agricultural extension agents, and input retailers.
- **Intended Impact:** Reduce crop loss by up to 25%, minimize pesticide toxicity and groundwater contamination, and boost farmer income through early detection.

---

## 4. Main Features
1. **AI Plant Doctor & Symptom Input:** Multimodal crop identification for major Bangladeshi crops (Rice, Potato, Tomato, Eggplant, Wheat, Maize, Chili, Onion, Mango, etc.).
2. **Visual Lesion Grounding & Highlighting (Mandatory Feature 8):** Overlays 2D bounding masks `[ymin, xmin, ymax, xmax]` directly onto affected leaf spots with zoom and before/after views.
3. **DAE-Compliant Safe Treatments:** Strict three-tiered treatment plan: (1) Cultural & environmental, (2) Biological control (e.g. Trichoderma, neem extract), (3) Verified chemical treatments with registered active ingredients, protective gear warnings, and **zero fabricated dosages**.
4. **Live Camera Capture & Image Quality Helper:** Mobile-first rear camera viewfinder (`facingMode: 'environment'`) with sharpness warnings.
5. **Nearby Agricultural Medicine Shops & Directions:** Real verified directory of agricultural input dealers across Bangladesh with Haversine distance, travel time, and direct Google Maps navigation links.
6. **Live 4-Day Weather & Spray Feasibility (Open-Meteo):** Real temperature, rain probability, humidity, and an agricultural advisory engine that calculates whether weather is suitable for spraying.
7. **Visual Soil & Land Analysis:** Observable surface texture and moisture analysis with strict disclaimers and Soil Resource Development Institute (SRDI) test advice.
8. **Plant Care Calendar:** 14-day milestone recovery timeline with task checkoffs and custom notes.
9. **Local Diagnosis History & Reports:** Offline-capable browser storage with print/PDF export.

---

## 5. System Architecture
```
                         +-----------------------------------+
                         |      Farmer Mobile / Browser      |
                         |   (React 19 + TypeScript + TW4)   |
                         +-----------------+-----------------+
                                           |
                                  HTTPS / REST API
                                           |
                         +-----------------v-----------------+
                         |         Full-Stack Gateway        |
                         |  (Express on Node.js / FastAPI)   |
                         +--------+--------+--------+--------+
                                  |        |        |
            +---------------------+        |        +--------------------+
            |                              |                             |
+-----------v-----------+      +-----------v-----------+     +-----------v-----------+
|    Meta Model API     |      |  Google Gemini Vision |     |    Open-Meteo API     |
| (https://api.meta.ai) |      | (gemini-3.8-flash)    |     | (Live Weather Engine) |
|   muse-spark-1.3      |      | Vision & Grounding    |     | 4-Day Forecast        |
+-----------------------+      +-----------------------+     +-----------------------+
```

---

## 6. Technology Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
- **Backend (Full-Stack Node):** Node.js 22, Express 4.21, `@google/genai` TypeScript SDK.
- **Backend (Python FastAPI Standalone):** Python 3.11+, FastAPI 0.110, Pydantic v2, HTTPX, Pytest (located in `/backend`).
- **Weather API:** Open-Meteo Global Forecasting Service.
- **Maps Integration:** Google Maps Platform / OpenStreetMap Geolocation.

---

## 7. Exact Meta Model and Its Role
- **Model Endpoint:** `https://api.meta.ai/v1` (OpenAI SDK compatible protocol).
- **Target Model Identifier:** `muse-spark-1.3` / `llama-3.2-11b-vision-instruct`.
- **Role in Application:** Ingests the farmer's leaf image and Bengali symptom prompt to output structured pathology predictions, affected lesion coordinates, and cultural disease management steps.
- **Authentication:** `Bearer ${META_MODEL_API_KEY}` stored exclusively in server environment variables.

---

## 8. Model Fallback Explanation
To ensure uninterrupted service and zero fabricated results:
- If `META_MODEL_API_KEY` is not supplied or the service is temporarily unavailable, the system transparently utilizes **Google Gemini 3.8 Flash** via the official server-side `@google/genai` SDK.
- The UI transparently displays the exact provider name (`Meta Model API` vs `Google Gemini`) on every diagnosis card.
- A Gemini result is never falsely labeled as Meta, and vice versa.

---

## 9. Required Environment Variables
Configure these in `.env` (never commit keys to source control):
```env
# Gemini API Key for vision grounding and fallback diagnosis
GEMINI_API_KEY="your_gemini_api_key"

# Meta Model API Key for hackathon model integration
META_MODEL_API_KEY="your_meta_model_key"
META_MODEL_NAME="muse-spark-1.3"

# Google Maps API Key (Optional)
GOOGLE_MAPS_API_KEY=""

# Application Host URL
APP_URL="http://localhost:3000"
```

---

## 10. Local Development & Installation

### Option A: Running the Full-Stack Node / React Service
```bash
# 1. Install dependencies
npm install

# 2. Run Vite dev server (includes live Express API middleware on port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start
```
Visit `http://localhost:3000` in your browser.

### Option B: Running the Python FastAPI Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Interactive Swagger docs: `http://localhost:8000/docs`.

---

## 11. Automated Testing
Run backend unit and schema tests:
```bash
# Frontend TypeScript check
npm run lint

# Python backend tests
cd backend && pytest tests/
```

---

## 12. Privacy & Agricultural Safety Considerations
1. **Pesticide Safety:** No dosages are ever fabricated by AI. The app always directs the farmer to the DAE-approved package label.
2. **Location Privacy:** Exact GPS coordinates are never retained on the server or published.
3. **Medical & Agricultural Disclaimer:** Farmers are reminded that AI is an advisory aid and to consult their local Upazila Agriculture Officer (SAAO) for critical decisions.

---

## 13. Hackathon Submission Checklist
- [x] Full source code committed.
- [x] Detailed `README.md` with system architecture and demo script.
- [x] Standalone Python FastAPI backend (`/backend`) with Pydantic validation.
- [x] Meta Model API integration architecture with transparent fallback.
- [x] Visual grounding lesion highlighting (Feature 8).
- [x] Verified DAE treatment guidelines without hallucinated pesticide dosages.
- [x] Real Open-Meteo weather integration with spray advisory.
- [x] Nearby agricultural medicine shops with distance and maps.
- [x] 1-Click sample test cases for immediate demo evaluation.
- [ ] 2-3 minute recorded video walkthrough uploaded.
