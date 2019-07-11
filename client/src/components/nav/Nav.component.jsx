import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Nav.css'

import { sortPeople, filterPeople } from '../../helpers'
import People from '../../services/people.service'

const Nav = ({ history, match }) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 40,
  })
  const listRef = useRef(null)
  const [peopleList, setPeopleList] = useState([])
  const [peopleFilteredList, setPeopleFilteredList] = useState([])
  const [fetching, setFetchingState] = useState(true)
  const [sortOrder, setSortOrder] = useState('ASC')

  useEffect(() => {
    ;(async () => {
      const { people } = await People.getAll()

      if (people.length) {
        const sortedPeople = sortPeople(people)

        setPeopleList(sortedPeople)
        setPeopleFilteredList(sortedPeople)
        const [firstPerson] = sortedPeople
        history.push(`/${firstPerson.id}`)
      }

      setFetchingState(false)
    })()
  }, [])

  const renderRow = ({ index, key, style, parent }) => {
    const { name: prevPersonName = '' } = peopleFilteredList[index - 1] || {}
    const { id: personId, name: personName } = peopleFilteredList[index]
    const alphabet = prevPersonName[0] !== personName[0] ? personName[0] : ''

    return (
      <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
        <div key={personId} className="nav_item_container" style={style}>
          {alphabet && <div className="p-2 text-info nav_item_alphabet">{alphabet}</div>}
          <NavLink to={`/${personId}`} className="nav_item_link" activeClassName="nav_item_active">
            <div>{personName}</div>
          </NavLink>
        </div>
      </CellMeasurer>
    )
  }

  const onSortClick = () => {
    const updatedSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC'
    const updatedSortedPeople = sortPeople(peopleFilteredList, updatedSortOrder)

    setSortOrder(updatedSortOrder)
    setPeopleFilteredList(updatedSortedPeople)
  }

  const onSearchChange = event => {
    const searched = event.target.value
    const filteredPeople = searched ? filterPeople(peopleList, searched) : peopleList

    listRef.current.forceUpdateGrid()
    setPeopleFilteredList(filteredPeople)
  }

  return (
    <div className="nav_container">
      <div className="d-flex m-2">
        <input type="text" name="search_people" title="search people" placeholder="Search" className="form-control mr-2" onChange={onSearchChange} />
        <button type="button" className="btn btn-light" onClick={onSortClick}>
          <FontAwesomeIcon icon={sortOrder === 'ASC' ? 'sort-alpha-down' : 'sort-alpha-down-alt'} />
        </button>
      </div>

      {fetching ? (
        <div className="spinner-border text-primary m-2" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="nav_list">
          <AutoSizer>
            {({ width, height }) => {
              return (
                <List
                  ref={listRef}
                  width={width}
                  height={height}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowCount={peopleFilteredList.length}
                  rowRenderer={renderRow}
                  overscanRowCount={3}
                />
              )
            }}
          </AutoSizer>
        </div>
      )}
    </div>
  )
}

Nav.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Nav)
