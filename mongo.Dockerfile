FROM mongo:4.2

RUN mkdir -p /home/mongodb \
    && chown $(id -u mongodb):$(id -g mongodb) /home/mongodb/
COPY mongo-init.sh docker-entrypoint-initdb.d/mongo-init.sh
