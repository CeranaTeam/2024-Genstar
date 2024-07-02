#!/bin/sh

# 进入数据库迁移目录并执行初始化脚本
echo "Running database migrations..."
cd migrate
python init_db.py

# 返回工作目录并启动 FastAPI 应用
echo "Starting FastAPI application..."
cd ..
uvicorn app.main:app --host 0.0.0.0 --port 8000 --proxy-headers
