#!/bin/bash

# Echo running database migrations
echo "Running database migrations..."
cd /workspace/migrate
poetry run python init_db.py
cd /workspace

# Echo starting FastAPI application
echo "Starting FastAPI application..."
poetry run fastapi run app/main.py --host 0.0.0.0 --port 8000 --proxy-headers
