FROM oven/bun:1 AS builder
WORKDIR /app

COPY . .

RUN bun install
RUN bun --bun run build

FROM oven/bun:1 AS release

COPY --from=builder /app/build .
RUN bun install
RUN rm .env.example

CMD [ "bun", "run", "start" ]