import React, {useEffect, useState} from 'react'
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import CalendarComponent from '../components/Calendar'
import Spinner from '../components/Spinner'
import ServicesList from '../components/ServicesList';
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
            <section className='section'>
                <div className='columns is-vcentered is-centered is-mobile'>
                    <div className='column is-narrow'>
                        <MdNavigateBefore size={50}/>
                    </div>
                    <div className='column is-one-quarter'>
                        <figure className="image is-square">
                            <img src={require('../storage/place/photo_1.jpg')}/>
                        </figure>
                    </div>
                    <div className='column is-one-quarter'>
                        <figure className="image is-square">
                            <img src={require('../storage/place/photo_2.jpg')}/>
                        </figure>
                    </div>
                    <div className='column is-one-quarter'>
                        <figure className="image is-square">
                            <img src={require('../storage/place/photo_3.jpg')}/>
                        </figure>
                    </div>
                    <div className='column is-narrow'>
                        <MdNavigateNext size={50}/>
                    </div>
                </div>
            </section>
            <section className='section'>
                <h1 className="title is-3 has-text-centered">{place.name}</h1>
                <h1 className="subtitle has-text-centered">{place.address}</h1>
            </section>
            <div className='columns is-centered'>
                <div className='column is-half'>
                    <div className='section'>
                        <div className='box'>
                            <h1 className="title is-4">Facilities</h1>
                            <div className='columns is-mobile'>
                                <div className='column is-narrow'>
                                    <AiOutlineWifi size={50}/>
                                </div>
                                <div className='column is-narrow'>
                                    <GiSofa size={50}/>
                                </div>
                                <div className='column is-narrow'>
                                    <RiArtboardFill size={50}/>
                                </div>
                                <div className='column is-narrow'>
                                    <FaSwimmingPool size={50}/>
                                </div>
                            </div>
                        </div>
                        <div className='box'>
                            <h1 className="title is-4">Description</h1>
                            <h2 className='subtitle'>{place.description}</h2>
                        </div>
                        <div className='box'>
                            <h1 className="title is-4">Location</h1>
                            <figure className="image is-square">
                                <img src={require('../storage/maps/general_map.jpg')}/>
                            </figure>
                        </div>
                    </div>
                </div>
                <div className='column is-narrow'>
                    <div className='section'>
                        <CalendarComponent place={params.placeId} name={place.name}/>
                        <ServicesList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Place