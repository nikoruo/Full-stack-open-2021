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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}