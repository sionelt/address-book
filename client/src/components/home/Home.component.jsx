import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => (
  <div className="container m-auto d-flex justify-content-center align-items-center flex-column">
    <FontAwesomeIcon icon="address-book" size="3x" className="text-primary" />
    <h4 className="my-3 text-info">Currently No Contacts</h4>
  </div>
)

export default Home
