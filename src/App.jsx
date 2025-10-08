import React from 'react'
import Home from './pages/Home'
import './css/style.css'
import github from "./assets/icons/github.png";
import linkedin from "./assets/icons/linkedin.png";
import instagram from "./assets/icons/instagram.png";
import scroll from "./assets/scroll.png";
import 'animate.css';
import { useEffect, useState } from 'react';

const App = () => {


  const [rotation, setRotation] = useState(275); // Start at 275 degrees

  useEffect(() => {
    const handleWheel = (event) => {
      // Rotate by 90 degrees on scroll down (positive deltaY) - to the left/other side
      if (event.deltaY > 0) {
        setRotation((prev) => (prev + 90) % 360);
      }
      // Rotate back by 90 degrees on scroll up (negative deltaY)
      else if (event.deltaY < 0) {
        setRotation((prev) => (prev - 90 + 360) % 360);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    // Cleanup on unmount
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

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
              <div className="earth-wrapper animate__animated animate__zoomIn animate__delay-1s">
  <div
    className="earth-container"
    style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
  ></div>
</div>

          {/* Earth Container for Rotation Effect */}
        </div>
      </div>
    </div>
  )
}

export default App