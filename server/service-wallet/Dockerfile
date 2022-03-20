FROM node:14-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN mkdir -p /nest
ADD . /nest

RUN mkdir -p /nest/storage/wallets

WORKDIR /nest

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN yarn global add @nestjs/cli

RUN yarn install --production=false

# Build production files
RUN nest build proto-schema
RUN nest build service-wallet

# Bundle app source
COPY . .

EXPOSE 50075
CMD ["node", "dist/server/service-wallet/main.js"]
