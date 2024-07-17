FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port that the app listens on
EXPOSE 3000
EXPOSE 4000

RUN npx prisma generate

RUN npm run build

RUN npm run copy

CMD [ "node", "dist/server/server/index.js" ]

# To Build run docker build -t <Name of Build> . [ie. directory]