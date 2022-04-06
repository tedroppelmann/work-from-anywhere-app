import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../Firebase";
import Spinner from '../components/Spinner'

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const type = 'consumer';

  useEffect(() => {
    if (user) navigate("/");
  }, [user, loading]);

  const submit = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password, type);

  };

  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <div class="section is-medium">
      <div class='box column is-half is-offset-one-quarter'>
        <h1 class="title">Sign up</h1>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              placeholder="e.g Alex Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
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
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button class="button is-primary is-centered" onClick={submit}>
          <strong>Sign up</strong>
        </button>
      </div>
    </div>
  )
}

export default SignUp