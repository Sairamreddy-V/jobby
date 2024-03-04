import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import Header from '../Header'
import Profile from '../Profile'
import JobsCard from '../JobsCard'
import ApiFailureCase from '../ApiFailureCase'

import './index.css'

class JobsPage extends Component {
  state = {
    isProfileApiSuccess: true,
    isProfileLoading: true,
    isJobsListLoading: true,
    isJobsApiSuccess: true,
    profiledata: {},
    jobsData: [],
    checkbox: [],
    isChecked1: false,
    isChecked2: false,
    isChecked3: false,
    isChecked4: false,
    radioElement: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.gettingTheJobs()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('token')
    console.log(token)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    console.log(response.ok)
    if (response.ok) {
      this.setState({
        isProfileApiSuccess: true,
        profiledata: updatedData,
        isProfileLoading: false,
      })
    } else {
      this.setstate({isProfileApiSuccess: false, isProfileLoading: false})
    }
  }

  gettingTheJobs = async () => {
    const {radioElement, searchInput, checkbox} = this.state
    let url
    if (checkbox.length === 0) {
      url = `https://apis.ccbp.in/jobs?employment_type=${"PARTTIME"},${"FULLTIME"},${"FREELANCE"},${"INTERNSHIP"}&minimum_package=${radioElement}&search=${searchInput}`
    } else if (checkbox.length === 1) {
      url = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]}&minimum_package=${radioElement}&search=${searchInput}`
    } else if (checkbox.length === 2) {
      url = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]},${checkbox[1]}&minimum_package=${radioElement}&search=${searchInput}`
    } else if (checkbox.length == 3) {
      url = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]},${checkbox[1]},${checkbox[2]}&minimum_package=${radioElement}&search=${searchInput}`
    } else {
      url = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]},${checkbox[1]},${checkbox[2]},${checkbox[3]}&minimum_package=${radioElement}&search=${searchInput}`
    }
    console.log(url)
    const token = Cookies.get('token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedJobsData = data.jobs.map(eachOne => {
      return {
        companyLogoUrl: eachOne.company_logo_url,
        employmentType: eachOne.employment_type,
        id: eachOne.id,
        jobDescription: eachOne.job_description,
        location: eachOne.location,
        packagePerAnnum: eachOne.package_per_annum,
        title: eachOne.title,
        rating: eachOne.rating,
      }
    })
    if (response.ok) {
      this.setState({
        jobsData: updatedJobsData,
        isJobsListLoading: false,
        isJobsApiSuccess: true,
      })
    } else {
      this.setState({isJobsApiSuccess: false, isJobsApiSuccess: false})
    }
  }

  onCheck1 = () => {
    const {isChecked1} = this.state
    if (isChecked1) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'FULLTIME'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'FULLTIME',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  onCheck2 = () => {
    const {isChecked2} = this.state
    if (isChecked2) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'PARTTIME'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'PARTTIME',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  onCheck3 = () => {
    const {isChecked3} = this.state
    if (isChecked3) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'FREELANCE'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'FREELANCE',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  onCheck4 = () => {
    const {isChecked4} = this.state
    if (isChecked4) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'INTERNSHIP'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'INTERNSHIP',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  checkboxOne = value => {
    this.setState(
      prevState => ({isChecked1: !prevState.isChecked1}),
      this.onCheck1,
      this.gettingTheJobs,
    )
  }

  checkboxTwo = value => {
    this.setState(
      prevState => ({isChecked2: !prevState.isChecked2}),
      this.onCheck2,
      this.gettingTheJobs,
    )
  }

  checkboxThree = value => {
    this.setState(
      prevState => ({isChecked3: !prevState.isChecked3}),
      this.onCheck3,
      this.gettingTheJobs,
    )
  }

  checkboxFour = value => {
    this.setState(
      prevState => ({isChecked4: !prevState.isChecked4}),
      this.onCheck4,
      this.gettingTheJobs,
    )
  }

  onSalaryRange = value => {
    console.log(value)
    this.setState({radioElement: value}, this.gettingTheJobs)
  }

  onSearchButton = event => {
    this.gettingTheJobs()
    this.setState({searchInput: ''})
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetry = () => {
    this.gettingTheJobs()
  }

  filterBlock = () => {
    const {profiledata, isProfileApiSuccess, isProfileLoading} = this.state
    return (
      <Profile
        details={profiledata}
        isSuccess={isProfileApiSuccess}
        firstCheckBox={this.checkboxOne}
        secondCheckBox={this.checkboxTwo}
        thirdCheckBox={this.checkboxThree}
        fourthCheckBox={this.checkboxFour}
        onClickRadio={this.onSalaryRange}
        isLoading={isProfileLoading}
      />
    )
  }

  renderJobsSuccessOrFailureCase = () => {
    const {isJobsApiSuccess, jobsData} = this.state
    let noDetails = false
    if (jobsData.length === 0) {
      noDetails = true
    }
    return isJobsApiSuccess ? (
      noDetails ? (
        this.renderNoDetails()
      ) : (
        <ul className="ul-container-jobs">
          {jobsData.map(eachOne => (
            <JobsCard details={eachOne} key={eachOne.id} />
          ))}
        </ul>
      )
    ) : (
      <ApiFailureCase onRetry={this.onClickRetry} />
    )
  }

  renderJobsLoader = () => (
    <div>
      <Loader type="TailSpin" height="50" width="50" color="#ffffff" />
    </div>
  )

  jobsCardBlock = () => {
    const {searchInput, isJobsListLoading} = this.state
    return (
      <div>
        <div className="job-search-container">
          <input
            value={searchInput}
            className="search-input"
            placeholder="Search"
            type="search"
            onChange={this.onSearchChange}
          />
          <button
            data-testid="searchButton"
            className="search-button"
            type="button"
            onClick={this.onSearchButton}
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
        {isJobsListLoading
          ? this.renderJobsLoader()
          : this.renderJobsSuccessOrFailureCase()}
      </div>
    )
  }

  renderNoDetails = () => (
    <div className="failure-view-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  render() {
    const {jobsData} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-page">
          {this.filterBlock()}
          {this.jobsCardBlock()}
        </div>
      </>
    )
  }
}

export default JobsPage
