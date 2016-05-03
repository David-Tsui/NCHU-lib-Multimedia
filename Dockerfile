
FROM node:5

RUN \
mkdir -p /service; \
mkdir -p /workspace;

WORKDIR /service
COPY package.json /service/

RUN npm install

ADD . /service

ENTRYPOINT ["npm", "run"]
CMD ["start"]

