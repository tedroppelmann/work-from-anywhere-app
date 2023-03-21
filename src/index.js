import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import SignUpLandlord from './pages/SignUpLandlord';
import CreatePlace from './pages/CreatePlace';
import Places from './pages/Places';
import Place from './pages/Place';
import Profile from './pages/Profile';
import NextBookings from './pages/NextBookings';
import PersonalData from './pages/PersonalData';
import Services from './pages/Services';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="sign_up" element={<SignUp />} />
          <Route path="log_in" element={<LogIn />} />
          <Route path="sign_up_landlord" element={<SignUpLandlord />}/>
          <Route path="create_place" element={<CreatePlace />} />
          <Route path=":cityName" element={<Places />} />
          <Route path="places/:placeId" element={<Place />} />
          {/* 
          <Route path="profile" element={<Profile />} >
            <Route path="personal_data" element={<PersonalData />} />
            <Route path="next_bookings" element={<NextBookings />} />
          </Route>
          */}
          <Route path="places/:placeId/services" element={<Services />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
