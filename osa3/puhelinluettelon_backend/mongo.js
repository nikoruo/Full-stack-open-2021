const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.fytww.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const name = process.argv[3]
const number = process.argv[4]

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length===3) {

  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(contacts => {
      console.log(`${contacts.name} ${contacts.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length===5) {

  const contact = new Contact({
    name: name,
    number: number,
  })

  contact.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}



