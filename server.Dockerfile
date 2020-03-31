FROM node:12.7
WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
CMD npm run watch:dev
EXPOSE 3000
