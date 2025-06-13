# node_crude

# 🧩 Node.js CRUD API with Docker Support

A simple, modular Node.js + Express REST API with MVC file structure and full CRUD functionality, filtering, `.env` support, Dockerfile, and `docker-compose.yml`.

---

## Features

- Modular MVC architecture
- Full CRUD operations (Create, Read, Update, Delete)
- Filtering and querying support
- Environment variable configuration via `.env`
- Dockerized application with `Dockerfile`
- Easy setup using `docker-compose.yml`

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Docker](https://www.docker.com/get-started) (for containerization)
- [Docker Compose](https://docs.docker.com/compose/install/) (optional, for multi-container management)

### Installation

1. Clone the repo:

        git clone https://github.com/Vishaltalsaniya-7/node_crude.git

        cd node_crude

2. Install dependencies:

            npm install

3. Create a .env file in the root directory and add your environment variables:

        PORT=3000
        DATABASE_URL=your_database_connection_string

4. Running Locally

        npm start

    The API will be available at http://localhost:3000.

5. Build and Run with Docker

        docker-compose up

6. API Endpoints

        GET /products Get all items (filter by id, name, pagination supported)

        POST /products Create new item

        PUT /products/:id Update item by ID

        DELETE /products/:id Delete item by ID

7. Environment Variables

    PORT — Port on which the server runs (default: 3000)

    DATABASE_URL — Database connection string

### License
MIT © Vishaltalsaniya

### Contact
Feel free to open issues or submit pull requests!
Reach me at: vishaltalsaniya991@gmail.com
