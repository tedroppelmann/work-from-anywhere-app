import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout, analytics } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { logEvent } from "firebase/analytics";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUserName();
    }
  }, [user, loading]);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const becomeMember = () => {
    logEvent(analytics, 'click_on_sign_up');
    navigate('/sign_up');
  }

  //OJO ACA no funciona bien
  if (!loading) {
    return (
      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
  
        <div class="navbar-brand">
          <a class="navbar-item" onClick={() => navigate('/')}>
            <h1 class="title is-4">Work from Anywhere</h1>
          </a>
  
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
  
        <div class="navbar-menu">
          <div class="navbar-start">
  
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              {user?
                <div class="buttons">
                  <button class="button is-light" onClick={() => navigate('/profile/next_bookings')}>
                    <strong>{name}</strong>
                  </button>
                  <button class="button is-danger" onClick={logout}>
                    <strong>Log Out</strong>
                  </button>
                </div>
              :
                <div class="buttons">
                  {/*
                  <button class="button is-light"  onClick={this}>
                    What is WFA?
                  </button>
                  <button class="button is-light"  onClick={() => navigate('/sign_up_landlord')}>
                    I have a place...
                  </button>
                  */}
                  <button class="button is-info" onClick={becomeMember}>
                    <strong>Become a member</strong>
                  </button>
                  <button class="button is-light"  onClick={() => navigate('/log_in')}>
                    <strong>Log in</strong>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </nav>
    )
  } else {
  return (
    <div></div>
  )
  }
}

export default Header