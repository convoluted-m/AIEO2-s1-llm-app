# Sentiment Analyser

LLM-powered sentiment analysis app: FastAPI backend, Next.js frontend. The API (POST `/sentiment`) calls OpenAI to classify text as positive, neutral, or negative, returning a single-word label. The React/Next.js UI lets you paste text, send it to the API, and view the detected sentiment with an icon and text-length stat.

## Backend (FastAPI) — run with Pipenv

### Prerequisites
Python 3.10+ and Pipenv installed.

### Install dependencies
```bash
pipenv install "fastapi>=0.104.0" "uvicorn[standard]>=0.24.0"
pipenv install "openai>=1.0.0"
pipenv lock
```


### Environment
- Add your OpenAI key to  `.env` file (already gitignored).
- `python-dotenv` loads `.env` automatically at startup.

### Run the API
From the repo root:
```bash
pipenv run uvicorn app:app --reload --port 8000
```
- Use `pipenv shell` first if you prefer an activated subshell, then `uvicorn app:app --reload --port 8000`.
- `--reload` enables auto-reload during development.

3. The API will be available at:
   - **API Base URL**: `http://localhost:8000`
   - **Interactive API Docs**: `http://localhost:8000/docs` (Swagger UI)
   - **Alternative Docs**: `http://localhost:8000/redoc` (ReDoc)

## Frontend (Next.js)

From `frontend/`:
```bash
npm install
npm run dev
```
- The app expects the backend at `http://localhost:8000`.
- Open `http://localhost:3000` to use the UI.

### Testing the API

You can test the sentiment endpoint using curl:

```bash
curl -X POST "http://localhost:8000/sentiment" \
     -H "Content-Type: application/json" \
     -d '{"text": "I love this product!"}'
```

Expected response:
```json
{"sentiment": "positive"}
```

Or use the interactive documentation at `http://localhost:8000/docs` to test the endpoint directly in your browser.

### API Endpoint

**POST** `/sentiment`

**Request Body:**
```json
{
  "text": "Your text here"
}
```

**Response:**
```json
{
  "sentiment": "positive" | "negative" | "neutral"
}
```
