FROM node:21-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV MONGODB_CONNECTION_STRING=mongodb://mongo:27017/Twitter

EXPOSE 3000

CMD ["npm", "start"]