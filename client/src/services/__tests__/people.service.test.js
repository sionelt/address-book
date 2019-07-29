import mockAxios from 'axios'

import People from '../people.service'

describe('fetch people', () => {
  const mockPerson = {
    id: 1,
    name: 'Adam Wright',
    title: 'Software Developer',
    phone: '919-555-5555',
    email: 'adam.wright@mycompany.com',
    education: [
      {
        institution: 'NC State University',
        startYear: 2001,
        endYear: 2004,
        degree: "Bachelor's, Computer Science",
      },
      {
        institution: 'NC State University',
        startYear: 2004,
        endYear: 2005,
        degree: "Master's, Computer Science",
      },
    ],
    workExperience: [
      {
        institution: 'Megacorp',
        startYear: 2001,
        title: 'Software Developer',
      },
      {
        institution: 'Umbrella Corp',
        startYear: 1980,
        endYear: 2001,
        title: 'Software Developer',
      },
    ],
  }

  it('fetch all people', async () => {
    const mockGetResponse = {
      data: {
        people: [mockPerson],
      },
    }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockGetResponse))

    const data = await People.getAll()

    expect(data).toEqual(mockGetResponse.data)
  })

  it('fetch one person by id', async () => {
    const { id: personId } = mockPerson
    const mockGetResponse = {
      data: {
        person: mockPerson,
      },
    }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockGetResponse))

    const data = await People.getById(personId)

    expect(data).toEqual(mockGetResponse.data)
  })
})
