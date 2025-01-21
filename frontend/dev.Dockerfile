FROM node:21-alpine

WORKDIR /app

ADD package.json ./

RUN npm install --force

# ADD .eslintrc.js .prettierrc babel.config.js vue.config.js .browserslistrc .env ./

VOLUME [ "/app/src" ]
VOLUME [ "/app/public" ]

CMD ["npm", "run", "dev"]