
# Simple Product Management API

## Requirements

- Node.js
- MySQL
- XAMPP

## Setup Instructions

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a MySQL database called `product_db` and configure your database connection in `config/database.js`.
4. Run the migrations:

```bash
sequelize db:migrate
```

5. Start the server:

```bash
npm start
```

The API will be running at `http://localhost:5000`.

### API Endpoints

- `POST /products` - Create a new product.
- `GET /products` - Get all products (supports pagination and search).
- `GET /products/:id` - Get a product by ID.
- `PUT /products/:id` - Update a product.
- `DELETE /products/:id` - Delete a product by ID.

### Error Handling

Appropriate error handling and status codes are used for missing fields, invalid IDs, etc.
    