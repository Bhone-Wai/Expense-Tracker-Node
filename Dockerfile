FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for faster cache
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Generate Prisma client (required if using Prisma)
RUN npx prisma generate

# Start the server
CMD ["npm", "run", "dev"]