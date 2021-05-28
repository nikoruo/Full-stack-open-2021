const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

//testejä backendiin
describe('blog GET tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('all blogs are identified by id', async () => {
    const response = await api.get('/api/blogs')
    //response.body.forEach(b => console.log(b.id)) forEach -tutkiskelua
    response.body.forEach(b => expect(b.id).toBeDefined())
  })
})

describe('blog POST tests', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'blog POST test',
      url:'https://developer.cdn.mozilla.net/en-US/docs/Learn/JavaScript/Asynchronous/Async_await',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const blogs = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs).toContain(
      'async/await simplifies making async calls'
    )
  })

})

afterAll(() => {
  mongoose.connection.close()
})