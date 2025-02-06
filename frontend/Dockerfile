FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# ADD package.json package-lock.json ./

RUN npm install --force

COPY . .

# ADD .eslintrc.js vue.config.js babel.config.js ./
# # ADD .eslintrc.js .prettierrc babel.config.js vue.config.js .browserslistrc .env ./

# COPY src ./src
# COPY public ./public

RUN npm run build

# WORKDIR /app

EXPOSE 8081

CMD ["npm", "run", "serve"]