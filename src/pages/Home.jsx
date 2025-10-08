import React from "react";
import sattelite from "../assets/icons/satellite.png";
import 'animate.css';

const Home = () => {
  
  return (

        <div className="home-con">
          {/* Header Part */}
          <header className="animate__animated animate__fadeInUp animate__delay-4s">
            <img src={sattelite} alt="sattelite" />
            <a href="#" className='contact-header'>CONTACT ME</a>
          </header>
          {/* End Header Part */}

          {/* Banner Info Part */}
          <div className="banner-info starwars-intro">
            <h3>A MESSAGE FROM EARTH</h3>
            <h2>HELLO FELLOW MEMBER OF THE GALAXY</h2>
            <h3>A MESSAGE FROM EARTH</h3>
          </div>
          {/* Banner Info Part */}

          {/* Banner Info Part - MAIN */}
          <div className="banner-info-main">
            <h1>I AM JOHNELL</h1>
          </div>
          {/* Banner Info Part - MAIN */}
          </div>
  );
};

export default Home;