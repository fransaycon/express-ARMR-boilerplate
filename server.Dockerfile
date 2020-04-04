FROM node:12.7
WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
CMD PUBLIC_KEY=${PUBLIC_KEY:-$(echo "$PUBLIC_KEY_BASE_64" | base64 -d -w0)} \
    PRIVATE_KEY=${PRIVATE_KEY:-$(echo "$PRIVATE_KEY_BASE_64" | base64 -d -w0)} \
    npm run watch:dev
