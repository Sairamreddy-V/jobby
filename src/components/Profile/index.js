import Loader from 'react-loader-spinner'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Profile = props => {
  const {
    details,
    isSuccess,
    firstCheckBox,
    secondCheckBox,
    thirdCheckBox,
    fourthCheckBox,
    onClickRadio,
    isLoading,
  } = props
  const {profileImageUrl, name, shortBio} = details

  const onChangeCheckBox = event => {
    const value = event.target.value
    console.log(value)
    switch (value) {
      case 'FULLTIME':
        return firstCheckBox(value)
      case 'PARTTIME':
        return secondCheckBox(value)
      case 'FREELANCE':
        return thirdCheckBox(value)
      default:
        return fourthCheckBox(value)
    }
  }

  const onRadioClick = event => {
    onClickRadio(event.target.value)
  }

  const returnEmployement = () => (
    <div className="sub-filtermain-container">
      <h1 className="filterHeading">Type of Employment</h1>
      <ul className="filter-ul-container">
        {employmentTypesList.map(eachOne => (
          <li className="filter-list-container" key={eachOne.employmentTypeId}>
            <input
              value={eachOne.employmentTypeId}
              type="checkbox"
              onChange={onChangeCheckBox}
              id={eachOne.employmentTypeId}
            />
            <label
              label={eachOne.label}
              className="filter-label-element"
              htmlFor={eachOne.employmentTypeId}
            >
              {eachOne.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const returnSalaryRange = () => (
    <div className="sub-filtermain-container">
      <h1 className="filterHeading">Type of Employment</h1>
      <ul className="filter-ul-container">
        {salaryRangesList.map(eachOne => (
          <li className="filter-list-container" key={eachOne.salaryRangeId}>
            <input
              value={eachOne.salaryRangeId}
              type="radio"
              name="salaryRange"
              onClick={onRadioClick}
              id={eachOne.salaryRangeId}
            />
            <label
              label={eachOne.label}
              className="filter-label-element"
              htmlFor={eachOne.salaryRangeId}
            >
              {eachOne.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderProfileDetails = () =>
    isSuccess ? (
      <div>
        <img
          alt="profile"
          className="profile-image"
          alt={name}
          src={profileImageUrl}
        />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    ) : (
      <button className="try-again-button">Retry</button>
    )

  const renderLoader = () => (
    <div>
      <Loader type="ThreeDots" height="50" width="50" color="#ffffff" />
    </div>
  )

  return (
    <div className="filter-container">
      <div className="card-container">
        {isLoading ? renderLoader() : renderProfileDetails()}
      </div>
      <hr className="filter-hr-line" />
      {returnEmployement()}
      <hr className="filter-hr-line" />
      {returnSalaryRange()}
    </div>
  )
}

export default Profile
