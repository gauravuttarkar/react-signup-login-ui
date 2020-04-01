import React from 'react';
import useSignUpForm from './CustomHooks';
import fire from './fire';
import {setSessionCookie } from "./session";
import {Link} from 'react-router-dom';
const createHistory = require("history").createBrowserHistory;


const Login = () => {

  var passwordHash = require('password-hash');

  async function callbackFunc () {
    var email = `${inputs.email}`;
    var userRef = fire.database().ref('users');
    var hashedPassword,fullName, city, bloodGroup, birthDate;
    await new Promise(resolve => userRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      fullName = snapshot.val().fullName;
      city = snapshot.val().city;
      bloodGroup = snapshot.val().bloodGroup;
      birthDate = snapshot.val().birthDate;
      hashedPassword = snapshot.val().password;
      var password = `${inputs.password}`;
      var result = passwordHash.verify(password, hashedPassword);
      let history = createHistory();
      if (result){
         setSessionCookie({ email,fullName, bloodGroup, birthDate,city });
         history.push("/profile");
         let pathUrl = window.location.href;
         window.location.href = pathUrl;
      }
      else{
        alert(`Wrong password`);
        history.push("/login");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
      };
    }));


  };


  const {inputs, handleInputChange, handleSubmit} = useSignUpForm({email: '', password: ''},
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
                                    <input className="form-control" type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
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
