FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci

# Copy rest of the app
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Debug: List files to make sure everything is copied
RUN ls -la src/

# Build the TypeScript code with verbose output
RUN npm run build --verbose

# Remove dev dependencies to keep image lean
RUN npm ci --only=production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]