FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist .

CMD ["node", "index.js"]