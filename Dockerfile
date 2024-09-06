FROM node:lts-alpine

# Defaults to production, docker-compose overrides this to development on build and run.
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apk add --no-cache --virtual .gyp python3 make g++

WORKDIR /app

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY packageProduction.json /usr/app/package.json

RUN apk add --no-cache git
RUN npm install 

COPY ./build /usr/app

COPY  ./node_modules/masterPrismaSchema/prisma/schema ./prisma/schema/
RUN npx prisma generate --schema ./prisma/schema

EXPOSE 3000

#CMD ["nodemon", "index.js"]
CMD ["node", "index.js"]