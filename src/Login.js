import React from 'react';
import useSignUpForm from './CustomHooks';
import fire from './fire';
import {setSessionCookie } from "./session";

const createHistory = require("history").createBrowserHistory;


const Login = () => {

  var passwordHash = require('password-hash');


  async function callbackFunc () {

    var email = `${inputs.email}`;
    var userRef = fire.database().ref('users');
    var hashedPassword,firstName,lastName;

    await new Promise(resolve => userRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      firstName = snapshot.val().firstName;
      lastName = snapshot.val().lastName;
      hashedPassword = snapshot.val().password;
      var password = `${inputs.password}`;
      var result = passwordHash.verify(password, hashedPassword);
      let history = createHistory();

      if (result){
      alert(`Successfull login!
         Email: ${inputs.email}`);
         setSessionCookie({ email,firstName,lastName });
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
    <form onSubmit={handleSubmit}>

      <div>
        <label>Email Address</label>
        <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
