FROM node:18-alpine

ENV APP_HOME=/app \
    NODE_ENV=development

WORKDIR ${APP_HOME}

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ${APP_HOME}/

RUN sh -lc 'if [ -f package-lock.json ]; then npm ci; elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm install; fi'

COPY . ${APP_HOME}

EXPOSE 3000

CMD ["sh", "-lc", "npm run dev -- --host 0.0.0.0 --port 3000"]


