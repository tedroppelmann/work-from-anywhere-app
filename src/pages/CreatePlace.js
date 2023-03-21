import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, addPlace } from "../Firebase";

function CreatePlace() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
  }, [user, loading]);

  const submit = () => {
    addPlace(name, address, user.uid, city, description);
    setName('');
    setAddress('');
    setCity('');
    setDescription('');
  };

  if (user) {
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
              placeholder='e.g. House in the beach'
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
              placeholder='Create a fake address'
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div class="field">
          <label class="label">City</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              value={city}
              placeholder='Please write the city correctly (e.g. Milano or Sambuca)'
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input 
              class="textarea" 
              type="text" 
              value={description}
              placeholder='A description of the place. Use your imagination!'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button class="button is-info" onClick={submit}>
          <strong>Create</strong>
        </button>
      </div>
    </div>
  )
  }
  else {
    return(
      <div></div>
    )
  }
}

export default CreatePlace