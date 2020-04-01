import React from 'react';
import useForm from './CustomHooks';
import fire from './fire';
import './css/bootstrap.min.css';
//import './vendor/datepicker/daterangepicker.js';

//Signup component
const Signup = () => {
// password hashing package
  var passwordHash = require('password-hash');
//Callback function after the submission of form.
  const callbackFunc = () => {

    var userRef = fire.database().ref('users');//User details stored in this path '/users'
    var password = `${inputs.password}`;
    var email = `${inputs.email}`;
    var hashedPassword = passwordHash.generate(password);
    //Pushing the values into firebase.
    userRef.push (
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
                                    <input className="form-control" type="password" name="password" onChange={handleInputChange} value={inputs.password}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="birthdate" class="col-md-4 col-form-label text-md-right">Birthdate</label>
                                <div class="col-md-6">
                                    <input type="date" max="2002-12-31" id="birthdate" name="birthDate" onChange={handleInputChange} value={inputs.birthDate}/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="bloodgroup" class="col-md-4 col-form-label text-md-right">Blood group</label>
                                <div class="col-md-4">
                                    <select name="bloodGroup" onChange={handleInputChange} value={inputs.bloodGroup}>
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
