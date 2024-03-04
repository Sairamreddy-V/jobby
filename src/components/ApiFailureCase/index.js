import './index.css'

const ApiFailureCase = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }
  return (
    <div className="failure-container">
      <img
        alt="failure view"
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={onClickRetry} className="retry-button">
        Retry
      </button>
    </div>
  )
}

export default ApiFailureCase
