FROM node:16.16.0-alpine as build

RUN apk add curl

USER node

WORKDIR /home/node

COPY --chown=node:node ./app ./app
COPY --chown=node:node ./database ./database
COPY --chown=node:node ./package* ./

RUN npm install

ENTRYPOINT ["npm", "run", "start"]