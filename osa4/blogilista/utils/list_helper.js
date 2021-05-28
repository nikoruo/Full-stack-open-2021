const _ = require('lodash')

//dummy
const dummy = (blogs) => {
  return 1
}

//tykkäyksiä yhteensä
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

//eniten tykkäyksiä
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {
    const reducer = (max, item) => {
      return item.likes >= max.likes
        ? item
        : max
    }
    const current = blogs.reduce(reducer, blogs[0])

    return {
      'title': current.title,
      'author': current.author,
      'likes':current.likes
    }
  }
}

//kirjoittaja, jolla eniten blogeja
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {

    const byAuthor = _.maxBy(_.map(_.countBy(blogs, 'author'), (val, key) => ({ author: key, blogs: val })), 'blogs')

    return {
      'author': byAuthor.author,
      'blogs': byAuthor.blogs
    }
  }
}

//kirjoittaja, jolla eniten tykkäyksiä
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  } else {

    const byAuthor = _(blogs).countBy('author')
    const author = byAuthor.map(a => a)

    const test = _(blogs).groupBy('author')
    const maara = test.map(a => a)

    console.log('TESTITESTITESTITESTI', JSON.stringify(maara))

    return {
      'author': Object.keys(author)[0],
      'blogs': author.Object.keys(author)[0]
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}