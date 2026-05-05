ARG NODE_VERSION=20.20.2
FROM node:${NODE_VERSION}-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
WORKDIR /opt/medusa/deps
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

# Install dependencies
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install

FROM base AS builder
WORKDIR /opt/medusa/build
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Build the application
COPY --from=deps /opt/medusa/deps .
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM base AS runner
RUN apt-get update \
  && apt-get install --no-install-recommends -y tini=0.19.0-1+b3 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER node
WORKDIR /opt/medusa
COPY --from=builder --chown=node:node /opt/medusa/build .
ARG PORT=9000
ARG NODE_ENV=production
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV

EXPOSE $PORT

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["./start.sh"]