#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready..."

until npx prisma db pull > /dev/null 2>&1; do
  echo "⏳ Still waiting for database..."
  sleep 2
done

echo "✅ Database is ready. Running migrations..."
npx prisma migrate deploy

echo "🚀 Starting the server..."
npm start