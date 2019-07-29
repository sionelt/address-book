import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './Profile.css'

import People from '../../services/people.service'

const Profile = ({ match }) => {
  const [currentProfile, setCurrentProfile] = useState({})
  const [fetching, setFetchingState] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { person } = await People.getById(match.params.personId)

      setCurrentProfile(person)
      setFetchingState(false)
    })()
  }, [match.params.personId])

  return fetching ? (
    <div className="m-auto">
      <div className="spinner-border text-primary m-2" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="p-3 profile_container">
      <div className="profile_section d-flex">
        <img src={currentProfile.photoUrl} alt="profile avatar" className="profile_photo img-thumbnail" />
        <div className="flex-fill d-flex mx-3 justify-content-center flex-column profile_info">
          <h3 className="text-primary">{currentProfile.name}</h3>
          <div>{currentProfile.title}</div>
          <div>{currentProfile.phone}</div>
          <a href={`mailto:${currentProfile.email}`}>{currentProfile.email}</a>
        </div>
      </div>
      <div className="profile_section">
        <h4 className="text-info">Education</h4>
        <table className="table table-borderless">
          <tbody>
            {currentProfile.education.map(edu => (
              <tr key={edu.endYear}>
                <th scope="row" className="profile_table_main_col">
                  {edu.startYear} - {edu.endYear}
                </th>
                <td>
                  <b>{edu.institution}</b>
                  <div>{edu.degree}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="profile_section">
        <h4 className="text-info">Experience</h4>
        <table className="table table-borderless">
          <tbody>
            {currentProfile.workExperience.map(edu => (
              <tr key={edu.startYear}>
                <th scope="row" className="profile_table_main_col">
                  {edu.startYear}
                </th>
                <td>
                  <b>{edu.institution}</b>
                  <div>{edu.title}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Profile.propTypes = {
  match: PropTypes.object.isRequired,
}

export default Profile
