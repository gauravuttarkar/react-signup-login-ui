import React from 'react';
import useSignUpForm from './CustomHooks';
import fire from './fire';


const Login = () => {

  var passwordHash = require('password-hash');


  const callbackFunc = () => {
    var email = `${inputs.email}`;
    var userRef = fire.database().ref('users');
    var hashedPassword,firstName,lastName;
    var query = userRef.orderByChild("email").equalTo(email).on("child_added", function(snapshot) {
      firstName = snapshot.val().firstName;
      lastName = snapshot.val().lastName;
      hashedPassword = snapshot.val().password;
    });

    var password = `${inputs.password}`;
    var result = passwordHash.verify(password, hashedPassword);
    console.log(result);
    // userRef.push ({
    //    firstName: `${inputs.firstName}`,
    //    lastName: `${inputs.lastName}` ,
    //    email:  `${inputs.email}`,
    //    password: hashedPassword
    // });
    if (result){
    alert(`Successfull login!
       Email: ${inputs.email}`);
    }
    else{
      alert(`Wrong password`);
    };
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
