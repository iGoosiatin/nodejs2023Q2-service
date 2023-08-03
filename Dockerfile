FROM node:18.16.0-alpine3.18 AS builder

WORKDIR /app

COPY *.json ./
RUN npm ci && npm cache clean --force

COPY src ./src

RUN npm run build

FROM node:18.16.0-alpine3.18 AS prod

USER node
WORKDIR /app

COPY package*.json ./
COPY --chown=node:node ./database ./database
COPY --chown=node:node --from=builder /app/dist ./dist

RUN npm ci --omit=dev && npm cache clean --force

RUN npx prisma generate

CMD ["npm", "run", "start:prod"]