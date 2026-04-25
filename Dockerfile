# Stage 1: Build
FROM node:22-slim AS builder

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy root configurations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml lerna.json ./

# Copy all apps to handle dependencies
COPY apps/ ./apps/

# Define build arguments for Vite (Railway will pass these from the Variables tab)
ARG VITE_API_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_GEMINI_PUBLIC_KEY
ARG VITE_IMAGE_KIT_ENDPOINT
ARG VITE_IMAGE_KIT_PUBLIC_KEY

# Set them as environment variables so Vite can pick them up during 'pnpm run build'
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_GEMINI_PUBLIC_KEY=$VITE_GEMINI_PUBLIC_KEY
ENV VITE_IMAGE_KIT_ENDPOINT=$VITE_IMAGE_KIT_ENDPOINT
ENV VITE_IMAGE_KIT_PUBLIC_KEY=$VITE_IMAGE_KIT_PUBLIC_KEY

# Install dependencies for the entire monorepo
RUN pnpm install --frozen-lockfile

# Build all applications using Lerna
RUN pnpm run build

# Stage 2: Serve via Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Create directories for each app
RUN mkdir -p /usr/share/nginx/html/app/ai-thread
RUN mkdir -p /usr/share/nginx/html/app/dashboard

# Copy build artifacts from builder stage
# Assuming vite output is in 'dist' folder of each app
COPY --from=builder /app/apps/ai-thread/dist /usr/share/nginx/html/app/ai-thread
COPY --from=builder /app/apps/dashboard/dist /usr/share/nginx/html/app/dashboard

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
