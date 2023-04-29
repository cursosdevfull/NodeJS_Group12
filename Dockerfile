FROM node:alpine3.17 as builder

WORKDIR /build

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine3.17 

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json .

CMD ["npm", "run", "start"]