import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';
import leftArrow from "../assets/arrow_left.png";
import rightArrow from "../assets/arrow_right.png";

const Bottom = () => {
  const slides = [
    <div className="slider" key={1}>
        <div className="slide-content">
            <h3>Freelancer</h3>
            <p className="right-box">2022 - 2023</p>
            <p>
              After graduating from college in 2022, I began my journey as a freelancer, 
              exploring different galaxies of projects—web, mobile, and even microcontroller missions.
            </p>
        </div>
    </div>,
    <div className="slider" key={2}>
      <div className="slide-content">
        <h3>Website Developer</h3>
            <p className="right-box">2023 - 2024</p>
            <p>
                In 2023, I launched my career as a Website Developer at Proweaver Inc., 
                crafting custom WordPress galaxies for clients.  
                After one orbit around the sun, I ascended to a new constellation — promoted as a Web2 Senior Developer.
            </p>
      </div>
    </div>,
    <div className="slider" key={3}>
      <div className="slide-content">
        <h3>Part Time Website Developer</h3>
            <p className="right-box">2023 - 2024</p>
            <p>
                I took a brief journey through another galaxy as a Part-Time Website Developer at Bexte from October to December, before discovering a new full-time mission. I left Proweaver to seek another star   system that could support me financially and help me expand my development career across new     horizons.
            </p>
      </div>
    </div>,
    <div className="slider" key={4}>
      <div className="slide-content">
        <h3>Software Engineer</h3>
            <p className="right-box">2025 - current</p>
            <p>
            Currently navigating the universe as a Software Engineer, where I craft interstellar solutions, explore new         technologies, and push the boundaries of innovation across the digital galaxy.
            </p>
      </div>
    </div>,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef(null);

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(slideRef.current, 
        { rotationX: 30, y: 200, scale: 1.4, opacity: 0 },
        { 
          rotationX: 0, 
          y: 0, 
          scale: 1, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power2.out",
          onComplete: () => setIsTransitioning(false)
        }
      );
    }
  }, [currentIndex]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    gsap.to(slideRef.current, 
      { 
        rotationX: -30, 
        y: -200, 
        scale: 1.4, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          );
        }
      }
    );
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    gsap.to(slideRef.current, 
      { 
        rotationX: 30, 
        y: 200, 
        scale: 1.4, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
          );
        }
      }
    );
  };

  return (
    <div className="bottom-con">
      <h2>THE COSMOS OF MY EXPERIENCE</h2>
      <div className="slider-container">
        <div className="slide" ref={slideRef}>{slides[currentIndex]}</div>

        <button className="arrow arrow-left" onClick={prevSlide}>
          <img src={leftArrow} alt="Previous" />
        </button>

        <button className="arrow arrow-right" onClick={nextSlide}>
          <img src={rightArrow} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Bottom;