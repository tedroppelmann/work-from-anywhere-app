import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Breadcrumb() {
    const [pageActive, setPageActive] = useState(window.location.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        setPageActive(window.location.pathname);
    },[])

    const changePage = page => {
        setPageActive(page);
        navigate(page);
    }
    return (
        <div class='section'>
            <nav class="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
                <ul>
                    <li class={pageActive == '/profile/personal_data' ? 'is-active' : ''}>
                        <a onClick={() => changePage('/profile/personal_data')}>Personal data</a>
                    </li>
                    <li class={pageActive == '/profile/next_bookings' ? 'is-active' : ''}>
                        <a onClick={() => changePage('/profile/next_bookings')} >Next bookings</a>
                    </li>
                    <li class={pageActive == '/profile/past_bookings' ? 'is-active' : ''}>
                        <a >Past bookings</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Breadcrumb