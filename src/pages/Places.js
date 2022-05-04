import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { db } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Spinner from '../components/Spinner'

function Places() {
    let params = useParams();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPlaces()
    },[])

    const fetchPlaces = async () => {
        try {
            const q = query(collection(db, "places"), where("city", "==", params.cityName));
            const querySnapshot = await getDocs(q);
            const docs = [];
            querySnapshot.forEach((doc) => {
            docs.push({id: doc.id, data: doc.data()});
        });
        setPlaces(docs);
        setLoading(false);
        } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
        }
    };

    //Below Part is referred from
    //https://stackoverflow.com/questions/54187450/add-new-columns-container-every-3-column-elements-in-react-js-with-bulma-css
    const splitEvery = (array, length) =>
    array.reduce((result, item, index) => {
        if (index % length === 0) result.push([]);
        result[Math.floor(index / length)].push(item);
        return result;
    }, []);

    if (loading) {
        return (
        <Spinner />
        )
    }

    return (
        <div class='section'>
            <h1 class="title is-3">Places in {params.cityName}</h1>
            {splitEvery(places, 4).map((group) => (
            <div className="columns is-multiline">
                {group.map((place) => (
                <div className="column is-one-quarter" key={place.id}>
                    <div className="card is-clickable" 
                    onClick={() => navigate('/places/'+ place.id, {
                        state: {
                        placeId: place.id,
                        }
                    })}>
                    <div className="card-content">
                        <figure class="image is-256x256">
                        <img src="https://bulma.io/images/placeholders/128x128.png"/>
                        </figure>
                        <br/>
                        <div className="title is-4">{place.data.name}</div>
                        <div className="subtitle">{place.data.address}</div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            ))}
        </div>
    )
}

export default Places