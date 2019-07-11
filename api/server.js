require('colors')
const cors = require('cors')
const express = require('express')

const PeopleCntrl = require('./controllers/people')

const app = express()
const HTTP_PORT = 8080

app.use(cors())

app.get('/api/people/:id', PeopleCntrl.getPersonById)
app.get('/api/people', PeopleCntrl.getAllPeople)

app.listen(HTTP_PORT, function(err) {
  if (err) {
    throw err
  }

  console.log(('HTTP server listening on port ' + HTTP_PORT).green)
  console.log('People data:'.bold + ' http://localhost:' + HTTP_PORT + '/api/people')
})
