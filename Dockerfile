FROM node:20.15.1-bookworm-slim AS deps
ENV NODE_ENV=development
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm ci

FROM node:20.15.1-bookworm-slim AS build
ENV NODE_ENV=development
WORKDIR /app
COPY . /app
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian12:nonroot
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/dist /app/dist
CMD ["/app/dist/main.mjs"]
EXPOSE 3000
