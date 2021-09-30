const { v4: uuid } = require('uuid')
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server')

require('dotenv').config()

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
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

    allAuthors: async () => await Author.find({}),

    me: (root, args, context) => {
      return context.currentUser
    }

  },

  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({author: root.id})
    }
  },

  //muutoksia aiheuttavat kyselyt
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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

    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET), fGenre: user.favoriteGenre }
    },

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})