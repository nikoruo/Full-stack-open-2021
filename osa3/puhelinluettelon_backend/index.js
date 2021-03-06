require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
//alla request logger
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan('tiny', {
  skip: function (req) { return req.method === 'POST' }
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: function (req) { return req.method !== 'POST' }
}))

let persons = []

//info -sivu
app.get('/info', (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.send(`<p>Phonebook has info for ${contacts.length} people</p> <p>${new Date()}</p>`)
  })
    .catch(error => next(error))
})

//kaikkien kontaktien haku
app.get('/api/persons', (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
    .catch(error => next(error))
})

//yksittäisen kontaktin tiedot
app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//kontaktin poistaminen
app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      persons = persons.filter(person => person.id !== req.params.id)
      res.status(204).end()
    })
    .catch(error => next(error))
})
//kontaktikn numeron päivittäminen
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if (body.name === '' || body.name === undefined) {
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (body.number === '' || body.number === undefined) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      if(updatedContact===null){
        persons = persons.filter(person => person.id !== req.body.id)
        return res.status(400).json({
          error: 'user has been deleted'
        })
      }
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

//id generaattori (poistettu käytöstä, koska nyt id tekee tietokanta)
//const generateId = () => {return Math.floor(Math.random()*1234567890)}

//uuden kontaktin luominen
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === '' || body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (body.number === '' || body.number === undefined) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact => {
    persons = persons.concat(contact)
    response.json(savedContact)
  })
    .catch(error => next(error))
})

// olemattomien osoitteiden käsittely
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// virheellisten pyyntöjen käsittely
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return res.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})