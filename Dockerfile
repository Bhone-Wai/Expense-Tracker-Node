FROM node:20-slim

# Set working directory
WORKDIR /app

#f Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Copy only package files first for faster cache
COPY package*.json ./

## Install dependencies (use ci for production)
#RUN npm ci --only=production

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci



# Copy entire prisma folder
COPY prisma/ ./prisma/

# Copy rest of the app
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

# Generate Prisma Client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "run", "dev"]