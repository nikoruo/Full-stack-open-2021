const { v4: uuid } = require('uuid')
const { ApolloServer, gql, UserInputError } = require('apollo-server')

require('dotenv').config()

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })

//GraphQL skeemat
const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

//graphQL kyselyt
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }

      let filteredBooks = Book.find({})      

      if (args.author) {
        const authorId = await Author.findOne({ 'name': args.author })
        filteredBooks = filteredBooks.find({author: authorId.id})
      }
      if (args.genre) {
        filteredBooks = filteredBooks.find({ genres: { $in: [args.genre] } })
      }
      return filteredBooks.populate('author')
    },
    allAuthors: async () => await Author.find({})
  },

  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({author: root.id})
    }
  },

  //muutoksia aiheuttavat kyselyt
  Mutation: {
    addBook: async (root, args) => {

      let author = await Author.findOne({ 'name': args.author })

      if (!author) {
        author = new Author({ name: args.author, id: uuid(), bookCount: 1 })
        try {
          await author.save()
        } catch (error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }               
      }

      const book = new Book({ ...args, id: uuid(), author: author })
      try {
        await book.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    editAuthor: async (root, args) => {
      let author = await Author.findOne({ 'name': args.name })

      if (!author) {
        return null
      }

      try {
        author = await Author.findOneAndUpdate({ name: author.name }, { born: args.setBornTo }, { new: true })
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})