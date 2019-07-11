import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import './Nav.css'

import People from '../../services/people.service'

const Nav = ({ history }) => {
  const [peopleList, setPeopleList] = useState([])
  const [fetching, setFetchingState] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { people } = await People.getAll()

      setPeopleList(people)
      setFetchingState(false)

      if (people.length) {
        const [firstPerson] = people
        history.push(`/${firstPerson.id}`)
      }
    })()
  }, [])

  return (
    <div className="nav_container">
    {peopleList.map(item => (
      <Link to={`/${item.id}`} key={item.id}>
        <div>{item.name}</div>
      </Link>
    ))}
    </div>
  )
}

Nav.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(Nav)
