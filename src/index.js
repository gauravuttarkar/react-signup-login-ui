import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Login from './Login'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const Nav = () => (
  <div>
    <ul>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">Signup</Link></li>
    </ul>
  </div>
);

const HomePage = () => <h1>Home Page</h1>;
const ProfilePage = () => <h1>Profile Page</h1>;
const LoginPage = () => <Login/>;
const SignupPage = () => <Signup/>

class Page extends React.Component{
  // render(){
  //   return(
  //     <div>
  //     <Signup/>
  //     <Login/>
  //     </div>
  //   );
  // }
  render(){
  return (
      <Router>

        <div>
          <Route exact path="/" component={HomePage} />
          <Nav />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/profile" component={ProfilePage} />
        </div>
      </Router>
    );
  }
}


ReactDOM.render(<Page/>, document.getElementById('root'));
