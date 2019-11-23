FROM node:12.13-alpine AS build

WORKDIR /app

ADD package.json .
ADD package-lock.json .
RUN npm install --production

FROM node:12.13-alpine AS test

WORKDIR /app

COPY . .
COPY --from=build /app/node_modules ./node_modules

RUN npm install && npm test


FROM node:12.13-alpine

ENV PORT=3000
EXPOSE ${PORT}

USER node

WORKDIR /app

COPY . .
COPY --from=build /app/node_modules ./node_modules

CMD [ "node", "./server" ]
