FROM node:20.11.1
WORKDIR /usr/app
COPY ./package.json ./
COPY ./ ./
RUN npm install
EXPOSE 8080

CMD ["npm","run","dev"]

# docker run -p 8080:8080 -e PG_HOST=host.docker.internal -e NEO4J_PORT=5432 -e NEO4J_USER=postgres -e NEO4J_PASSWORD=Juandi1810 -e URL=0.0.0.0:8080 calification_ms