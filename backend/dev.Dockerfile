FROM node:21-alpine

WORKDIR /app

ADD package.json ./

RUN npm install

# ADD bin ./bin

CMD ["npm", "run", "dev"]

# FROM node:alpine

# WORKDIR /app
# RUN npm install -g nodemon

# ADD package.json package-lock.json ./
# RUN npm install

# ENV NODE_ENV=development

# ADD bin ./bin

# VOLUME [ "/app/src" ]

# CMD ["nodemon"]