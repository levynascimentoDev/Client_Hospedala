FROM docker.io/oven/bun:latest

WORKDIR /app

COPY . .

EXPOSE 5000

RUN bun install

CMD ["bun", "run", "dev", "--host"]