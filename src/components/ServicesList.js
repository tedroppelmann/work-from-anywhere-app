import React from 'react'
import { SERVICES } from '../storage/services/services';
import { BsDot } from "react-icons/bs";

function ServicesList() {
    const services = SERVICES;

    return (
        <div className='box'>
            <h1 className="title is-4">Services</h1>
            <br/>
            {services.map(service => (
                <h2 className="subtitle"> <BsDot/> {service.name}</h2>
            ))}
        </div>
    )
}

export default ServicesList