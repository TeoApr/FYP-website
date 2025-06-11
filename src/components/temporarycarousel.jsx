// src/components/TestimonialCarousel.jsx
'use client'; // This directive is crucial for client-side functionality (hooks, intervals, event listeners)

import { useState, useEffect, useRef } from 'react';

// Define your testimonial data directly here
const testimonialsData = [
  {
    content: "Being a Chaperone during FYP was one of the most rewarding experiences of my university life. Guiding freshmen through their first steps at BINUS helped me develop leadership skills while creating lasting connections.",
    author: "Juan Ariviano C.",
    major: "CS - B27",
    image: "/assets/juan-socs.png",
  },
  {
    content: "FYP is where I found my university family. As a Chaperone, I had the opportunity to share my BINUS experience and help freshmen navigate their new journey with confidence and excitement.",
    author: "Shaena Fazila Rachman",
    major: "GBM - B27",
    image: "/assets/shae-gbm.png",
  },
  {
    content: "The bonds formed during FYP last far beyond orientation. As a Chaperone, watching freshmen transform from nervous newcomers to confident Binusians was incredibly fulfilling. It's an experience I'll always treasure.",
    author: "Teo Apriyandi",
    major: "CS - 27",
    image: "/assets/teo-socs.png",
  },
  {
    content: "Being a Chaperone taught me patience, empathy, and how to make others feel welcome. These skills have been invaluable throughout my university career and beyond.",
    author: "Vanya Aurelia Budiman",
    major: "Film - 27",
    image: "/assets/vanya-film.png",
  },
  {
    content: "FYP is where university life truly begins. As a Chaperone, I got to be part of that special moment for so many freshmen. It's an experience that shaped my entire BINUS journey.",
    author: "Muhammad Fadhil Habi",
    major: "BC - B27",
    image: "/assets/fadil-bc.png",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State for current slide index
  const totalCards = testimonialsData.length;
  const autoSlideIntervalRef = useRef(null); // useRef to keep track of the interval ID

  // Function to move to the next card
  const showNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    resetInterval(); // Reset autoplay after manual navigation
  };

  // Function to move to the previous card
  const showPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
    resetInterval(); // Reset autoplay after manual navigation
  };

  // Function to reset (clear and restart) the autoplay interval
  const resetInterval = () => {
    clearInterval(autoSlideIntervalRef.current); // Clear any existing interval
    autoSlideIntervalRef.current = setInterval(showNextCard, 5000); // Start new interval
  };

  // useEffect for initial autoplay start and cleanup
  useEffect(() => {
    resetInterval(); // Start autoplay when component mounts
    // Cleanup function: clears the interval when the component unmounts
    return () => clearInterval(autoSlideIntervalRef.current);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Touch events for mobile swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50; // Minimum swipe distance
    if (touchStartX.current - touchEndX > swipeThreshold) {
      // Swipe left (move to next card)
      showNextCard();
    } else if (touchEndX - touchStartX.current > swipeThreshold) {
      // Swipe right (move to previous card)
      showPreviousCard();
    }
  };

  // Keyboard navigation (optional, but good for accessibility)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        showPreviousCard();
      } else if (e.key === "ArrowRight") {
        showNextCard();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <section className="testimonials-section">
      <div className="title-testimonials">
        <h1>Chaperone Insight's</h1>
        <p>Testimonials from Past Freshmen Chaperone</p>
      </div>

      <div
        className="carousel-container"
        // Pause autoplay on hover
        onMouseEnter={() => clearInterval(autoSlideIntervalRef.current)}
        onMouseLeave={resetInterval}
      >
        <div
          className="carousel-wrapper-2"
          id="testimonialWrapper" // Keep ID for potential CSS targeting if needed
          style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Dynamic transform
          onTouchStart={handleTouchStart} // Attach touch event handlers
          onTouchEnd={handleTouchEnd}
        >
          {/* Dynamically render testimonial cards from data */}
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index} // Key is important for React list rendering
              className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
            >
              <div className="testimonial-content">"{testimonial.content}"</div>
              <div className="testimonial-author">
                <div className="author-image">
                  {/* Image source from data, remember leading '/' for public folder */}
                  <img src={testimonial.image} alt={testimonial.author} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.major}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button
            className="control-btn prev-btn"
            aria-label="Previous testimonial"
            onClick={showPreviousCard} // Attach onClick handlers
          >
            ←
          </button>
          <button
            className="control-btn next-btn"
            aria-label="Next testimonial"
            onClick={showNextCard} // Attach onClick handlers
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;