import Api from './api.service'


const getAll = async () => {
  try {
    const { data } = await Api.get('people')

    return data
  } catch (error) {
    throw new Error(error.message || 'Failed to get contacts')
  }
}

const getById = async personId => {
  try {
    const { data } = await Api.get(`people/${personId}`)

    return data
  } catch (error) {
    throw new Error(error.message || 'Failed to get a contact')
  }
}

export default {
  getAll,
  getById
}
