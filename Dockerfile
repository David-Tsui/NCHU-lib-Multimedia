
FROM node:5

RUN \
mkdir -p /service; \
mkdir -p /workspace;

ADD . /service
WORKDIR /service

RUN \
rm -rf node_modules; \
npm install;

ENTRYPOINT ["npm", "run"]
CMD ["start"]

