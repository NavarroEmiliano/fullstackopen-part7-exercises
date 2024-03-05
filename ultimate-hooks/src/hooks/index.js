import axios from "axios"
import { useEffect, useState } from "react"

export const useField = type => {
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

export const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const { data } = await axios.get(baseUrl)
    return data
  }

  const create = async resource => {
    const { data } = await axios.post(baseUrl, resource)
    setResources([...resources, data])
  }

  const service = {
    create,
    getAll
  }

  useEffect(()=>{
    if(!resources.length){
      const firstSetResourses = async ()=>{
        const response = await getAll()
        setResources(response)
      }
      firstSetResourses()
    }
  },[])

  return [resources, service]
}