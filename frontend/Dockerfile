FROM node:18-alpine

ENV APP_HOME=/app \
    NODE_ENV=development

WORKDIR ${APP_HOME}

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ${APP_HOME}/

# Используем npm install, чтобы не падать при несовпадении package-lock.json
RUN sh -lc 'npm install --no-audit --no-fund'

COPY . ${APP_HOME}

EXPOSE 3000

CMD ["sh", "-lc", "npm run dev -- --host 0.0.0.0 --port 3000"]


