export const sortPeople = (people = [], order = 'ASC') => {
  const sortingPeople = people

  sortingPeople.sort((personA, personB) => {
    const personAName = personA.name.toLowerCase()
    const personBName = personB.name.toLowerCase()

    if (personAName < personBName) {
      return order === 'ASC' ? -1 : 1
    }

    if (personAName > personBName) {
      return order === 'ASC' ? 1 : -1
    }

    return 0
  })

  return sortingPeople
}

export const filterPeople = (people = [], filter = '') => {
  return people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
}
