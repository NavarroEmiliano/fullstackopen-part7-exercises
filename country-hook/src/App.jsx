import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = name => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/name/${name}`)
        return {
          data: {
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png
          },
          found: true
        }
      } catch (error) {
        return { found: false }
      }
    }

    if (name) {
      const toSetCountry = async () =>{
        const response = await getCountry()
        setCountry(response)
      }
      toSetCountry()
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>Capital {country.data.capital} </div>
      <div>Population {country.data.population}</div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = e => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
