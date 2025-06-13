#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready..."

# Parse DATABASE_URL to extract host and port
DB_HOST=$(echo $DATABASE_URL | grep -oP '(?<=@)[^:]+')
DB_PORT=$(echo $DATABASE_URL | grep -oP '(?<=:)\d+(?=/)') || 5432

# Wait for PostgreSQL (max 30 seconds)
counter=0
max_attempts=15
until pg_isready -h $DB_HOST -p $DB_PORT > /dev/null 2>&1; do
  counter=$((counter + 1))
  if [ $counter -ge $max_attempts ]; then
    echo "❌ Database not ready after $max_attempts attempts. Exiting..."
    exit 1
  fi
  echo "⏳ Waiting for database (attempt $counter/$max_attempts)..."
  sleep 2
done

echo "✅ Database is ready. Running migrations..."
npx prisma migrate deploy

echo "🚀 Starting the server..."
npm start