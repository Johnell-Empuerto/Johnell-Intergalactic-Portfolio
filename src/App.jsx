import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Middle from './pages/Middle';
import './css/style.css';
import github from "./assets/icons/github.png";
import linkedin from "./assets/icons/linkedin.png";
import instagram from "./assets/icons/instagram.png";
import scroll from "./assets/scroll.png";
import sattelite from "./assets/icons/satellite.png"; // Import satellite here for header
import middleBg from "./assets/middle_bg.png"; // Import the middle background image
import rocket from "./assets/icons/rocket.png"; // Import the rocket icon
import 'animate.css';

const App = () => {
  const [rotation, setRotation] = useState(275); // Start at 275 degrees
  const [section, setSection] = useState(0); // 0: Home, 1: Transitioning, 2: Middle
  const [newBgVisible, setNewBgVisible] = useState(false); // For animating new BG
  const [isBgFadingOut, setIsBgFadingOut] = useState(false); // Track fade out for unmount delay
  const [showMiddleContent, setShowMiddleContent] = useState(false); // Delay Middle content
  const [showRocket, setShowRocket] = useState(false); // For rocket animation
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleWheel = (event) => {
      if (isAnimating) return; // Prevent multiple triggers during animation

      if (event.deltaY > 0) { // Scroll down
        if (section === 0) {
          // Single scroll: Start rocket anim, then chain to content exit + BG change + Middle
          setIsAnimating(true);
          setRotation((prev) => (prev + 90) % 360);
          setShowRocket(true); // Trigger rocket fly-up
          setSection(1); // Transition state

          // After rocket anim (1s), proceed to content exit + BG in
          setTimeout(() => {
            // Exit Home content (but keep container for Middle)
            const contentElement = document.querySelector('.content-area');
            if (contentElement) {
              contentElement.classList.add('animate__animated', 'animate__fadeOut', 'animate__zoomOut');
            }
            // Start BG
            setNewBgVisible(true);
            setIsBgFadingOut(false);

            // After next phase (1s), auto-show Middle
            setTimeout(() => {
              // 🔧 Clear exit classes and reset styles from .content-area so Middle can show fully visible
              const contentElementAgain = document.querySelector('.content-area');
              if (contentElementAgain) {
                contentElementAgain.classList.remove('animate__animated', 'animate__fadeOut', 'animate__zoomOut');
                contentElementAgain.style.opacity = '1';
                contentElementAgain.style.transform = 'none';
              }
              setShowMiddleContent(true);
              // 🔧 Add 'show' class to trigger fade-in on .middle-con
              const middleElement = document.querySelector('.middle-con');
              if (middleElement) {
                middleElement.classList.add('show');
              }
              setSection(2); // Full Middle state
              setIsAnimating(false);
            }, 1000);
          }, 1000); // Rocket duration

          // 🔁 Hide rocket after takeoff finishes so it can restart next time
          setTimeout(() => {
            setShowRocket(false);
          }, 4500); // Match CSS animation duration
        }
      } else if (event.deltaY < 0) { // Scroll up
        if (section === 2 || section === 1) {
          // Single scroll up: Exit Middle + start BG fade out + auto-show Home
          setIsAnimating(true);
          setRotation((prev) => (prev - 90 + 360) % 360);
          
          // Start content exit (if Middle is visible)
          if (section === 2) {
            setShowMiddleContent(false);
            const middleElement = document.querySelector('.middle-con');
            if (middleElement) {
              middleElement.classList.add('animate__animated', 'animate__fadeOut');
              middleElement.classList.remove('show'); // 🔧 Clean up 'show' class on exit
            }
          }
          
          // Start BG fade out
          setIsBgFadingOut(true);
          const newBgElement = document.querySelector('.new-bg');
          if (newBgElement) {
            newBgElement.classList.remove('animate__fadeInUp');
            newBgElement.classList.add('animate__fadeOutDown');
          }
          setSection(1); // Transition state

          // After animation, auto-show Home
          setTimeout(() => {
            setNewBgVisible(false); // Unmount BG
            setIsBgFadingOut(false);
            setSection(0); // Back to Home
            setShowRocket(false); // 🔧 Reset rocket here—ensures it's always hidden on Home load
            // Reset and fade in Home content
            const contentElement = document.querySelector('.content-area');
            if (contentElement) {
              contentElement.classList.remove('animate__fadeOut', 'animate__zoomOut');
              contentElement.classList.add('animate__animated', 'animate__fadeIn');
            }
            setIsAnimating(false);
          }, 1200); // Buffer for smooth unmount
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [section, isAnimating, newBgVisible, showMiddleContent, isBgFadingOut, showRocket]);

  return (
    <div className='app-container'>
      <div className="home">
        {/* Rocket Animation Layer - Behind Earth */}
        {showRocket && (
          <div className="rocket-anim">
            <img src={rocket} alt="rocket" />
          </div>
        )}

        {/* New Background Layer for Transition */}
        {(newBgVisible || isBgFadingOut) && (
          <div 
            className={`new-bg animate__animated ${newBgVisible ? 'animate__fadeInUp' : 'animate__fadeOutDown'}`}
            style={{ 
              backgroundImage: `url(${middleBg})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
        )}

        <div className="wrapper">
          {/* Header - Always visible (CONTACT ME + satellite) */}
          <header className="animate__animated animate__fadeInUp animate__delay-4s">
            <img src={sattelite} alt="sattelite" />
            <a href="#" className='contact-header'>CONTACT ME</a>
          </header>

          {/* Content Container - Only this changes */}
          <div className="home-con">
            <div className="content-area">
              {section === 0 && <Home />}
              {section === 2 && showMiddleContent && <Middle />}
            </div>
          </div>

          {/* Moving Floating Up and Down Scroll Icon - Always visible */}
          <div className="scroll-icon">
            <img src={scroll} alt="scroll" />
          </div>

          {/* Floating Icons - Always visible */}
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

          {/* Earth Container for Rotation Effect - Always visible and sticks */}
          <div className="earth-wrapper animate__animated animate__zoomIn animate__delay-1s">
            <div
              className="earth-container"
              style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;