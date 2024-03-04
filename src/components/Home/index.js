import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-main-container">
      <Header />
      <div className="home-text-container">
        <div className="text-container">
          <h1 className="home-heading">Find The Job That Fits Your Life </h1>
          <p className="home-description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential.{' '}
          </p>
          <Link className="link-item" to="/jobs">
            <button className="home-button">Find Jobs</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
