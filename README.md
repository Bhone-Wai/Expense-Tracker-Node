# Expense Tracker API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/travis/com/Bhone-Wai/Expense-Tracker-Node.svg?style=flat-square)](https://travis-ci.com/Bhone-Wai/Expense-Tracker-Node)
[![Issues](https://img.shields.io/github/issues/Bhone-Wai/Expense-Tracker-Node.svg?style=flat-square)](https://github.com/Bhone-Wai/Expense-Tracker-Node/issues)

A powerful and flexible expense tracking API built with Node.js, Express, and Prisma. Track your income, expenses, and budgets with ease.

## About The Project

This project provides a robust backend for an expense tracking application. It'''s designed to be scalable, easy to use, and simple to deploy with Docker.

### Built With

*   [Node.js](https://nodejs.org/)
*   [Express](https://expressjs.com/)
*   [Prisma](https://www.prisma.io/)
*   [PostgreSQL](https://www.postgresql.org/)
*   [Docker](https://www.docker.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

*   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Bhone-Wai/Expense-Tracker-Node.git
    cd Expense-Tracker-Node
    ```

2.  **Set up your environment variables:**
    Create a `.env` file by copying the example file.
    ```sh
    cp .env.example .env
    ```
    Update the `DATABASE_URL` in your new `.env` file if needed. The default is:
    ```
    DATABASE_URL="postgresql://postgres:postgres@postgres:5432/mydb"
    ```

3.  **Launch the development environment:**
    Use the development Docker Compose file to build and start the services.
    ```sh
    docker-compose -f docker-compose.dev.yml up --build -d
    ```

4.  **Set up the database:**
    Once the containers are running, you need to initialize the database.

    *   **Generate the Prisma client:**
        ```sh
        docker exec -it expense-tracker-node npx prisma generate
        ```

    *   **Apply the database schema:**
        You can either push the schema directly (for development) or run migrations.
        ```sh
        # Push the schema (quick and easy for dev)
        docker exec -it expense-tracker-node npx prisma db push

        # Or run migrations (recommended)
        docker exec -it expense-tracker-node npx prisma migrate dev --name init
        ```

## Usage

Once the application is running, you can access the following services:

*   **API Endpoint:** `http://localhost:3000`
*   **Prisma Studio:** `http://localhost:5555` (A GUI for your database)
*   **PostgreSQL Port:** `5432` (For direct database connections)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m '''Add some AmazingFeature'''`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
