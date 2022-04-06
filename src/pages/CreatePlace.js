import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, addPlace } from "../Firebase";

function CreatePlace() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const submit = () => {
    addPlace(name, address, user.uid);
    setName('');
    setAddress('');
  };

  return (
    <div class="section is-medium">
      <div class='box column is-half is-offset-one-quarter'>
        <h1 class="title">Create place</h1>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Address</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <button class="button is-primary is-centered" onClick={submit}>
          <strong>Create</strong>
        </button>
      </div>
    </div>
  )
}

export default CreatePlace