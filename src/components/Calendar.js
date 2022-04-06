import React, {useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Slots from './Slots';

function CalendarComponent(props) {
    const [date, setDate] = useState(new Date());
    const [showSlots, setShowSlots] = useState(false);
    const placeId = props.place;
    const placeName = props.name;

    
    const onChange = date => {
        setDate(date);
    }

    return (
        <div class='container'>
            <h1 class="title is-4">Schedule</h1>
            <Calendar onChange={onChange} value={date}/>
            <Slots date={date} placeId={placeId} placeName={placeName}/>
        </div>
    )
}

export default CalendarComponent