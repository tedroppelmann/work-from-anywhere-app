import React, {useState, useEffect} from 'react'
import { addInterested } from "../Firebase";
import { ImWarning } from "react-icons/im";

function WaitingList() {
    const [interested, setInterested] = useState(false);
    const [email, setEmail] = useState('');

    const submit = () => {
        addInterested(email);
        setInterested(true);
    }
    return (
        <div class="section is-medium has-text-centered">
            <ImWarning size={50} />
            <br/>
            <h1 class='title'>
                Do you like the idea of working from anywhere?
            </h1>
            <h2 class='subtitle'>
                Subscribe now and get access to your personal dashboard!
            </h2>
            <div>
                Work from anywhere is in <strong>beta testing</strong>! The site is a draft of the services that will only be fully available at the launch of the platform.
            </div>
            <div>
                Do you want to stay informed about our launch? Give us your email.
            </div>
            <section class='section'>
                <div class='columns is-centered'>
                    <div class='column is-narrow'>
                        <div class='container'>
                        <div class="field has-addons">
                        <div class="control">
                            <input 
                                class="input" 
                                type="email" 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="control">
                            {interested ? 
                                <a class="button is-success disabled">
                                    Done!
                                </a>
                            :
                                <a class="button is-info" onClick={submit}>
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