import './index.css'

const Skills = props => {
  const {details} = props
  const {name, imageUrl} = details
  return (
    <li className="skill-cotainer">
      <img className="skill-image" alt={name} src={imageUrl} />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default Skills
