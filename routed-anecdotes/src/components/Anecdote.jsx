/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
  const { content, author, votes, info } = anecdote
  return (
    <div>
      <h2>
        {content} by {author}
      </h2>
      <div>Has {votes}</div>
      <div>
        For more info see <a href={info}>{info}</a>
      </div>
    </div>
  )
}

export default Anecdote
