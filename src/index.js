import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { SessionContext} from "./session";




const HomePage = () => {
  return(
    <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand collapse" to={"/"}>Demo app</Link>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/login"}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/signup"}>Sign up</Link>
            </li>
          </ul>

      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center" style={{marginTop:10+'%'}}>
          <h1 class="mt-5">Demo application for Signup and login</h1>
          <p class="lead">This application is made from React</p>

        </div>
      </div>
    </div>
    </div>
  );
};

const ProfilePage = () => {
  const session = useContext(SessionContext);

  console.log(session.email,session.firstName,session.lastName);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Demo app</Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/logout"}>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h1 class="mt-5">User details</h1>
            <p class="lead">{session.fullName}</p>
            <ul class="list-unstyled">
              <li>Date of birth: {session.birthDate}</li>
              <li>City: {session.city}</li>
              <li>Blood Group: {session.bloodGroup}</li>
              <li>E-mail: {session.email}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

);
}

const LoginPage = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>Demo app</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/signup"}>Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
    <Login/>
    </div>
  );
};
const SignupPage = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>Demo app</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/login"}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
    <Signup/>
    </div>
  );
};
const LogoutPage = () => <Logout/>;

class Page extends React.Component{

  render(){
  return (
    <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Demo app</Link>

        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/logout" component={LogoutPage} />
          </Switch>
        </div>
      </div>
    </div></Router>
    );
  }
}


ReactDOM.render(<Page/>, document.getElementById('root'));
