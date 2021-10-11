import { gql } from '@apollo/client'

//kirjailijoiden haku
export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

//kirjojen tiedot -fragmentti
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
    genres
  }
`

//kirjojen haku
export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: String){
    allBooks(genre: $genre, author: $author)  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

//uuden kirjan lis‰‰minen
export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
     ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

//subscription kirjojen lis‰yksen seurannalle
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

${BOOK_DETAILS}
`

//kirjoittajan syntym‰vuoden muokkaus
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
    }
  }
`

//kirjautuminen
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

//k‰ytt‰j‰n tiedot
export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`