import React from 'react'
import PropTypes from 'prop-types'

import './Profile.css'

const Profile = ({ match }) => <div className="profile_container">Profile: {match.params.personId}</div>

Profile.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Profile
