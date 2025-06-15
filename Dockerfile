FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for faster cache
COPY package*.json ./

## Install dependencies (use ci for production)
#RUN npm ci --only=production

# Install dependencies
RUN npm install

# Install ts-node-dev globally
RUN npm install -g ts-node-dev

## Build the TypeScript code
#RUN npm run build

# Copy the rest of the code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]