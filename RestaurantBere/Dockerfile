FROM node:20-apline as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production
