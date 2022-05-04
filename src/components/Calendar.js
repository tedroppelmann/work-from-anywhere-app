import React, {useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Slots from './Slots';
import { useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";

function CalendarComponent(props) {
    const [user, loading, error] = useAuthState(auth);
    const [date, setDate] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(false);
    const navigate = useNavigate();
    const placeId = props.place;
    const placeName = props.name;
    const randomDisabledDates = [2, 3, 4, 10, 11, 16, 17, 18, 19, 27, 28] //Only until we want to develop the real app

    const onChange = date => {
        setDate(date);
        setDateSelected(true);
    }

    const sumbit = () => {
        if (user) {
            //Fill when the app is ready to do it.
        } else {
            navigate('/places/' + placeId + '/services');
        }
    }

    return (
        <div class='container'>
            <h1 class="title is-4">Schedule</h1>
            <Calendar 
                onChange={onChange} 
                
                minDate={new Date()} 
                maxDate={new Date(Date.now() + 86400000*60)}
                minDetail={"year"}
                selectRange={true}
                tileDisabled={({ date }) => randomDisabledDates.includes(date.getDate())}
            />
            {/*<Slots date={date} placeId={placeId} placeName={placeName}/>*/}
            <br/>
            {dateSelected ? 
                <button class="button is-primary" onClick={sumbit}>
                    Next
                </button>
            :
                <button class="button is-primary" disabled>
                    Next
                </button>
            }
        </div>
    )
}

export default CalendarComponent