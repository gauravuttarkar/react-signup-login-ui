import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { SessionContext} from "./session";

const Nav = () => (
  <div>
    <ul>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Signup</Link></li>
    </ul>
  </div>
);



const HomePage = () => <h1>Home Page</h1>;

const ProfilePage = () => {
  const session = useContext(SessionContext);

  console.log(session.email,session.firstName,session.lastName);
  return (
    <div>
    <li><Link to="/logout">Logout</Link></li>
    <h1>Profile Page</h1>
    <p>Name: {session.firstName} {session.lastName}</p>
    </div>
);
}

const LoginPage = () => <Login/>;
const SignupPage = () => <Signup/>;
const LogoutPage = () => <Logout/>;

class Page extends React.Component{
  render(){
  return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Nav />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/logout" component={LogoutPage} />
        </div>
      </Router>
    );
  }
}


ReactDOM.render(<Page/>, document.getElementById('root'));
