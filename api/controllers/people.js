const path = require('path')

const peopleBlob = require(path.join(__dirname, '../data/people.json'))
const people = peopleBlob['people']

function getPersonById(req, res) {
  const id = parseInt(req.params.id, 10)
  const filtered = people.filter(function(person) {
    return person.id === id
  })

  if (filtered.length === 0) {
    res.sendStatus(404)
  } else {
    res.json({
      person: filtered[0],
    })
  }
}

function getAllPeople(req, res) {
  const peopleList = people.map(({ id, name }) => ({ id, name }))

  res.json({
    people: peopleList
    // people: Array(100).fill().map((p, i) => ({ ...peopleList[0], id: i, name: peopleList[0].name + i })),
  })
}

module.exports = {
  getAllPeople,
  getPersonById,
}
