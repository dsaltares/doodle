FROM node:12-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install
COPY . .
RUN yarn build
COPY ./dist .
ENV PORT 3000

EXPOSE 3000
CMD [ "node", "server.js" ]
