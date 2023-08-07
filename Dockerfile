FROM node:18.16.0-alpine3.18 AS builder

WORKDIR /app

COPY *.json ./

RUN npm ci && npm cache clean --force


FROM node:18.16.0-alpine3.18 AS develop

WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "run", "start:dev:docker"]
