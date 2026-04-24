# Stage 1: Build
FROM node:22-slim AS builder

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root configurations
COPY package.json package-lock.json lerna.json ./

# Copy all packages and apps to handle dependencies
COPY apps/ ./apps/
COPY packages/ ./packages/

# Install dependencies for the entire monorepo
RUN npm ci

# Build all applications using Lerna
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Create directories for each app
RUN mkdir -p /usr/share/nginx/html/ai-thread
RUN mkdir -p /usr/share/nginx/html/dashboard

# Copy build artifacts from builder stage
# Assuming vite output is in 'dist' folder of each app
COPY --from=builder /app/apps/ai-thread/dist /usr/share/nginx/html/ai-thread
# Placeholder for dashboard if it doesn't exist yet, uncomment when ready
# COPY --from=builder /app/apps/dashboard/dist /usr/share/nginx/html/dashboard

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
