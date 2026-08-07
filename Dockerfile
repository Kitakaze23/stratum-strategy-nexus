# --- сборка ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- запуск ---
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
COPY --from=build /app/.output ./.output
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]
