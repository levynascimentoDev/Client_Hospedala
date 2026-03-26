FROM docker.io/oven/bun:latest

RUN useradd -D -u 1000 user

WORKDIR /app
COPY . .

RUN chown -R user:user /app
USER user

RUN bun install
EXPOSE 8080

CMD ["bun", "run", "dev"]