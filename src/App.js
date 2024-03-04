import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import JobsPage from './components/JobsPage'
import JobsDetails from './components/JobDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobsDetails} />
    <Route component={NotFound}/>
  </Switch>
)

export default App
