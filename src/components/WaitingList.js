import React, { useState } from 'react'
import { addInterested } from "../Firebase";
import { ImWarning } from "react-icons/im";

function WaitingList() {
    const [interested, setInterested] = useState(false);
    const [email, setEmail] = useState('');

    const submit = () => {
        if (email.length > 0) {
            addInterested(email);
            setInterested(true);
        }
    }
    
    return (
        <div className="section is-medium has-text-centered">
            <ImWarning size={50} />
            <br/>
            <h1 className='title'>
                Do you like the idea of working from anywhere?
            </h1>
            <h2 className='subtitle'>
                Subscribe now and get access to your personal dashboard!
            </h2>
            <div>
                Work from anywhere is in <strong>beta testing</strong>! The site is a draft of the services that will only be fully available at the launch of the platform.
            </div>
            <div>
                Do you want to stay informed about our launch? Give us your email.
            </div>
            <section className='section'>
                <div className='columns is-centered'>
                    <div className='column is-narrow'>
                        <div className='container'>
                        <div className="field has-addons">
                        <div className="control">
                            <input 
                                className="input" 
                                type="email" 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            {interested ? 
                                <a className="button is-success disabled">
                                    Done!
                                </a>
                            :
                                <a className="button is-info" onClick={submit}>
                                    Subscribe
                                </a>
                            }
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WaitingList