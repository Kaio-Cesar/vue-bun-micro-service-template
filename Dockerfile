# syntax=docker/dockerfile:latest

FROM node:lts-alpine AS base
ENV PNPM_VERSION=10.4.1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm
RUN pnpm -v
WORKDIR /usr/app/

FROM base AS prebuild
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

FROM prebuild AS bunsetup
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -g bun

FROM bunsetup AS build
RUN bunx turbo build
RUN cd ./apps/server && pnpm drizzle-kit generate --config=drizzle.config.ts
RUN pnpm deploy --filter=client --prod /prod/client/
RUN pnpm deploy --filter=server --prod /prod/server/

FROM oven/bun:alpine AS server
COPY --from=build /prod/server /prod/server
RUN rm -rf /prod/server/node_modules
WORKDIR /prod/server
EXPOSE 3000
CMD ["bun", "run", "prod"]

FROM nginx:stable-alpine AS client
COPY --from=build /prod/client/nginx.conf /usr/share/nginx/conf.d
COPY --from=build /prod/client/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"] 