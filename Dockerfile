FROM python:3.13-slim

WORKDIR /usr/src/app




# Copia os requisitos e instala
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt


COPY . .


# Evita o uso de cache de pip e mantém o container mais leve
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    netcat gcc libmariadb-dev curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*



# Cria o entrypoint que espera o banco estar pronto
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expõe a porta 8000
EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
