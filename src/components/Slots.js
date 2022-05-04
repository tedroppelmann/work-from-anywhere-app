import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth, analytics, addBooking } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { logEvent } from "firebase/analytics";


function Slots(props) {
    const [user, loading, error] = useAuthState(auth);
    const [slotSelected, setSlotSelected] = useState('');
    const [bookings, setBookings] = useState([]);
    const date = props.date;
    const placeId = props.placeId;
    const placeName = props.placeName;
    const navigate = useNavigate();
    
    useEffect(() => {
        setSlotSelected('');
        fetchBookings();
    }, [props.date])

    const slots = [
        {startTime: '08:00 - 13:00'},
        {startTime: '13:00 - 18:00'},
    ];

    const selectSlot = slot => {
        setSlotSelected(slot);
    }

    const submit = () => {
        addBooking(placeId, date, slotSelected.startTime, user.uid, placeName);
        setSlotSelected('');
        logEvent(analytics, 'confirm_booking');
        navigate('/profile/next_bookings');
    }

    const fetchBookings = async () => {
        try {
            const q = query(collection(db, "places", placeId, "bookings"), where("date", "==", date));
            const docs = await getDocs(q);
            const books = [];
            docs.forEach((doc) => {
                books.push(doc.data().slot);
            });
            setBookings(books);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching booking data");
        }
    }

    //Below Part is referred from
    //https://stackoverflow.com/questions/54187450/add-new-columns-container-every-3-column-elements-in-react-js-with-bulma-css
    const splitEvery = (array, length) =>
    array.reduce((result, item, index) => {
        if (index % length === 0) result.push([]);
        result[Math.floor(index / length)].push(item);
        return result;
    }, []);

    return (
        <div flex={1/2}>
            <br/>
            <h1 class="title is-5">Slots</h1>
            {splitEvery(slots, 2).map((group) =>
                <div className="columns is-multiline">
                    {group.map((slot) => (
                        <div className="column is-one-half" key={slot.startTime}>
                            {bookings.includes(String(slot.startTime)) ?
                                <button class="button is-light" disabled> 
                                    {slot.startTime} 
                                </button>
                            :
                            slot.startTime == slotSelected.startTime ? 
                                <button class="button is-primary"> 
                                    {slot.startTime} 
                                </button>
                            :
                                <button class="button" onClick={() => selectSlot(slot)} key={slot.startTime}> 
                                    {slot.startTime} 
                                </button>
                            }       
                        </div>
                    ))}
                </div>
            )}
            {user ? 
                <div>
                    {slotSelected ? 
                        <button class="button is-primary" onClick={submit}>
                            Confirm
                        </button>
                    :
                        <button class="button is-primary" onClick={submit} disabled>
                            Confirm
                        </button>
                    }
                </div>
            :
                <div>
                    You have to be logged in to book a place.
                </div>
            }   
        </div>
    )
} 

export default Slots