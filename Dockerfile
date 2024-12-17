FROM node:21-alpine

WORKDIR /usr/backend

COPY ["package.json", "yarn.lock", "./"]
COPY . .

RUN yarn install && yarn build

COPY .env ./.env

EXPOSE 8000

CMD ["node", "dist/app"]