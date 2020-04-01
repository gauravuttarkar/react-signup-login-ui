import React from 'react';
import useForm from './CustomHooks';
import fire from './fire';
import './css/bootstrap.min.css';
//import './vendor/datepicker/daterangepicker.js';

//Signup component
const Signup = () => {

  //function to create the user, takes in the parameter exists which tells if the email is already taken.
  //Will create the user only if the email is unique
  function createUser(email, exists) {
//If the email is already taken
    if (exists) {
        alert('Email ' + email + ' already exist!');
    }
    //If email is unique then the user is created.
    else{
    var passwordHash = require('password-hash');
    var usersRef = fire.database().ref('users');
    var hashedPassword = passwordHash.generate(`${inputs.password}`);
    //Pushing the values into firebase.
    usersRef.push (
      {
       fullName: `${inputs.fullName}`,
       email:  email,
       password: hashedPassword,
       bloodGroup: `${inputs.bloodGroup}`,
       birthDate: `${inputs.birthDate}`,
       city: `${inputs.city}`,
    });
    alert(`User Created!
       Name: ${inputs.fullName}
       Email: ${inputs.email}`);
  }
};

  //Function to check if the user exists
  async function checkExisting(email) {
    var usersRef = fire.database().ref('users');
    await usersRef.orderByChild("email").equalTo(email).once("value", function(snapshot) {
      var exists = (snapshot.val() !== null);
      createUser(email, exists);
    });
  }


//Callback function after the submission of form.
  async function callbackFunc  () {
    var email = `${inputs.email}`;
    checkExisting(email);//Function to check if email already exists
  }

  //customHook for forms
  const {inputs, handleInputChange, handleSubmit} = useForm({fullName:'', email: '', password:'',bloodGroup:'',city:'',birthDate:''},
                                                                callbackFunc);
  return (
    <div class="login-form">
    <div class="cotainer" style={{marginTop:10+'%'}}>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Signup</div>
                    <div class="card-body">
                        <form  onSubmit={handleSubmit}>
                            <div class="form-group row">
                                <label for="fullName" class="col-md-4 col-form-label text-md-right">Full name</label>
                                <div class="col-md-6">
                                <input type="text" name="fullName" onChange={handleInputChange} value={inputs.fullName} required />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                <input className="form-control" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="city" class="col-md-4 col-form-label text-md-right">City</label>
                                <div class="col-md-6">
                                <input type="text" name="city" onChange={handleInputChange} value={inputs.city} required />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input className="form-control" type="password" name="password" onChange={handleInputChange} value={inputs.password} required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="birthdate" class="col-md-4 col-form-label text-md-right">Birthdate</label>
                                <div class="col-md-6">
                                    <input type="date" max="2002-12-31" id="birthdate" name="birthDate" onChange={handleInputChange} value={inputs.birthDate} required />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="bloodgroup" class="col-md-4 col-form-label text-md-right">Blood group</label>
                                <div class="col-md-4">
                                    <select name="bloodGroup" onChange={handleInputChange} value={inputs.bloodGroup} required >
                                      <option value="" selected disabled hidden>Choose here</option>
                                      <option value="A+">A+</option>
                                      <option value="A-">A-</option>
                                      <option value="B+">B+</option>
                                      <option value="B-">B-</option>
                                      <option value="O+">O+</option>
                                      <option value="O-">O-</option>
                                      <option value="AB+">AB+</option>
                                      <option value="AB-">AB-</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Sign up
                                </button>

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

export default Signup;
