FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

ARG NODE_ENV=development
RUN npm run build:"$NODE_ENV"

EXPOSE 3000

CMD ["npm", "run", "start:development"]