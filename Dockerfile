FROM node:20-alpine

RUN mkdir test-app

WORKDIR /test-app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_API_URL "https://fastapiblog.azurewebsites.net/"

EXPOSE 3000

CMD [ "npm", "start" ]