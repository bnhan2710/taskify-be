FROM node:21-alpine

WORKDIR /usr/backend

COPY package.json yarn.lock ./
RUN yarn install 

COPY . .

RUN yarn build

COPY .env .env

EXPOSE 8000

CMD ["yarn", "start"]