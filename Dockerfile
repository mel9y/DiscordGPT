FROM denoland/deno:1.31.2

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

COPY . .

RUN deno cache src/utils.ts

CMD ["deno", "task", "start"]
