import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { analytics } from "../Firebase";
import { logEvent } from "firebase/analytics";

import { CITIES } from '../storage/cities/cities';

function Home() {
  /*
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  */
  const navigate = useNavigate();

  const cities = CITIES;

  /*
  useEffect(() => {
    fetchCities()
  },[])

  const fetchCities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cities"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({id: doc.id, data: doc.data()});
      });
      setCities(docs);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  */

  const submit = (city) => {
    logEvent(analytics, 'click_on_' + city.name);
    navigate('/' + city.name, {state: {cityName: city.name,}});
  }

  //Below Part is referred from
  //https://stackoverflow.com/questions/54187450/add-new-columns-container-every-3-column-elements-in-react-js-with-bulma-css
  const splitEvery = (array, length) =>
  array.reduce((result, item, index) => {
    if (index % length === 0) result.push([]);
    result[Math.floor(index / length)].push(item);
    return result;
  }, []);

  return (
    <div className="Home">
      <section class="section">
        <div class='columns is-vcentered'>
          <div class='column'>
            <h1 class="title is-1 has-text-centered">WORK FROM ANYWHERE</h1>
          </div>
          <div class='column'>
            <figure class="image container is-square">
              <img src={require('../storage/icons/wfa.jpg')}/>
            </figure>
          </div>
        </div>
      </section>
      <section class='section'>
      <h1 class="title has-text-centered">A little about us</h1>
      <br/>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-info has-text-centered">
                <p class="title">WHAT</p>
                  <div class='container'>
                    <p class="subtitle">We are devoted to build a platform connecting real estate owners with knowledgeable workers and students. A gate to transform your work-from-anywhere experience by using different spaces from anywhere.</p>
                  </div>
                </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child notification is-info has-text-centered">
                <p class="title">WHY</p>
                <p class="subtitle">It's easy!</p>
                <div class='container'>
                  <p class="subtitle">A single portal that allows you to keep everything under control: accommodation, workspaces reservations, courses, sports and local activities, networking and volunteering.</p>
                  <p class="subtitle">Everything will always be at your fingertips!</p>
                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info has-text-centered">
              <p class="title">WHEN</p>
              <p class="subtitle">Whatever you want!</p>
              <p class="subtitle">A short period of one day! A short rent! A long rent! Make sure you have necessary things in your bag and that's it! You are ready to join us.</p>

            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-info has-text-centered">
            <div class="content">
              <p class="title">WHO</p>
              <p class="subtitle">We appeal to:</p>
              <div class='container'>
                <p class="subtitle"> Remote workers who want to combine productivity with the thrill of discovery and personal growth.</p>
                <p class="subtitle">Digital nomads and Freelancers looking for the right place to live an unforgettable adventure between local culture, learning and lagoon activities.</p>
                <p class="subtitle">Companies wishing to find a stimulating place for their teams, home to makers and small entrepreneurs, away from the hustle and bustle of the big city. </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      </section>
      <section class='section'>
        <h1 class="title has-text-centered">Discover your next place!</h1>
        <h2 class="subtitle has-text-centered">Our offer around Italy</h2>
        <br/>
        {splitEvery(cities, 4).map((group) => (
          <div className="columns is-multiline">
            {group.map((city) => (
              <div className="column is-one-quarter" key={city.name}>
                <div className="card is-clickable" 
                  onClick={() => submit(city)}>
                  <div className="card-content">
                    <figure class="image is-5by4">
                      <img src={city.image}/>
                    </figure>
                    <br/>
                    <div className="title is-4">{city.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}

export default Home