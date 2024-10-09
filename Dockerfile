FROM node:21.7.0

WORKDIR /app

COPY package*.json ./

RUN npm install yarn && yarn install

COPY . .

EXPOSE 8000