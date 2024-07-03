FROM python:3.12

WORKDIR /workspace

COPY . /workspace

ENV PATH="/root/.local/bin:${PATH}"
# RUN pip install --no-cache-dir --upgrade -r /workspace/requirements.txt
RUN apt-get update && \
    apt-get install --no-install-recommends --yes pipx && \
    pipx install poetry && \
    # poetry config virtualenvs.create false && \poetry config virtualenvs.create false && \
    poetry install --no-dev && \
    chmod +x /workspace/entrypoint.sh

ENTRYPOINT ["/workspace/entrypoint.sh"]
