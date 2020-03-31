import React from 'react';
import useSignUpForm from './CustomHooks';
import fire from './fire';


const Signup = () => {

  var passwordHash = require('password-hash');


  const callbackFunc = () => {
    var userRef = fire.database().ref('users');
    var password = `${inputs.password1}`;
    var email = `${inputs.email}`;
    console.log(password);
    var hashedPassword = passwordHash.generate(password);
    userRef.push (
      {
       firstName: `${inputs.firstName}`,
       lastName: `${inputs.lastName}` ,
       email:  email,
       password: hashedPassword
    });


    alert(`User Created!
       Name: ${inputs.firstName} ${inputs.lastName}
       Email: ${inputs.email}`);
  }
  const {inputs, handleInputChange, handleSubmit} = useSignUpForm({firstName: '', lastName: '', email: '', password1: '', password2: ''},
                                                                callbackFunc);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" onChange={handleInputChange} value={inputs.firstName} required />
        <label>Last Name</label>
        <input type="text" name="lastName" onChange={handleInputChange} value={inputs.lastName} required />
      </div>
      <div>
        <label>Email Address</label>
        <input type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password1" onChange={handleInputChange} value={inputs.password1}/>
      </div>
      <div>
        <label>Re-enter Password</label>
        <input type="password" name="password2" onChange={handleInputChange} value={inputs.password2}/>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
