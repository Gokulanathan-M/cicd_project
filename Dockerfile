# Use a secure base image
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY client/package*.json ./
RUN npm ci

# Copy source
COPY client/ .

# Build application
RUN npm run build

# Use Nginx for the production runtime
FROM public.ecr.aws/nginx/nginx:alpine

# Copy the built assets to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
