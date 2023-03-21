import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { analytics } from "../Firebase";
import { logEvent } from "firebase/analytics";
import { SERVICES } from '../storage/services/services';

function Services() {
    const [servicesSelected, setServicesSelected] = useState([]);
    const navigate = useNavigate();

    const services = SERVICES;

    const selectService = service => {
        setServicesSelected(prevSelection => ([...prevSelection, service]));
    }

    const unselectService = service => {
        setServicesSelected(servicesSelected.filter(item => item !== service));
    }

    const sendServiceAnalytics = () => {
        servicesSelected.forEach(service => logEvent(analytics, service + '_selected'))
    }

    const submit = () => {
        sendServiceAnalytics();
        logEvent(analytics, 'click_on_sign_up');
        navigate('/sign_up');
    };

    return (
        <div>
        <div className="section">
            <div className='box column is-half is-offset-one-quarter has-text-centered'>
                <h1 className="title">What services would you like to add?</h1>
                <div className="columns is-multiline">
                    {services.map((service) => (
                        <div className="column is-one-half" key={service.name}>
                            {servicesSelected.includes(String(service.name)) ?
                                <button className="button is-info is-fullwidth" onClick={() => unselectService(service.name)} key={service.name}> 
                                    {service.name}
                                </button>
                            :
                                <button className="button is-fullwidth" onClick={() => selectService(service.name)} key={service.name}> 
                                    {service.name} 
                                </button>
                            }       
                        </div>
                    ))}
                </div>
                <button className="button is-info" onClick={submit}>
                    Confirm
                </button>
            </div>
        </div>
        </div>
    )
}

export default Services