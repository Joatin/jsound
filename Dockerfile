FROM node:8-alpine
MAINTAINER Joatin Granlund <granlundjoatin@gmail.com>

RUN mkdir -p /usr/src/app

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
COPY dist/ /usr/src/app

WORKDIR /usr/src/app

RUN yarn install --production

EXPOSE 8080

CMD [ "node", "index.js" ]
