FROM node:18-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . /app
RUN npm run build --prod
EXPOSE 3000
CMD [ "node", "./dist/main.js"]
