# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root package.json and lockfile
COPY package.json package-lock.json ./
# Copy workspace config
COPY lerna.json ./

# Copy ai-thread package.json specifically to leverage Docker layer caching
COPY apps/ai-thread/package.json ./apps/ai-thread/

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY apps/ai-thread/ ./apps/ai-thread/

# Build the specific workspace
RUN npm run build --workspace=@app/ai-thread

# Stage 2: Serve via Nginx
FROM nginx:alpine

# The base path is /ai-thread/ so we nest the built assets there
RUN mkdir -p /usr/share/nginx/html/ai-thread
COPY --from=builder /app/apps/ai-thread/dist /usr/share/nginx/html/ai-thread

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
