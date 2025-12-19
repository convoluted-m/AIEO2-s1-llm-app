# Backend API - Sentiment Analysis

## How to Run the App (with Pipenv)

### Prerequisites
Python 3.10+ and Pipenv installed.

### Install dependencies
```bash
pipenv install "fastapi>=0.104.0" "uvicorn[standard]>=0.24.0"
pipenv lock
```

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
