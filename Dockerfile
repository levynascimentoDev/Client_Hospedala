FROM docker.io/oven/bun:latest

RUN adduser -D -u 1000 user

WORKDIR /app
COPY . .

COPY --chown=1000:1000 . .
USER user

RUN bun install
EXPOSE 8080

CMD ["bun", "run", "dev"]