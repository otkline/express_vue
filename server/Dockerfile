FROM node:20

WORKDIR /app

COPY ./server/package*.json ./
RUN npm install

COPY ./server .

EXPOSE 3000

CMD bash -c "node --loader ts-node/esm ./drizzle/scripts/watch-schema-index.ts & npx tsx watch index.ts"
