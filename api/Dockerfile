FROM node:12-slim as base
ENV NODE_ENV=production
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
WORKDIR /app/api
RUN npm install --only=development
EXPOSE 8082
CMD ["nodemon", "./bin/www", "--inspect=0.0.0.0:9229"]

FROM base as source
WORKDIR /app/api
COPY --chown=node:node . .

FROM source as test
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
COPY --from=dev /app/node_modules /app/node_modules
WORKDIR /app/api
RUN npm test
CMD ["npm", "run", "test"]

FROM source as prod
WORKDIR /app/api
EXPOSE 8082
CMD ["node", "./bin/www"]