import React, {useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import Slots from './Slots';
import { useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, analytics } from "../Firebase";
import { logEvent } from "firebase/analytics";

function CalendarComponent(props) {
    const [user, loading, error] = useAuthState(auth);
    const [date, setDate] = useState(new Date());
    const [diffDates, setDiffDates] = useState(0);
    const [dateSelected, setDateSelected] = useState(false);
    const navigate = useNavigate();
    const placeId = props.place;
    const placeName = props.name;
    const randomDisabledDates = [2, 3, 4, 10, 11, 16, 17, 18, 19, 27, 28] //Only until we want to develop the real app

    const onChange = date => {
        setDate(date);
        setDateSelected(true);
        const diffDates = Math.ceil((date[1] - date [0]) / (1000 * 60 * 60 * 24));
        setDiffDates(diffDates);
    }

    const sumbit = () => {
        if (user) {
            //Fill when the app is ready to do it.
        } else {
            const diff = 
            logEvent(analytics, 'days_selected', { diff: diffDates});
            navigate('/places/' + placeId + '/services');
        }
    }

    return (
        <div className='box'>
            <h1 className="title is-4">Book</h1>
            <h2 className="subtitle">Start by choosing your dates</h2>
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
            <div className='columns is-centered'>
                <div className='column is-narrow'>
                    {dateSelected ? 
                        <button className="button is-info" onClick={sumbit}>
                            Next
                        </button>
                    :
                        <button className="button is-info" disabled>
                            Next
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CalendarComponent