FROM node

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "node", "dist/main.js" ]