# GraphQL API with MongoDB

A simple GraphQL API that demonstrates CRUD operations using Node.js, Express, GraphQL, and MongoDB.

## Prerequisites

- Node.js
- MongoDB running locally on port 27017

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=graphql
PORT=4000
```

4. Start the server:
```bash
node index.js
```

The GraphQL playground will be available at `http://localhost:4000/graphql`

## Available Operations

### Queries

1. Get all users:
```graphql
query {
  getAllUsers {
    id
    name
    email
    age
  }
}
```

2. Get a specific user by ID:
```graphql
query {
  getUser(id: "user_id_here") {
    name
    email
    age
  }
}
```

### Mutations

1. Create a new user:
```graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com", age: 30) {
    id
    name
    email
    age
  }
}
```

2. Update a user:
```graphql
mutation {
  updateUser(
    id: "user_id_here"
    name: "John Updated"
    email: "john.updated@example.com"
    age: 31
  ) {
    id
    name
    email
    age
  }
}
```

3. Delete a user:
```graphql
mutation {
  deleteUser(id: "user_id_here")
}
```

## Project Structure

- `index.js` - Main application file with GraphQL schema and resolvers
- `config/db.js` - MongoDB connection configuration
- `models/User.js` - Mongoose User model
- `.env` - Environment variables (not tracked in git)

## Schema

### User Type
```graphql
type User {
  id: ID!        # Unique identifier (required)
  name: String!  # User's name (required)
  email: String! # User's email (required, unique)
  age: Int       # User's age (optional)
}
```

## Error Handling

- The API includes error handling for:
  - Duplicate email addresses
  - Invalid MongoDB IDs
  - Database connection errors
  - Required field validation
