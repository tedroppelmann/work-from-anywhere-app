import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../Firebase";
import { query, getDocs, where, collectionGroup } from "firebase/firestore";

function NextBookings() {
    const [user, loading, error] = useAuthState(auth);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserBookings();
    }, [])

    const fetchUserBookings = async () => {
        try {
            const q = query(collectionGroup(db, "bookings"), where("user", "==", user.uid));
            const docs = await getDocs(q);
            const books = [];
            docs.forEach((book) => {
                const placeId = book.ref.path.split('/')[1];
                books.push({placeId: placeId, data: book.data()});
            });
            setBookings(books);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching booking data");
        }
    }

    return (
        <div>
            <h1 class="title is-3 has-text-centered"> Next bookings</h1>
            {bookings.map((book) => 
                <div class='box column is-half is-offset-one-quarter'>
                    <h1 class="title is-4">{book.data.placeName}</h1>
                    <div>Date: {book.data.date.toDate().toDateString()}</div>
                    <div>Slot: {book.data.slot}</div>
                    <br/>
                    <button class='button is-primary' onClick={() => navigate('/places/' + book.placeId, 
                        {
                        state: {
                            placeId: book.placeId,
                            }
                        })}>
                        More info
                    </button>
                </div>
            )}
        </div>
    )
}

export default NextBookings