import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analytics } from "../Firebase";
import { logEvent } from "firebase/analytics";
import { CITIES } from '../storage/cities/cities';

function CitySelector() {
    const [regionSelected, setRegionSelected] = useState('');
    const [townSelected, setTownSelected] = useState('');
    const [possibleTowns, setPossibleTowns] = useState([]);
    const [possibleVillages, setPossibleVillages] = useState([]);
    const navigate = useNavigate();

    const changeRegion = (newRegion) => {
        CITIES.map((region) => {
            if (region.regionName === newRegion) {
                setPossibleTowns(region.towns);
            }
        });
        setRegionSelected(newRegion);
        setTownSelected('');
        setPossibleVillages([]);
    }

    const changeTown = (newTown) => {
        possibleTowns.map((town) => {
            if (town.townName === newTown) {
                setPossibleVillages(town.villages);
            }
        });
        setTownSelected(newTown);
    }

    const submit = (village) => {
        logEvent(analytics, 'click_on_' + village.villageName);
        navigate('/' + village.villageName);
    }

    return (
        <div>
            <h1 className='subtitle has-text-centered is-family-code'><strong>Regions</strong></h1>
            <div className='columns is-multiline is-centered is-mobile'>
                {CITIES.map((region) => (
                    <div className='column is-narrow' key={region.regionName}>
                        {regionSelected === region.regionName ? 
                            <div className='button is-info' onClick={() => changeRegion(region.regionName)}>
                                {region.regionName}
                            </div>
                        :
                            <div className='button' onClick={() => changeRegion(region.regionName)}>
                                {region.regionName}
                            </div>
                        }
                    </div>
                ))}
            </div>
            {regionSelected !== '' ? 
                <h1 className='subtitle has-text-centered is-family-code'><strong>Towns</strong></h1>
            :
                ''
            }
            <div className='columns is-multiline is-centered is-mobile'>
                {possibleTowns.map((town) => (
                    <div className='column is-narrow' key={town.townName}>
                        {townSelected === town.townName ? 
                            <div className='button is-info' onClick={() => changeTown(town.townName)}>
                                {town.townName}
                            </div>
                        :
                            <div className='button' onClick={() => changeTown(town.townName)}>
                                {town.townName}
                            </div>
                        }
                    </div>
                ))}
            </div>
            {townSelected !== '' ? 
                <h1 className='subtitle has-text-centered is-family-code'><strong>Villages</strong></h1>
            :
                ''
            }
            <div className='columns is-multiline is-centered'>
                {possibleVillages.map((village) => (
                    <div className='column is-one-quarter' key={village.villageName}>
                        <div className="card is-clickable" 
                            onClick={() => submit(village)}>
                            <div className="card-content">
                                {/*
                                <figure className="image is-5by4">
                                <img src={village.image}/>
                                </figure>
                                <br/>
                                */}
                                <div className="title is-4 has-text-centered">{village.villageName}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CitySelector