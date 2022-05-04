import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import CalendarComponent from '../components/Calendar'
import Spinner from '../components/Spinner'

function Place() {
    let params = useParams();
    const [place, setPlace] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlace();
    },[])

    const fetchPlace = async () => {
        try {
            const docRef = doc(db, "places", params.placeId.toString());
            const docSnap = await getDoc(docRef);
            setPlace(docSnap.data());
            setLoading(false);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching place data");
        }
    };

    if (loading) {
        return (
            <Spinner />
        )
    }

    return (
        <div>
            <div class='section'>
                <h1 class="title is-3">{place.name}</h1>
                <h1 class="subtitle">{place.address}</h1>
            </div>
            <div class='columns'>
                <div class='column is-3'>
                    <div class='section'>
                        <CalendarComponent place={params.placeId} name={place.name}/>
                    </div>
                </div>
                <div class='column'>
                    <div class='section'>
                        <h1 class="title is-4">Description</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Place