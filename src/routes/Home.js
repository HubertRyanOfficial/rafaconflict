import React from "react";

import firebase from "firebase";

function Home() {
  const user = firebase.auth().currentUser;

  return (
    <div>
      <h1>Olá, {user.email}</h1>
      <input
        type="button"
        value="Sair"
        onClick={() => firebase.auth().signOut()}
      />
    </div>
  );
}

export default Home;
