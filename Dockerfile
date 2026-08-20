# --- сборка ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Нитро может писать результат либо в .output, либо в dist —
# создаём обе папки, чтобы COPY ниже не падал.
RUN mkdir -p .output dist

# --- запуск ---
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
COPY --from=build /app/.output ./.output
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
EXPOSE 80
CMD ["sh", "-c", "if [ -f .output/server/index.mjs ]; then node .output/server/index.mjs; else node dist/server/index.mjs; fi"]
