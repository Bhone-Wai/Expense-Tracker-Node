FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for faster cache
COPY package*.json ./

# Copy the rest of the code
COPY . .

# Install dependencies (use ci for production)
RUN npm ci --only=production

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 3000

# Generate Prisma client (required if using Prisma)
RUN npx prisma generate

# Start the server
CMD ["npm", "start"]