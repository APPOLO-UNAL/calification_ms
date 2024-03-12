FROM node:20.11.1

WORKDIR /usr/app

COPY ./package.json ./

COPY ./ ./

RUN npm install

EXPOSE 8080

CMD ["npm","run","dev"]