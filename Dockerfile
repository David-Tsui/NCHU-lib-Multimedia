
FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN \
apt-get update && \
apt-get install -y libnotify-bin

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

ENTRYPOINT ["npm", "run"]
CMD ["start"]

