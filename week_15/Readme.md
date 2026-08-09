## Docker

### what is Docker?
A platform/tool used to build, package, run, and manage applications in containers.

### what is Image?
A read-only package/template containing everything needed to run an application—code, dependencies, libraries, and configuration.

### What is Container?
A running instance of a Docker image. It is an isolated environment where the application actually runs.

### Common docker command
```bash
docker images  # shows you all images that you have on you machine
docker ps  # shows you all the containers you are running on you machine
docker run  # Lets you start a container
docker build  # Lets you create a image of your code
docker push  # Lets you push you image to registry
docker kill  # Lets you to remove container
docker exec  # Lets you to execute a command inside a container
docker ps # Current running container
```

### Dockerfile
A Dockerfile is a text document that contains all the commands a user could call on the command line to create a image

### Basic template of Dockerfile
```bash
FROM node:16-alpine  # Base image
WORKDIR /app  # working director
COPY . .  # copy over files  first from where second arg to where
RUN  npm install  # Run commands to build the code
RUN npm run build  
EXPOSE 3000   # Expose ports
CMD ["node", "dist/index.js"]  # Final command that run when running the container
```
### .dockerignore
Tells which files and folder not pick when creating image

### More commands
```bash
docker  build -t image-name  ./  # -t flag represent tag name & ./ where to put image
docker run -p 3000:3000 image-name  # -p means port bining conainer and local machine port
docker run -p 3000:3000 -e DATABASE_URL=" -------" image-name  # use for when need enviornment variable
docker exec -it container-id /bin/sh  # ssh to you container
```
### Pushing to docker hub
```bash
docker tag my-app:latest john123/my-app:latest   # first create tag
docker tag LOCAL_IMAGE:TAG DOCKERHUB_USERNAME/REPOSITORY:TAG
docker push your_username/my-app:latest  # push to hub
```
### Layers of Docker
In Docker, layers are a fundamental part of the image architecture that allows Docker to be efficient, fast, and portable. A Docker image is essentially built up from a series of layers, each representing a set of differences from the previous layer.

### Volumes
```bash
docker volume create volume_database
docker run -v voume_database:/data/db -p 2701:27017 mongo # attach mongo db to store
```
### Network
In Docker, a network is a powerfull feature that allows containers to communicate with each other and with the outside world.
Docker containers can't talk to each other by defalut
```bash
docker network create my_custom_network  # create a network
docker run -d -p 3000:3000 --name backend --network my_custom_network image_tag  # start the backend process with the network attached to it
docker run -d -v volume_database:/data/db --name mongo --network my_custom_network  # start mongo on the same netowrk
docker run  -p 3000:3000 --name backend --network my_custom_network mongo-app  # start a node server on a network
```
> mongourl would be name of mongo instane (name) on docker this act as a ip for that

### Docker compose
Docker compose is a tool designed to help you define and run multi-container Docker applications. With compose, you use a YAML file to configure your application's services, networks, and volums. Then, with a single command, you can create and start all the services from your configuration.

> When we are creating multiple nodes in `docker-compose.yaml` by default they start in same network
```yaml
# Template of a mogodb application
version: '1.0'
services:
  mongodb:
    image: "mongo"
    container_name: "mongodb"
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
  backend:
    build: .  # bring locak dockerfile to first build then use
    container_name: "backend-app"
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      Mongo_URL: "mongodb://mongodb:27017/myapp"
volumes:
  mongodb_data:
```
```bash
docker compose up
```
### Bind mount
This is way to setup a local machine file connect to docker container file sync up

```bash
docker run -p 3000:3000 -v ./app:/nextapp/app nextapp #examle of a next app
```