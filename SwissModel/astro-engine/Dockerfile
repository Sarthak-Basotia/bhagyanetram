# ---------- Builder: compiles pyswisseph (ships as C source, no prebuilt wheels) ----------
FROM python:3.12-slim AS builder

ENV PIP_NO_CACHE_DIR=1
WORKDIR /build

# gcc + headers needed to compile the Swiss Ephemeris C extension
RUN apt-get update && apt-get install -y --no-install-recommends gcc build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
# Build wheels for every dependency (pyswisseph gets compiled here, once)
RUN pip wheel --wheel-dir /wheels -r requirements.txt

# ---------- Runtime: slim image, installs from prebuilt wheels (no compiler) ----------
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    ASTRO_NODE_TYPE=mean \
    ASTRO_POSITION_MODE=apparent

WORKDIR /app

COPY --from=builder /wheels /wheels
COPY requirements.txt .
RUN pip install --no-index --find-links=/wheels -r requirements.txt \
    && rm -rf /wheels

COPY app ./app
COPY tests ./tests

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
