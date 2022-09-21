import React from "react";

import firebase from "firebase";

function Login() {
  function handleUserLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword("hubertryanofficial@gmail.com", "123456")
      .then(() => console.log("logado"));
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="email" value="hubertryanofficial@gmail.com" />
      <input type="password" value="123456" />
      <input type="button" onClick={handleUserLogin} value="Logar" />
    </div>
  );
}

export default Login;
