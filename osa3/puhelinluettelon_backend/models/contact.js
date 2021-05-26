const mongoose = require('mongoose')

//ÄLÄ KOSKAAN TALLETA SALASANOJA githubiin!
const url = process.env.MONGODB_URI

console.log("conneting to", url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const name = process.argv[3]
const number = process.argv[4]

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)