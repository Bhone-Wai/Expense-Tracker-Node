FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for faster cache
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (use ci for production)
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the server
CMD ["sh", "-c", "echo 'DATABASE_URL is set:' && echo ${DATABASE_URL:0:20}... && echo 'Running migrations...' && npx prisma migrate deploy && echo 'Starting application...' && npm start"]