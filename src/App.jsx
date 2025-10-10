import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Middle from './pages/Middle';
import Bottom from './pages/Bottom'; // Assuming Bottom is in pages folder
import Works from './pages/Works'; // Add this import
import './css/style.css';
import github from "./assets/icons/github.png";
import linkedin from "./assets/icons/linkedin.png";
import instagram from "./assets/icons/instagram.png";
import scroll from "./assets/scroll.png";
import sattelite from "./assets/icons/satellite.png"; // Import satellite here for header
import middleBg from "./assets/middle_bg.png"; // Import the middle background image
import bottomBg from "./assets/bottom_bg.png"; // Import the bottom background image
import worksBg from "./assets/works_bg.png"; // Import the works background image
import 'animate.css';
import { gsap } from 'gsap';

const App = () => {
  const [rotation, setRotation] = useState(275); // Start at 275 degrees
  const [section, setSection] = useState(0); // 0: Home, 1/3/5: Transitioning, 2: Middle, 4: Bottom, 6: Works
  const [showMiddleBg, setShowMiddleBg] = useState(false); // For middle BG
  const [showBottomBg, setShowBottomBg] = useState(false); // For bottom BG
  const [showWorksBg, setShowWorksBg] = useState(false); // For works BG
  const [isBgFadingOutMiddle, setIsBgFadingOutMiddle] = useState(false); // Track fade out for middle
  const [isBgFadingOutBottom, setIsBgFadingOutBottom] = useState(false); // Track fade out for bottom
  const [isBgFadingOutWorks, setIsBgFadingOutWorks] = useState(false); // Track fade out for works
  const [showMiddleContent, setShowMiddleContent] = useState(false); // Delay Middle content
  const [showBottomContent, setShowBottomContent] = useState(false); // Delay Bottom content
  const [showWorksContent, setShowWorksContent] = useState(false); // Delay Works content
  const [showRocket, setShowRocket] = useState(false); // For rocket animation
  const [showUFO, setShowUFO] = useState(false); // For UFO animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true); // Track if desktop

  // Detect screen size for desktop vs mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Assume >=1024px is desktop/laptop
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload background images to prevent loading delays on transitions
  useEffect(() => {
    const preloadImages = [middleBg, bottomBg, worksBg];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      if (isAnimating) return; // Prevent multiple triggers during animation

      if (event.deltaY > 0) { // Scroll down
        if (section === 0) {
          setIsAnimating(true);
          setRotation((prev) => (prev + 90) % 360);
          setShowRocket(true); // Trigger rocket fly-up
          setSection(1); // Transition to middle
        } else if (section === 2) {
          setIsAnimating(true);
          setRotation((prev) => (prev + 90) % 360);
          const middleElement = document.querySelector('.middle-con');
          if (middleElement) {
            middleElement.classList.add('animate__animated', 'animate__fadeOut');
            middleElement.classList.remove('show');
          }
          setSection(3); // Transition to bottom
          setTimeout(() => {
            setShowMiddleContent(false);
            setShowRocket(true);
          }, 1200);
        } else if (section === 4) {
          setIsAnimating(true);
          setRotation((prev) => (prev + 90) % 360);
          const bottomElement = document.querySelector('.bottom-con');
          if (bottomElement) {
            bottomElement.classList.add('animate__animated', 'animate__fadeOut');
            bottomElement.classList.remove('show');
          }
          setSection(5); // Transition to works
          setTimeout(() => {
            setShowBottomContent(false);
            setShowRocket(true);
          }, 1200);
        }
      } else if (event.deltaY < 0) { // Scroll up
        if (section === 2) {
          setIsAnimating(true);
          setRotation((prev) => (prev - 90 + 360) % 360);
          
          setShowRocket(false); // Explicitly hide rocket immediately on scroll up
          
          const middleElement = document.querySelector('.middle-con');
          if (middleElement) {
            middleElement.classList.add('animate__animated', 'animate__fadeOut');
            middleElement.classList.remove('show');
          }
          setSection(1); // Transition state
          setTimeout(() => {
            setShowMiddleContent(false);
            setShowUFO(true);
          }, 1200);
        } else if (section === 4) {
          setIsAnimating(true);
          setRotation((prev) => (prev - 90 + 360) % 360);
          
          setShowRocket(false); // Explicitly hide rocket immediately on scroll up
          
          const bottomElement = document.querySelector('.bottom-con');
          if (bottomElement) {
            bottomElement.classList.add('animate__animated', 'animate__fadeOut');
            bottomElement.classList.remove('show');
          }
          setSection(3);
          setTimeout(() => {
            setShowBottomContent(false);
            setShowUFO(true);
          }, 1200);
        } else if (section === 6) {
          setIsAnimating(true);
          setRotation((prev) => (prev - 90 + 360) % 360);
          
          setShowRocket(false); // Explicitly hide rocket immediately on scroll up
          
          const worksElement = document.querySelector('.works-con');
          if (worksElement) {
            worksElement.classList.add('animate__animated', 'animate__fadeOut');
            worksElement.classList.remove('show');
          }
          setSection(5);
          setTimeout(() => {
            setShowWorksContent(false);
            setShowUFO(true);
          }, 1200);
        } else if (section === 1 || section === 3 || section === 5) {
          // Handle if somehow in transition state, but normally prevented by isAnimating
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => window.removeEventListener('wheel', handleWheel);
  }, [section, isAnimating, showMiddleBg, showBottomBg, showWorksBg, showMiddleContent, showBottomContent, showWorksContent, isBgFadingOutMiddle, isBgFadingOutBottom, isBgFadingOutWorks, showRocket]);

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
      // Exit previous content (fade out content-area)
      const contentElement = document.querySelector('.content-area');
      if (contentElement) {
        contentElement.classList.add('animate__animated', 'animate__fadeOut', 'animate__zoomOut');
      }

      // Determine next based on section
      let nextBgSetter, nextBgFadingSetter, nextContentSetter, nextElementClass, nextSection;
      if (section === 1) {
        nextBgSetter = setShowMiddleBg;
        nextBgFadingSetter = setIsBgFadingOutMiddle;
        nextContentSetter = setShowMiddleContent;
        nextElementClass = '.middle-con';
        nextSection = 2;
      } else if (section === 3) {
        nextBgSetter = setShowBottomBg;
        nextBgFadingSetter = setIsBgFadingOutBottom;
        nextContentSetter = setShowBottomContent;
        nextElementClass = '.bottom-con';
        nextSection = 4;
      } else if (section === 5) {
        nextBgSetter = setShowWorksBg;
        nextBgFadingSetter = setIsBgFadingOutWorks;
        nextContentSetter = setShowWorksContent;
        nextElementClass = '.works-con';
        nextSection = 6;
      }

      if (nextBgSetter) {
        nextBgSetter(true);
        nextBgFadingSetter(false);
      }

      // After next phase (1s), show next content
      setTimeout(() => {
        // Clean up content-area
        const contentElementAgain = document.querySelector('.content-area');
        if (contentElementAgain) {
          contentElementAgain.classList.remove('animate__animated', 'animate__fadeOut', 'animate__zoomOut');
          contentElementAgain.style.opacity = '1';
          contentElementAgain.style.transform = 'none';
        }

        if (nextContentSetter) {
          nextContentSetter(true);
          const nextElement = document.querySelector(nextElementClass);
          if (nextElement) {
            nextElement.classList.add('show');
          }
        }

        if (nextSection !== undefined) {
          setSection(nextSection);
        }
        setIsAnimating(false);
        setShowRocket(false);
      }, 1000);
    });
  }, [showRocket, section]);

  useEffect(() => {
    if (!showUFO) return;

    const flyElement = document.querySelector('.fly');
    const handleAnimationEnd = () => {
      // Determine which BG to fade out based on section
      let bgFadingSetter, bgSetter, bgFadingResetter, bgClass, nextSection, nextContentSetter, nextElementClass;
      if (section === 1) { // From middle to home
        bgFadingSetter = setIsBgFadingOutMiddle;
        bgSetter = setShowMiddleBg;
        bgFadingResetter = setIsBgFadingOutMiddle;
        bgClass = '.middle-bg';
        nextSection = 0;
        nextContentSetter = null; // Home doesn't need
      } else if (section === 3) { // From bottom to middle
        bgFadingSetter = setIsBgFadingOutBottom;
        bgSetter = setShowBottomBg;
        bgFadingResetter = setIsBgFadingOutBottom;
        bgClass = '.bottom-bg';
        nextSection = 2;
        nextContentSetter = setShowMiddleContent;
        nextElementClass = '.middle-con';
      } else if (section === 5) { // From works to bottom
        bgFadingSetter = setIsBgFadingOutWorks;
        bgSetter = setShowWorksBg;
        bgFadingResetter = setIsBgFadingOutWorks;
        bgClass = '.works-bg';
        nextSection = 4;
        nextContentSetter = setShowBottomContent;
        nextElementClass = '.bottom-con';
      }

      if (bgFadingSetter) {
        bgFadingSetter(true);
        const bgElement = document.querySelector(bgClass);
        if (bgElement) {
          bgElement.classList.remove('animate__fadeInUp');
          bgElement.classList.add('animate__fadeOutDown');
        }
      }

      // After BG fade out, show next
      setTimeout(() => {
        if (bgSetter) {
          bgSetter(false);
          bgFadingResetter(false);
        }

        if (nextSection !== undefined) {
          setSection(nextSection);
        }

        if (nextContentSetter) {
          nextContentSetter(true);
          const nextElement = document.querySelector(nextElementClass);
          if (nextElement) {
            nextElement.classList.remove('animate__animated', 'animate__fadeOut');
            nextElement.style.opacity = '1';
            nextElement.classList.add('show');
          }
        } else {
          // For home
          const contentElement = document.querySelector('.content-area');
          if (contentElement) {
            contentElement.classList.remove('animate__fadeOut', 'animate__zoomOut');
            contentElement.classList.add('animate__animated', 'animate__fadeIn');
          }
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
  }, [showUFO, section, showMiddleContent, showBottomContent, showWorksContent]);

  if (!isDesktop) {
    return (
      <div className="mobile-message">
        <h1>This website is available on desktop</h1>
        <p>Because it needs a mouse to scroll and functionality.</p>
      </div>
    );
  }

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

        {/* Middle Background Layer for Transition */}
        {(showMiddleBg || isBgFadingOutMiddle) && (
          <div 
            className={`new-bg middle-bg animate__animated ${showMiddleBg ? 'animate__fadeInUp' : 'animate__fadeOutDown'}`}
            style={{ 
              backgroundImage: `url(${middleBg})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
        )}

        {/* Bottom Background Layer for Transition */}
        {(showBottomBg || isBgFadingOutBottom) && (
          <div 
            className={`new-bg bottom-bg animate__animated ${showBottomBg ? 'animate__fadeInUp' : 'animate__fadeOutDown'}`}
            style={{ 
              backgroundImage: `url(${bottomBg})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
        )}

        {/* Works Background Layer for Transition */}
        {(showWorksBg || isBgFadingOutWorks) && (
          <div 
            className={`new-bg works-bg animate__animated ${showWorksBg ? 'animate__fadeInUp' : 'animate__fadeOutDown'}`}
            style={{ 
              backgroundImage: `url(${worksBg})`,
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
            <a href="mailto:empuertojohnellchess@gmail.com" className='contact-header'>CONTACT ME</a>
          </header>

          {/* Content Container - Only this changes */}
          <div className="home-con">
            <div className="content-area">
              {section === 0 && <Home />}
              {section === 2 && showMiddleContent && <Middle />}
              {section === 4 && showBottomContent && <Bottom />}
              {section === 6 && showWorksContent && <Works />}
            </div>
          </div>

          {/* Moving Floating Up and Down Scroll Icon - Always visible */}
          <div className="scroll-icon">
            <img src={scroll} alt="scroll" />
          </div>

          {/* Floating Icons - Always visible */}
          <div className="floating-icons animate__animated animate__fadeInUp animate__delay-4s">
            <div className="icon-item">
              <a href="https://github.com/Johnell-Empuerto" target='_blank'><img src={github} alt="github" /></a> 
              <p>GitHub</p>
            </div>

            <div className="icon-item">
              <a href="https://www.linkedin.com/in/johnell-empuerto-a894a7276" target='_blank'><img src={linkedin} alt="linkedin" /></a>
              <p>LinkedIn</p>
            </div>

            <div className="icon-item">
              <a href="https://www.instagram.com/johnellempuerto/" target='_blank'><img src={instagram} alt="instagram" /></a>
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