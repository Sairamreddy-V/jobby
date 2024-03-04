import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {MdWork} from 'react-icons/md'

import './index.css'

const JobsCard = props => {
  const {details, small} = props
  const {
    id,
    companyLogoUrl,
    title,
    location,
    rating,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = details

  const containerClassName = small
    ? 'small-card-main-container'
    : 'card-main-container'
  const altName=small ? "similar job company logo":"company logo"
  return (
    <Link className="link-item" to={`/jobs/${id}`}>
      <li className={containerClassName}>
        <div className="img-title-rating-container">
          <img
            alt={altName}
            className="job-card-img"
            src={companyLogoUrl}
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="location-employeType-container">
              <MdLocationOn className="jobs-card-icon" />
              <p className="location-text">{location}</p>
            </div>
            <div className="location-employeType-container">
              <MdWork className="jobs-card-icon" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="anuual-package-text">{packagePerAnnum}</p>
        </div>
        <hr className="jobs-card-hr-line" />
        <div>
          <p className="description-heading">Description</p>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
