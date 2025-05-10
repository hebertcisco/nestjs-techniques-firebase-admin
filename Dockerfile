FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

RUN npm install -g pm2
RUN npm install -g @nestjs/cli

RUN npm run build

EXPOSE 5672

CMD ["pm2-runtime", "ecosystem.config.js"]