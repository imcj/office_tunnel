FROM node:16-alpine
RUN mkdir /app
COPY ./ /app/
WORKDIR /app
ENTRYPOINT ["node", "./index.js"]