FROM node:alpine

WORKDIR /usr/src/app

# Set environment variables
ENV NODE_ENV=development \
    NEXT_PUBLIC_BASE_URL=http://local:4000 \

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]