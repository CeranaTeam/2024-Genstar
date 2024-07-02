FROM python:3.12

WORKDIR /workspace

COPY ./requirements.txt /workspace/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /workspace/requirements.txt

COPY ./ /workspace

RUN chmod +x /workspace/start.sh

CMD ["/workspace/start.sh"]
