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
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan('tiny', {
    skip: function (req, res) { return req.method === "POST" }
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: function (req, res) { return req.method !== "POST" }
}))

let persons = []

//info -sivu
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})

//kaikkien kontaktien haku
app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contacts => {
		res.json(contacts)
	})
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
app.delete('/api/persons/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id)
	.then(result => {
		persons = persons.filter(person => person.id !== id)
		res.status(204).end()
	})
	.catch(error => next(error))    
})
//kontaktikn numeron päivittäminen
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

//id generaattori
const generateId = () => {return Math.floor(Math.random()*1234567890)}

//uuden kontaktin luominen
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === '' || body.name === undefined) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (persons.find(p => body.name === p.name)) {
        return response.status(400).json({
            error: 'name must be unique'
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
		response.json(savedContact)
	})
	
    persons = persons.concat(contact)
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
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})