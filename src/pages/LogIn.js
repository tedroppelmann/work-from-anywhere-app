import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../Firebase";
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

  return (
    <div class="section is-medium">
      <div class='box column is-half is-offset-one-quarter'>
        <h1 class="title">Log in</h1>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input 
              class="input" 
              type="email" 
              placeholder="e.g. alexsmith@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input 
              class="input" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button class="button is-primary is-centered" onClick={() => logInWithEmailAndPassword(email, password)}>
          <strong>Log in</strong>
        </button>
      </div>
    </div>
  )
}

export default LogIn