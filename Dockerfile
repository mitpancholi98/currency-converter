FROM node:22-alpine

WORKDIR /app

COPY dist/ ./dist/
COPY package.json ./
COPY package-lock.json ./

RUN npm ci --omit=dev

CMD ["npm", "start"]
