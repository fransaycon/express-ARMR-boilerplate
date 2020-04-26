# FREXPRESS ARMR BOILERPLATE

This is my take on an express auth and resource REST API server integrated with MongoDB.
For ease of development and future deployment, all services are dockerized.

This uses the following technology,

- jsonwebtoken
- bcrypt
- express
- mongodb
- mongoose
- docker
- docker-compose

## Installation

**Install the pre-requisites**

1. Install Nodev12 and above. [Download it here](https://nodejs.org/en/download/)
2. Install Docker. [Download it here](https://docs.docker.com/install/)

That's actually all you need.

## Making it work

For first time installs I recommend to build first,

```
docker-compose build
```

Once you build it,

```
docker-compose up
```

Dependent on how you install your docker it should be available to be called upon either in localhost or the docker network under the port 3000.
