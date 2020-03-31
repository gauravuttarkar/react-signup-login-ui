import React from 'react';
import useSignUpForm from './CustomHooks';
import fire from './fire';
const createHistory = require("history").createBrowserHistory;
// import { useHistory }

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
      console.log("hi "+snapshot.val().password);
      var password = `${inputs.password}`;
      console.log(password)
      var result = passwordHash.verify(password, hashedPassword);
      console.log(result);
      let history = createHistory();

      // userRef.push ({
      //    firstName: `${inputs.firstName}`,
      //    lastName: `${inputs.lastName}` ,
      //    email:  `${inputs.email}`,
      //    password: hashedPassword
      // });
      if (result){
      alert(`Successfull login!
         Email: ${inputs.email}`);
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
  // const callbackFunc = () => {
  //   var email = `${inputs.email}`;
  //   var userRef = fire.database().ref('users');
  //   var hashedPassword,firstName,lastName;
  //   var query = userRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
  //     firstName = snapshot.val().firstName;
  //     lastName = snapshot.val().lastName;
  //     hashedPassword = snapshot.val().password;
  //     console.log("hi "+snapshot.val().password);
  //   });
  //
  //   var password = `${inputs.password}`;
  //   console.log(password)
  //   var result = passwordHash.verify(password, hashedPassword);
  //   console.log(result);
  //   // userRef.push ({
  //   //    firstName: `${inputs.firstName}`,
  //   //    lastName: `${inputs.lastName}` ,
  //   //    email:  `${inputs.email}`,
  //   //    password: hashedPassword
  //   // });
  //   if (result){
  //   alert(`Successfull login!
  //      Email: ${inputs.email}`);
  //   }
  //   else{
  //     alert(`Wrong password`);
  //   };
  // };
  //



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
