#node:16.14.2-bullseye
FROM node:16.14.2-bullseye

RUN npm install -g http-server

WORKDIR /usr/app

#COPY package*.json ./

#RUN npm install

COPY . .
COPY .env.production .env

#RUN npm run build

EXPOSE 8092

CMD [ "http-server", "dist", "-p", "8092" ]