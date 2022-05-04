import React from 'react'
import { FaRegSadCry } from "react-icons/fa";

function WaitingList() {
    return (
        <div class="section is-medium has-text-centered">
            <FaRegSadCry size={50} />
            <br/>
            <div class='title'>
                Sorry!
            </div>
            <div class='subtitle'>
                Work From Anywhere is in beta testing.
            </div>
            <div class='subtitle is-6'>
                The site is a preview of the services that will only be fully available at the launch of the platform.
            </div>
        </div>
    )
}

export default WaitingList