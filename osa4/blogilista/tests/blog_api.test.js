const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  //testejä backendiin
  describe('blog GET general tests', () => {
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

  describe('blog GET specific blog tests', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
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
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const blogs = blogsAtEnd.map(r => r.title)

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogs).toContain(
        'async/await simplifies making async calls'
      )
    })
    test('a blog with no likes gets 0 likes ', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'blog POST test',
        url: 'https://developer.cdn.mozilla.net/en-US/docs/Learn/JavaScript/Asynchronous/Async_await'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const blogs = blogsAtEnd.map(r => r.title)

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogs).toContain(
        'async/await simplifies making async calls'
      )
    })
    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        url: 'https://developer.cdn.mozilla.net/en-US/docs/Learn/JavaScript/Asynchronous/Async_await',
        likes: 100
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const contents = blogsAtEnd.map(r => r.title)

      expect(contents).not.toContain(blogToDelete.title)
    })
  })
  describe('updating of a blog', () => {
    test('succeeds with status code 204', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        title: blogsAtStart[0].title,
        author: blogsAtStart[0].author,
        url: blogsAtStart[0].url,
        likes: blogsAtStart[0].likes + 50,
        id: blogsAtStart[0].id
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      expect(blogToUpdate.likes).toBe(blogsAtEnd[0].likes)
    })
    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        url: 'https://developer.cdn.mozilla.net/en-US/docs/Learn/JavaScript/Asynchronous/Async_await',
        likes: 100
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})