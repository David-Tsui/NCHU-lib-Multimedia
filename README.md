# Nchu Media CMS 興大多媒體中心網站

This is a CMS system built on [Keystone.js](http://keystonejs.com/) for Nchu library multi-media website

## Outline

Here is the technical stack used in this project:

* linux based OS
  * use terminal to operate
* nodejs
  * keystone.js
* docker (for easier deployment and management)
  * docker-compose

## Build this service

Get the source of this project, by git for example:

```
git clone https://github.com/David-Tsui/NCHU-lib-Multimedia.git
```

Or zip/tar.gz of this project.

#### Use docker

You may need to install [docker](https://www.docker.com/community-edition) and [docker-compose](https://docs.docker.com/compose/install/) first

to build the env in docker, just

```
cd path/to/this/project
cp .env.example .env
cp docker-compose.example.yml docker-compose.yml
docker-compose build
```

## Fire up the service

```
cd path/to/this/project
docker-compose up -d main
```

## Check the service

#### View if service is alive

```
cd path/to/this/project
docker-compose ps
```

#### View logs

```
cd path/to/this/project
docker-compose logs
```

## Stop the service

```
cd path/to/this/project
docker-compose kill
```

## Backup DB data

```
cd path/to/this/project
docker-compose run backup
```

the backup file will be stored at `./backup/2017...`

## Restore DB data

```
cd path/to/this/project
docker-compose run restore ./backup/...
```

## Update / Rebuild the service

```
cd path/to/this/project
git pull # or any means to get the latest code
docker-compose build
docker-compose kill
docker-compose up -d main
```

## Development

Get the code first

```
git clone https://github.com/David-Tsui/NCHU-lib-Multimedia.git
cd ./NCHU-lib-Multimedia
```

Copy config from example

```
cp .env.example .env
cp docker-compose.dev.yml docker-compose.yml
```

run the dev env, the code is shared between the container and the host

```
docker-compose run --rm --service-ports main
```

inside the dev env,

```
# to run server (Ctrl-c to close server):
npm run dev

# to compile assets (js, css):
npm run assets:compile
```

