FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for faster cache
COPY package*.json ./

# Install dependencies (use ci for production)
RUN npm ci --only=production

# Copy the rest of the code
COPY . .

# Build the TypeScript code
RUN npm run build

# Generate Prisma Client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Generate Prisma client (required if using Prisma)
RUN npx prisma generate

# Start the server
CMD ["npm", "start"]