FROM denoland/deno:1.31.2 as build

WORKDIR /build

COPY deps.ts ./
RUN deno cache deps.ts

COPY . ./
RUN deno cache src/utils.ts

RUN deno task compile
RUN chmod 755 app

FROM --platform=linux/amd64 gcr.io/distroless/cc

WORKDIR /app

USER nonroot

COPY --from=build /build/app ./

LABEL org.opencontainers.image.source=https://github.com/mel9y/DiscordGPT

CMD ["./app"]
