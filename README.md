# Expense-Tracker-Node

---

A Node.js expense tracking application with PostgreSQL database and Prisma ORM.

<hr style="border: 1px solid slategray;">

#### 🐳 Getting Started with Docker Compose

##### 🔧 Prerequisites
Make sure you have the following installed:

* [Docker](https://www.docker.com/products/docker-desktop/)

* [Docker Compose](https://docs.docker.com/compose/)

<hr style="border: 1px solid slategray;">

#### 🚀 Quick Start

##### 1. Clone the Repository

> ⚠️ **Important**: For development and testing, use the `dev` branch!

```bash

git clone https://github.com/Bhone-Wai/Expense-Tracker-Node.git
cd Expense-Tracker-Node
```

##### 2. Environment Setup
Create a .env file using the example template:

```bash

# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydb"
```

##### 3. Development Setup
Start the Development Environment

```bash

# Build and start all services
docker-compose -f docker-compose.dev.yml up --build

# Or run in background (detached mode)
docker-compose -f docker-compose.dev.yml up -d
```

**Database Setup** 
<br>
After the containers are running, set up the database:

````bash
# Generate Prisma client
docker exec -it expense-tracker-node npx prisma generate

# Push database schema (for development)
docker exec -it expense-tracker-node npx prisma db push

# OR run migrations (recommended for production-like setup)
docker exec -it expense-tracker-node npx prisma migrate dev --name init
````

#### 4. Access the Application

* Backend API: http://localhost:3000
* Prisma Studio: http://localhost:5555 (Database management UI)
* PostgreSQL: localhost:5432 (if you need direct database access)

<hr style="border: 1px solid slategray;">

#### 📁 Project Structure

````
expense-tracker/
├── src/                    # Source code
├── prisma/                 # Database schema and migrations
├── docker-compose.yml      # Production configuration
├── docker-compose.dev.yml  # Development configuration
├── Dockerfile             # Container build instructions
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (create this)
├── .env.example          # Environment variables template
└── README.md             # This file
````