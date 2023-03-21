import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../Firebase";
import Spinner from '../components/Spinner'
import WaitingList from '../components/WaitingList';

function SignUp() {
  /*
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  */
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  /*
  const type = 'consumer';
  */

  useEffect(() => {
    if (user) navigate("/");
  }, [user, loading]);

  /*
  const submit = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password, type);
  };
  */

  if (loading) {
    return (
      <Spinner />
    )
  }

  return (
    <div>
      <WaitingList />
    {/*

    THIS PART CREATES THE USER. IT IS READY

    <div className="section is-medium">
      <div className='box column is-half is-offset-one-quarter'>
        <h1 className="title">Sign up</h1>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              placeholder="e.g Alex Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
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
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="button is-primary is-centered" onClick={submit}>
          <strong>Sign up</strong>
        </button>
      </div>
    </div>
    */}

    </div>
  )
}

export default SignUp