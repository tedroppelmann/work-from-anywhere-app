import React, { useState, useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function PersonalData() {
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (!user) return;

        fetchUserData();
    }, [user, loading]);

    const fetchUserData = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
    
          setUserData(data);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
    };

    return (
        <div>
            <h1 class="title is-3 has-text-centered">Personal data</h1>
            <div class='section'>
                <div class='box column is-half is-offset-one-quarter'>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" value={userData.name} disabled/>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" value={userData.email} disabled/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalData