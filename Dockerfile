FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port that the app listens on
EXPOSE 3000

RUN npx prisma generate

RUN npm run seed

RUN npm run build

CMD [ "node", "dist/server/index.js" ]
# RUN npm i -g ts-node

# CMD ["ts-node", "server/index.ts"]