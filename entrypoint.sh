#!/bin/sh

echo "⏳ Waiting for Postgres to accept connections using Prisma..."

# Try Prisma migration until success
until npx prisma migrate deploy; do
  echo "🔁 Migration failed (DB may not be ready yet) — retrying in 3 seconds..."
  sleep 3
done

echo "✅ Migration successful"

echo "🚀 Starting application..."
exec "$@"
