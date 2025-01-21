FROM node:21-alpine

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install --force

# ADD .eslintrc.js .prettierrc babel.config.js vue.config.js .browserslistrc .env ./

COPY src ./src
COPY public ./public

# RUN npm build

WORKDIR /app

CMD ["npm", "start"]

# FROM node:10.19-alpine3.11 AS BUILDER

# WORKDIR /app
# RUN apk add python make g++
# ADD package.json package-lock.json ./
# RUN npm install

# ADD babel.config.js .
# ADD vue.config.js .
# ADD .browserslistrc .
# ADD .eslintrc.js .
# ADD .prettierrc .
# ADD .env.production .

# COPY src ./src
# COPY public ./public

# RUN npm run build

# FROM node:alpine

# WORKDIR /app

# RUN npm install -g serve

# COPY --from=BUILDER /app/dist ./

# CMD serve -s -l $PORT