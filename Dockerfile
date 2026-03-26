FROM docker.io/oven/bun:latest

RUN adduser -m -u 1000 user

WORKDIR /app
COPY . .

COPY --chown=1000:1000 . .
USER 1000

RUN bun install
EXPOSE 8080

CMD ["bun", "run", "dev"]