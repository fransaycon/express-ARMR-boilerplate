# FREXPRESS AUTH-RESOURCE-MONGODB REST BOILERPLATE

This is a dockerized express starter application to kickstart the creation of an auth server and resource server REST API integrated with MongoDB.

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
