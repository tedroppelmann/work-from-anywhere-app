import React from "react";
import { useNavigate } from 'react-router-dom'
import CitySelector from '../components/CitySelector';
import Footer from '../components/Footer';

function Home() {
  /*
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  */
  const navigate = useNavigate();

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


  const submit = (city) => {
    logEvent(analytics, 'click_on_' + city.name);
    navigate('/' + city.name);
  }
  

  //Below Part is referred from
  //https://stackoverflow.com/questions/54187450/add-new-columns-container-every-3-column-elements-in-react-js-with-bulma-css
  const splitEvery = (array, length) =>
  array.reduce((result, item, index) => {
    if (index % length === 0) result.push([]);
    result[Math.floor(index / length)].push(item);
    return result;
  }, []);
  */

  return (
    <div className="Home">
      <section className="section">
        <div className='columns is-vcentered'>
          <div className='column'>
            <h1 className="title is-1 has-text-centered">WORK FROM ANYWHERE</h1>
          </div>
          <div className='column'>
            <figure className="image container is-square">
              <img src={require('../storage/icons/wfa.jpg')}/>
            </figure>
          </div>
        </div>
      </section>
      <section className='section'>
      <h1 className="title has-text-centered">A little about us...</h1>
      <br/>
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child notification is-info has-text-centered">
                <p className="title is-family-code">WHAT</p>
                  <div className='container'>
                    <p className="subtitle">We are devoted to build a platform connecting real estate owners with knowledgeable workers and students. A gate to transform your work-from-anywhere experience by using different spaces from anywhere.</p>
                  </div>
                </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-info has-text-centered">
                <p className="title is-family-code">WHY</p>
                <p className="subtitle">It's easy!</p>
                <div className='container'>
                  <p className="subtitle">A single portal that allows you to keep everything under control: accommodation, workspaces reservations, courses, sports and local activities, networking and volunteering.</p>
                  <p className="subtitle">Everything will always be at your fingertips!</p>
                </div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-info has-text-centered">
              <p className="title is-family-code">WHEN</p>
              <p className="subtitle">Whatever you want!</p>
              <p className="subtitle">A short period of one day! A short rent! A long rent! Make sure you have necessary things in your bag and that's it! You are ready to join us.</p>

            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification is-info has-text-centered">
            <div className="content">
              <p className="title is-family-code">WHO</p>
              <p className="subtitle">We appeal to:</p>
              <div className='container'>
                <p className="subtitle"> Remote workers who want to combine productivity with the thrill of discovery and personal growth.</p>
                <p className="subtitle">Digital nomads and Freelancers looking for the right place to live an unforgettable adventure between local culture, learning and lagoon activities.</p>
                <p className="subtitle">Companies wishing to find a stimulating place for their teams, home to makers and small entrepreneurs, away from the hustle and bustle of the big city. </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      </section>
      <section className='section'>
        <h1 className="title has-text-centered">Discover your next place!</h1>
        <h2 className="subtitle has-text-centered">Our offer around Italy</h2>
        <br/>
        <CitySelector />
        {/*       
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
        */} 
      </section>
      <Footer />
    </div>
  )
}

export default Home