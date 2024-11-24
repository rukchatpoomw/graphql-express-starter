const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const connectDB = require('./config/db');
const User = require('./models/User');

// Connect to MongoDB
connectDB();

// Define GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    hello: String
    add(a: Int!, b: Int!): Int
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): String
  }
`);

// Define resolvers
const root = {
  hello: () => {
    return 'Hello, GraphQL!';
  },
  add: ({ a, b }) => {
    return a + b;
  },
  getUser: async ({ id }) => {
    try {
      return await User.findById(id);
    } catch (err) {
      throw new Error('Error fetching user');
    }
  },
  getAllUsers: async () => {
    try {
      return await User.find();
    } catch (err) {
      throw new Error('Error fetching users');
    }
  },
  createUser: async ({ name, email, age }) => {
    try {
      const user = new User({ name, email, age });
      console.log('Creating user:', { name, email, age });
      
      return await user.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(`Email ${email} is already registered`);
      }
      console.log('err:', err);
      throw new Error('Error creating user');
    }
  },
  updateUser: async ({ id, name, email, age }) => {
    try {
      return await User.findByIdAndUpdate(
        id,
        { name, email, age },
        { new: true, runValidators: true }
      );
    } catch (err) {
      throw new Error('Error updating user');
    }
  },
  deleteUser: async ({ id }) => {
    try {
      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    } catch (err) {
      throw new Error('Error deleting user');
    }
  }
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});