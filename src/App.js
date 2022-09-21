import { BrowserRouter, Routes, Route } from "react-router-dom";

import firebase from "firebase";

import Login from "./routes/Login";
import Home from "./routes/Home";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getVerifyUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }

  async function getVerifyUser(user) {
    const userRef = firebase.firestore().collection("users").doc(user.uid);
    const userData = await userRef.get();

    if (userData.exists) {
      return;
    }

    userRef.set({
      email: user.email,
      emailVerified: user.emailVerified,
    });
  }

  if (loading) {
    return <div>carregado</div>;
  }

  return (
    <BrowserRouter>{!user ? <AuthRoutes /> : <UserRoutes />}</BrowserRouter>
  );
}

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
