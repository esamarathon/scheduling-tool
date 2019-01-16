FROM node:10-slim

WORKDIR /home/node
COPY . /home/node

RUN npm install -g --no-package-lock nodemon babel-cli
RUN yarn --frozen-lockfile

CMD [ "yarn", "dev" ]