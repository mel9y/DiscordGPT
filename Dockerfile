FROM denoland/deno:1.31.2

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

COPY . .

RUN deno cache src/utils.ts

LABEL org.opencontainers.image.source=https://github.com/mel9y/DiscordGPT

CMD ["deno", "task", "start"]
