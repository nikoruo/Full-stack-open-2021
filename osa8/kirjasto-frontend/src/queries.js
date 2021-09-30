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

//kirjojen haku
export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: String){
    allBooks(genre: $genre, author: $author)  {
      title
      author {
        name
      }
      published
      genres
    }
  }
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
      title
      author{
        name
      }
      published
      genres
    }
  }
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
    me  {
      username
      favoriteGenre
    }
  }
`