FROM node:21-alpine

WORKDIR /app

ADD package.json ./

RUN npm install

CMD ["npm", "run", "dev"]