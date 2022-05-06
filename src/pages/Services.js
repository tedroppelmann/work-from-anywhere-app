import React, {useState, useEffect} from 'react'
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

    //Below Part is referred from
    //https://stackoverflow.com/questions/54187450/add-new-columns-container-every-3-column-elements-in-react-js-with-bulma-css
    const splitEvery = (array, length) =>
    array.reduce((result, item, index) => {
        if (index % length === 0) result.push([]);
        result[Math.floor(index / length)].push(item);
        return result;
    }, []);

    return (
        <div class="section">
            <div class='box column is-half is-offset-one-quarter has-text-centered'>
                <h1 class="title">What services would you like to add?</h1>
                {splitEvery(services, 2).map((group) =>
                    <div className="columns is-multiline">
                        {group.map((service) => (
                            <div className="column is-one-half" key={service.name}>
                                {servicesSelected.includes(String(service.name)) ?
                                    <button class="button is-info is-fullwidth" onClick={() => unselectService(service.name)} key={service.name}> 
                                        {service.name}
                                    </button>
                                :
                                    <button class="button is-fullwidth" onClick={() => selectService(service.name)} key={service.name}> 
                                        {service.name} 
                                    </button>
                                }       
                            </div>
                        ))}
                    </div>
                )}
                <button class="button is-info" onClick={submit}>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default Services