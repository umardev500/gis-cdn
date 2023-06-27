FROM node:18 as dev

WORKDIR /app

COPY . .

RUN ln -s /app/uploads /app/public

EXPOSE 5001

CMD [ "yarn", "dev" ]

# production
FROM node:18 as prod

WORKDIR /app

COPY . .

RUN mkdir public

RUN ln -s /app/uploads /app/public

RUN yarn install

RUN yarn build

EXPOSE 5001

CMD [ "yarn", "start" ]