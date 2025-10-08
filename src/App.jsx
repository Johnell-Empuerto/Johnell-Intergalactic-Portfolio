import React from 'react'
import Home from './pages/Home'
import './css/style.css'
import github from "./assets/icons/github.png";
import linkedin from "./assets/icons/linkedin.png";
import instagram from "./assets/icons/instagram.png";
import scroll from "./assets/scroll.png";
import 'animate.css';

const App = () => {
  return (
    <div className='app-container'>
      <div className="home">
        <div className="wrapper">

          {/* Home Page */}
          <Home />
          {/* Home Page */}

          {/* Moving Floating Up and Down Scroll Icon */}
          <div className="scroll-icon">
            <img src={scroll} alt="scroll" />
          </div>
          {/* Moving Floating Up and Down Scroll Icon */}

          {/* Floating Icons */}
          <div className="floating-icons animate__animated animate__fadeInUp animate__delay-4s">
            <div className="icon-item">
              <a href="#"><img src={github} alt="github" /></a> 
              <p>GitHub</p>
            </div>

            <div className="icon-item">
              <a href="#"><img src={linkedin} alt="linkedin" /></a>
              <p>LinkedIn</p>
            </div>

            <div className="icon-item">
              <a href="#"><img src={instagram} alt="instagram" /></a>
              <p>Instagram</p>
            </div>
          </div>
          {/* Floating Icons */}

          {/* Earth Container for Rotation Effect */}
              <div className="earth-container animate__animated animate__zoomIn animate__delay-1s"></div>
          {/* Earth Container for Rotation Effect */}
        </div>
      </div>
    </div>
  )
}

export default App