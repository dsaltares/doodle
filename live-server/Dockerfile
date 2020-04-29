FROM node:12-alpine

WORKDIR /usr/src/app

RUN npm install pm2 -g

COPY package.json yarn.lock tsconfig.json ./
RUN yarn install

ADD . /usr/src/app
RUN yarn build

ENV PORT 3000
EXPOSE 3000

CMD [ "pm2-runtime", "dist/server.js" ]
