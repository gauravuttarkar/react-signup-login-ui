import React from 'react';
import useForm from './CustomHooks';
import fire from './fire'; //Firebase config is stored in fire.js
import {setSessionCookie } from "./session";
import {Link} from 'react-router-dom';
const createHistory = require("history").createBrowserHistory;

// Login component
const Login = () => {

  function userExistsCallback(userId, exists) {
    if (!exists) {
        alert('user ' + userId + ' does not exist!');
    }
  }

  //Function to check if the user exists
  function checkIfUserExists(email) {
    var usersRef = fire.database().ref('users');
    usersRef.orderByChild("email").equalTo(email).once("value", function(snapshot) {
      var exists = (snapshot.val() !== null);
      userExistsCallback(email, exists);
    });
  }
  // password hashing package
  var passwordHash = require('password-hash');
// Async function to wait for the query to fetch from firebase
  async function callbackFunc () {
    var email = `${inputs.email}`;
    checkIfUserExists(email); //Function to check if the user exists
    var password = `${inputs.password}`;
    var userRef = fire.database().ref('users');//User details stored in this path '/users'
    var hashedPassword,fullName, city, bloodGroup, birthDate;
    //Awaiting a promise until the query is resolved
    //Query to fetch the user details matching the given email.
    await new Promise(resolve => userRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      //Storing the response of the query in variables.
      fullName = snapshot.val().fullName;
      city = snapshot.val().city;
      bloodGroup = snapshot.val().bloodGroup;
      birthDate = snapshot.val().birthDate;
      hashedPassword = snapshot.val().password;
      //verifying the fetched hashedPassword with the given password.
      var result = passwordHash.verify(password, hashedPassword);

      let history = createHistory();
      //if password is correct, login
      if (result){
        //Setting cookies using the user details
         setSessionCookie({ email,fullName, bloodGroup, birthDate,city });
        //Redirecting to the profile
         history.push("/profile");
         let pathUrl = window.location.href;
         window.location.href = pathUrl;
      }
      else{
        //If the password is wrong.
        alert(`Wrong password`);
        //Redirect to login package
        history.push("/login");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
      };
    }));


  };

  //Using customHook useSignUpForm
  const {inputs, handleInputChange, handleSubmit} = useForm({email: '', password: ''},
                                                                callbackFunc);
  return (
    <div class="login-form">
    <div class="cotainer" style={{marginTop:10+'%'}}>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form  onSubmit={handleSubmit}>
                            <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                <input className="form-control" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />

                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input className="form-control" type="password" name="password" onChange={handleInputChange} value={inputs.password} required/>
                                </div>
                            </div>


                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
                                <div class="btn btn-link">
                                       <Link className="navbar-brand" to={"/signup"}>New user?</Link>
                                </div>
                            </div>
                      </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>

  );
}

export default Login;
