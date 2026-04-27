# Stage 1: Build
FROM node:22-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root configurations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml lerna.json ./

# Copy all apps to handle potential workspace dependencies
COPY apps/ ./apps/

# Install dependencies for the entire monorepo
RUN pnpm install --frozen-lockfile

# Build the specific workspace
RUN pnpm --filter @app/ai-thread build

# Stage 2: Serve via Nginx
FROM nginx:alpine

# The base path is /app/ai-thread/ so we nest the built assets there
RUN mkdir -p /usr/share/nginx/html/app/ai-thread
COPY --from=builder /app/apps/ai-thread/dist /usr/share/nginx/html/app/ai-thread

# Copy a basic nginx config that handles SPA routing
RUN printf "server {\n\
    listen 80;\n\
    absolute_redirect off;\n\
    location /app/ai-thread {\n\
        root /usr/share/nginx/html;\n\
        try_files \$uri /app/ai-thread/index.html;\n\
    }\n\
    location / {\n\
        return 301 /app/ai-thread;\n\
    }\n\
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
