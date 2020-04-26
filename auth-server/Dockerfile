FROM node:12.7
WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install
CMD TOKEN_PUBLIC_KEY=${TOKEN_PUBLIC_KEY:-$(echo "$TOKEN_PUBLIC_KEY_BASE_64" | base64 -d -w0)} \
    TOKEN_PRIVATE_KEY=${TOKEN_PRIVATE_KEY:-$(echo "$TOKEN_PRIVATE_KEY_BASE_64" | base64 -d -w0)} \
    REFRESH_PUBLIC_KEY=${REFRESH_PUBLIC_KEY:-$(echo "$REFRESH_PUBLIC_KEY_BASE_64" | base64 -d -w0)} \
    REFRESH_PRIVATE_KEY=${REFRESH_PRIVATE_KEY:-$(echo "$REFRESH_PRIVATE_KEY_BASE_64" | base64 -d -w0)} \
    npm run watch:dev
