FROM node:18.18.0

WORKDIR /app/exercises
EXPOSE 8081
ENTRYPOINT ["npm"]

COPY package*.json .
RUN npm i

COPY app.json .
COPY App.tsx .
COPY babel.config.js .
COPY tsconfig.json .

CMD ["run", "web"]
