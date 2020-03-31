import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Login from './Login'

class Page extends React.Component{
  render(){
    return(
      <div>
      <Signup/>
      <Login/>
      </div>
    );
  }
}


ReactDOM.render(<Page/>, document.getElementById('root'));
