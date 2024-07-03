from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.v0 import autocomplete,generate, summary


def setup_router(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],  # 允許所有方法
        allow_headers=["*"],  # 允許所有標頭
    )

    app.include_router((autocomplete.router))
    app.include_router((generate.router))
    app.include_router((summary.router))
