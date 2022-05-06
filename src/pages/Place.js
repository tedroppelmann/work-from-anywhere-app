import React, {useEffect, useState} from 'react'
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import CalendarComponent from '../components/Calendar'
import Spinner from '../components/Spinner'
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { AiOutlineWifi } from "react-icons/ai";
import { GiSofa } from "react-icons/gi";
import { RiArtboardFill } from "react-icons/ri";
import { FaSwimmingPool } from "react-icons/fa";

function Place() {
    const params = useParams();
    const {state} = useLocation();
    const {cityName} = state; 
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
            <section class='section'>
                <div class='columns is-vcentered is-centered is-mobile'>
                    <div class='column is-narrow'>
                        <MdNavigateBefore size={80}/>
                    </div>
                    <div class='column is-one-quarter'>
                        <figure class="image is-square">
                            <img src={require('../storage/place/photo_1.jpg')}/>
                        </figure>
                    </div>
                    <div class='column is-one-quarter'>
                        <figure class="image is-square">
                            <img src={require('../storage/place/photo_2.jpg')}/>
                        </figure>
                    </div>
                    <div class='column is-one-quarter'>
                        <figure class="image is-square">
                            <img src={require('../storage/place/photo_3.jpg')}/>
                        </figure>
                    </div>
                    <div class='column is-narrow'>
                        <MdNavigateNext size={80}/>
                    </div>
                </div>
            </section>
            <section class='section'>
                <h1 class="title is-3 has-text-centered">{place.name}</h1>
                <h1 class="subtitle has-text-centered">{place.address}</h1>
            </section>
            <div class='columns is-centered'>
                <div class='column is-half'>
                    <div class='section'>
                        <div class='box'>
                            <h1 class="title is-4">Facilities</h1>
                            <div class='columns is-mobile'>
                                <div class='column is-narrow'>
                                    <AiOutlineWifi size={50}/>
                                </div>
                                <div class='column is-narrow'>
                                    <GiSofa size={50}/>
                                </div>
                                <div class='column is-narrow'>
                                    <RiArtboardFill size={50}/>
                                </div>
                                <div class='column is-narrow'>
                                    <FaSwimmingPool size={50}/>
                                </div>
                            </div>
                        </div>
                        <div class='box'>
                            <h1 class="title is-4">Description</h1>
                        </div>
                        <div class='box'>
                            <h1 class="title is-4">Location</h1>
                            <figure class="image is-square">
                                <img src={require('../storage/maps/general_map.jpg')}/>
                            </figure>
                        </div>
                    </div>
                </div>
                <div class='column is-narrow'>
                    <div class='section'>
                        <CalendarComponent place={params.placeId} name={place.name}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Place