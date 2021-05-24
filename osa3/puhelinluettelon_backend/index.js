const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan('tiny', {
    skip: function (req, res) { return req.method === "POST" }
}))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: function (req, res) { return req.method !== "POST" }
}))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]
app.get('/', (req, res) => {
    res.send('<h1>Tervetuloa puhelinluetteloon</h1><p>Seuraavat urlit ovat toiminnassa<ul><li>/info</li><li>/api/persons</li><li>/api/persons/id</li></ul>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {

    return Math.floor(Math.random()*1234567890)
}

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

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number        
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})