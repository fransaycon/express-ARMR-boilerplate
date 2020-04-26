FROM node:12.7
WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
CMD TOKEN_PUBLIC_KEY=${TOKEN_PUBLIC_KEY:-$(echo "$TOKEN_PUBLIC_KEY_BASE_64" | base64 -d -w0)} \
    npm run watch:dev
