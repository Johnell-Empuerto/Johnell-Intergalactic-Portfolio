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
import 'animate.css';
import { gsap } from 'gsap';

const App = () => {
  const [rotation, setRotation] = useState(275); // Start at 275 degrees
  const [section, setSection] = useState(0); // 0: Home, 1: Transitioning, 2: Middle
  const [newBgVisible, setNewBgVisible] = useState(false); // For animating new BG
  const [isBgFadingOut, setIsBgFadingOut] = useState(false); // Track fade out for unmount delay
  const [showMiddleContent, setShowMiddleContent] = useState(false); // Delay Middle content
  const [showRocket, setShowRocket] = useState(false); // For rocket animation
  const [showUFO, setShowUFO] = useState(false); // For UFO animation
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleWheel = (event) => {
      if (isAnimating) return; // Prevent multiple triggers during animation

      if (event.deltaY > 0) { // Scroll down
        if (section === 0) {
          setIsAnimating(true);
          setRotation((prev) => (prev + 90) % 360);
          setShowRocket(true); // Trigger rocket fly-up
          setSection(1); // Transition state
        }
      } else if (event.deltaY < 0) { // Scroll up
        if (section === 2 || section === 1) {
          setIsAnimating(true);
          setRotation((prev) => (prev - 90 + 360) % 360);
          
          setShowRocket(false); // Explicitly hide rocket immediately on scroll up
          
          // Start content exit (if Middle is visible)
          if (section === 2) {
            setShowMiddleContent(false);
            const middleElement = document.querySelector('.middle-con');
            if (middleElement) {
              middleElement.classList.add('animate__animated', 'animate__fadeOut');
              middleElement.classList.remove('show'); // 🔧 Clean up 'show' class on exit
            }

            // After content fade out, show UFO
            setTimeout(() => {
              setShowUFO(true);
            }, 1200); // Match animate.css fadeOut duration
          }
          
          setSection(1); // Transition state
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [section, isAnimating, newBgVisible, showMiddleContent, isBgFadingOut, showRocket]);

  useEffect(() => {
    if (!showRocket) return;

    let tl = gsap.timeline({ repeat: 0 }); // No repeat for one-time animation

    let labels = document.getElementsByClassName("labels"),
        rocketElements = document.querySelectorAll(".rocket__body, .rocket__wing, .rocket__fire"),
        smokeL = document.querySelectorAll(".rocket__smoke--left"),
        smokeR = document.querySelectorAll(".rocket__smoke--right"),
        fire = document.getElementsByClassName("rocket__fire");

    // Durations! Adjust these variables to shorten/lengthen phases (e.g., reduce by 0.2-0.5 each for ~1s total cut)
    let cdStart = 1, cdLeave = cdStart / 2, // Reduced cdStart from 1.25 to 1
        esDuration = 0.10, esRepeat = 15,
        smDuration = 1.2; // Reduced from 1.5 to 1.2

    // Animations!
    tl.addLabel("countdown")
      .from(labels, {
        duration: cdStart,
        scale: 0,
        x: "50px", y: "50px",
        stagger: cdStart / labels.length,
      }, "countdown")
      .to(labels, {
        duration: cdLeave,
        scale: 0,
        x: "20px", y: "20px",
        opacity: 0,
        stagger: cdStart / labels.length,
      }, "countdown+=" + cdStart / labels.length) 
      .addLabel("engine-start")
      .from(rocketElements, {
        duration: esDuration,
        x: "+=3px",
        repeat: esRepeat,
      }, "engine-start-=.5")
      .from(rocketElements, {
        duration: esDuration * 20,
        y: "+=5px",
      }, "engine-start-=1")
      .from(smokeL, {
        duration: smDuration,
        scale: 0,
        opacity: 2,
        stagger: smDuration / smokeL.length,
        x: "+=45px", y: "+=30px",
      }, "engine-start-=.5")
      .from(smokeR, {
        duration: smDuration,
        scale: 0,
        opacity: 2,
        stagger: smDuration / smokeR.length,
        x: "-=45px", y: "+=30px",
      }, "engine-start-=.5") 
      .from(fire, {
        duration: smDuration,
        scale: 0,
      }, "engine-start-=.5")
      .addLabel("lift-off")
      .to(rocketElements, {
        duration: 1.5, // Reduced from 2 to 1.5 – adjust here for lift-off speed
        y: "-=100px",
      }, "lift-off-=1")
      .to(fire, {
        duration: .25,
        scale: 2,
      }, "lift-off-=1")  
      .addLabel("launch")
      .to(rocketElements, {
        duration: 2.5, // Reduced from 3 to 2.5 – adjust here for launch speed
        y: () => "-=" + (document.body.offsetHeight) + "px",
        ease: "power4",
      }, "launch-=1.5")
      .to(fire, {
        duration: .25,
        scale: 1.75,
        repeat: 10,
      }, "launch-=1.8");

    tl.eventCallback("onComplete", () => {
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
        setShowRocket(false);
      }, 1000);
    });
  }, [showRocket]);

  useEffect(() => {
    if (!showUFO) return;

    const flyElement = document.querySelector('.fly');
    const handleAnimationEnd = () => {
      // Start BG fade out after UFO animation completes
      setIsBgFadingOut(true);
      const newBgElement = document.querySelector('.new-bg');
      if (newBgElement) {
        newBgElement.classList.remove('animate__fadeInUp');
        newBgElement.classList.add('animate__fadeOutDown');
      }

      // After BG fade out, show Home
      setTimeout(() => {
        setNewBgVisible(false);
        setIsBgFadingOut(false);
        setSection(0); // Back to Home
        // Reset and fade in Home content
        const contentElement = document.querySelector('.content-area');
        if (contentElement) {
          contentElement.classList.remove('animate__fadeOut', 'animate__zoomOut');
          contentElement.classList.add('animate__animated', 'animate__fadeIn');
        }
        setShowUFO(false);
        setIsAnimating(false);
      }, 1200); // Buffer for smooth unmount
    };

    if (flyElement) {
      flyElement.addEventListener('animationend', handleAnimationEnd, { once: true });
    }

    return () => {
      if (flyElement) {
        flyElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [showUFO]);

  return (
    <div className='app-container'>
      <div className="home">
        {/* Rocket Animation Layer - Behind Earth */}
        {showRocket && (
          <div className="rocket-anim">
            <div className="rocket">
              <div className="rocket__body">
                <div className="rocket__body__window">
                  <div className="shadow"></div>
                </div>
                <div className="rocket__body__inner">
                  <div className="shadow"></div>
                </div>
              </div>
              <div className="rocket__wing rocket__wing--left"></div>
              <div className="rocket__wing rocket__wing--right">
                <div className="shadow shadow--full"></div>
              </div>
              <div className="rocket__label">
                {[3, 2, 1].map((val) => (
                  <p key={val} className="labels">
                    {val}
                  </p>
                ))}
              </div>
              {['left', 'right'].map((val) =>
                Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={`${val}-${idx}`}
                      className={`rocket__smoke rocket__smoke--${val}`}
                    >
                      <div className="rocket__smoke__inner">
                        {Array(4)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} />
                          ))}
                      </div>
                    </div>
                  ))
              )}
              <div className="rocket__fire"></div>
            </div>
          </div>
        )}

        {/* UFO Animation Layer */}
        {showUFO && (
          <div className="canvas">
            <div className="stars"></div>
            <div className="fly">
              <div className="helmet"></div>
              <div className="glitter"></div>
              <div className="alien">
                <div className="topLeft"></div>
                <div className="topRight"></div>
                <div className="eyes"></div>
                <div className="eyebrows"></div>
                <div className="mouth"></div>
              </div>
              <div className="middle"></div>
              <div className="ufo">
                <div className="lights"></div>
                <div className="legs"></div>
              </div>
            </div>
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