FROM node:14.13.1-alpine3.12 AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]