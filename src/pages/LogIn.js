import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, analytics } from "../Firebase";
import { logEvent } from "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  const becomeMember = () => {
    logEvent(analytics, 'click_on_sign_up');
    navigate('/sign_up');
  }

  return (
    <div className="section is-medium">
      <div className='box column is-half is-offset-one-quarter'>
        <h1 className="title">Log in</h1>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input 
              className="input" 
              type="email" 
              placeholder="e.g. alexsmith@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input 
              className="input" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="button is-info" onClick={() => logInWithEmailAndPassword(email, password)}>
            <strong>Log in</strong>
          </button>
        </div>
        <button className="button is-text is-fullwidth" onClick={becomeMember}>
          Or become a member
        </button>
      </div>
    </div>
  )
}

export default LogIn