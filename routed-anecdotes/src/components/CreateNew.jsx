/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = props => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    navigate('/')
  }

  const handleReset = e => {
    e.preventDefault()
    content.resetInput()
    author.resetInput()
    info.resetInput()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content.props} />
        </div>
        <div>
          Author
          <input {...author.props} />
        </div>
        <div>
          Url for more info
          <input {...info.props} />
        </div>
        <button>Create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

export default CreateNew
