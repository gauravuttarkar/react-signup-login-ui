import React from 'react';
import Cookies from "js-cookie";
const createHistory = require("history").createBrowserHistory;


const Logout = () => {
  Cookies.remove("session");
  let history = createHistory();
  history.push("/");
  let pathUrl = window.location.href;
  window.location.href = pathUrl;



  return (
    <div>Logout</div>
  );
}

export default Logout;
