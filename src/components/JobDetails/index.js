import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'
import {IoIosNavigate} from 'react-icons/io'

import {MdWork} from 'react-icons/md'

import Header from '../Header'

import Skills from '../Skills'
import ApiFailureCase from '../ApiFailureCase'

import JobsCard from '../JobsCard'

import './index.css'

class JobDetails extends Component {
  state = {
    isLoading: true,
    jobDetails: [],
    similarJobs: [],
    isApiSuccess: true,
    skills: [],
  }

  componentDidMount() {
    this.gettingJobDetails()
  }

  gettingJobDetails = async () => {
    const {id} = this.props.match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onApiSuccess(data)
    } else {
      this.onApiFailure()
    }
  }

  onApiSuccess = data => {
    const updatedJobDetails = {
      companyLogoUrls: data.job_details.company_logo_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      title: data.job_details.title,
      rating: data.job_details.rating,
      skills: data.job_details.skills,
      webSiteUrl: data.job_details.company_website_url,
      lifeAtCompany: data.job_details.life_at_company,
    }
    const similarJobs = data.similar_jobs.map(eachOne => {
      return {
        companyLogoUrl: eachOne.company_logo_url,
        employmentType: eachOne.employment_type,
        id: eachOne.id,
        jobDescription: eachOne.job_description,
        location: eachOne.location,
        title: eachOne.title,
        rating: eachOne.rating,
      }
    })
    const updatedSkills = updatedJobDetails.skills.map(eacItem => ({
      name: eacItem.name,
      imageUrl: eacItem.image_url,
    }))

    this.setState({
      isLoading: false,
      similarJobs,
      jobDetails: updatedJobDetails,
      isApiSuccess: true,
      skills: updatedSkills,
    })
  }

  onApiFailure = () => {
    this.setState({isLoading: false, isApiSuccess: false})
  }

  renderjobDetails = () => {
    const {isApiSuccess} = this.state
    return isApiSuccess ? this.jobDetailsSucess() : this.jobDetailsFailure()
  }

  jobDetailsSucess = () => {
    const {jobDetails, similarJobs, skills} = this.state
    return (
      <div className="main-container">
        <div className="card-main-containers">
          <div className="img-title-rating-container">
            <img
              alt="job details company logo"
              className="job-card-img"
              src={jobDetails.companyLogoUrls}
            />
            <div>
              <h1 className="job-title">{jobDetails.title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="location-type-container">
              <div className="location-employeType-container">
                <MdLocationOn className="jobs-card-icon" />
                <p className="location-text">{jobDetails.location}</p>
              </div>
              <div className="location-employeType-container">
                <MdWork className="jobs-card-icon" />
                <p>{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="anuual-package-text">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="jobs-card-hr-line" />
          <div>
            <div className="description-anchor-container">
              <h1 className="description-heading">Description</h1>
              <div className="navigate-container">
                <a className="anchor-url" href={jobDetails.webSiteUrl}>
                  Visit
                </a>
                <IoIosNavigate className="navigate" />
              </div>
            </div>
            <p className="description">{jobDetails.jobDescription}</p>
          </div>
          <div>
            <h1 className="skills-container">Skills</h1>
            <ul className="skills-ul-container">
              {skills.map(eacItem => (
                <Skills details={eacItem} key={eacItem.name} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="life-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description ">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                className="life-at-company-url"
                src={jobDetails.lifeAtCompany.image_url}
              />
            </div>
          </div>
          <div>
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <ul className="similar-jobs-container">
              {similarJobs.map(eacItem => (
                <JobsCard small="true" details={eacItem} key={eacItem.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="main-container">
      <Loader type="spinner" height="50" width="50" color="#ffffff" />
    </div>
  )

  jobDetailsFailure = () => <ApiFailureCase onRetry={this.onRetryClick} />

  onRetryClick = () => {
    this.gettingJobDetails()
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? this.renderLoader() : this.renderjobDetails()}
      </>
    )
  }
}

export default JobDetails
