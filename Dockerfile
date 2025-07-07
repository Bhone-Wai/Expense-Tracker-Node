FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy only package files first for faster cache
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy rest of the app
COPY . .

# Install dev dependencies for build
RUN npm install --save-dev typescript ts-node @types/node

# Build the TypeScript code
RUN npm run build

# Generate Prisma Client
RUN npx prisma generate

# Remove dev dependencies to keep image lean
RUN npm ci --only=production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]