FROM node:20-slim

# Install OpenSSL and other necessary packages
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install ALL dependencies (including dev dependencies)
RUN npm ci

# Copy rest of the app
COPY . .

# Generate Prisma Client and build
RUN npx prisma generate && npm run build

# Create production dependencies (but keep prisma for migrations)
RUN npm ci --only=production && npm install prisma

# Expose the port
EXPOSE 3000

# Start the application with proper error handling
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
