import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { Outlet } from "react-router-dom";
import Breadcrumb from '../components/Breadcrumb'

function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/log_in");
    }, [user, loading]);

    if (loading) {
        return (
            <div></div>
        )
    } 

    return (
        <div>
            <Breadcrumb />
            <Outlet />
        </div>
    )
}

export default Profile