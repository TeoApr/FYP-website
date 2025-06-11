// src/components/SchoolCarousel.jsx
'use client'; // This component uses useState, useEffect, useRef, and event handlers

import { useState, useEffect, useRef } from 'react';
import TeamMemberCard from './/MemberCard'; // Import the TeamMemberCard component

// No CARDS_PER_SLIDE constant needed anymore as we're showing 1 per slide

const SchoolCarousel = ({ school, schoolTagline, members }) => {
  const [currentSlide, setCurrentSlide] = useState(0); // State for the current active slide index
  const carouselRef = useRef(null); // Ref for the carousel wrapper to handle touch events
  const autoplayIntervalRef = useRef(null); // Ref to store the ID of the autoplay interval

  // The total number of slides is now simply the number of members,
  // as each member will get their own slide.
  const totalSlides = members.length;

  // Function to display a specific slide
  const showSlide = (index) => {
    let newIndex = index;
    // Handle wrapping around for infinite loop effect
    if (newIndex < 0) newIndex = totalSlides - 1;
    if (newIndex >= totalSlides) newIndex = 0;
    setCurrentSlide(newIndex);
    resetAutoplay(); // Reset autoplay timer after manual navigation
  };

  // Function to reset/restart the autoplay timer
  const resetAutoplay = () => {
    clearInterval(autoplayIntervalRef.current); // Clear existing interval
    if (totalSlides > 1) { // Only autoplay if there's more than one slide
      autoplayIntervalRef.current = setInterval(() => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 5000); // Auto-slide every 5 seconds
    }
  };

  // Effect to start autoplay when component mounts and clean up on unmount
  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(autoplayIntervalRef.current); // Cleanup interval
  }, [totalSlides]); // Re-run effect if total number of slides changes

  // Touch event handling for swipe gestures
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50; // Minimum pixel distance for a swipe
    if (touchEndX < touchStartX.current - swipeThreshold) {
      showSlide(currentSlide + 1); // Swipe left (next slide)
    } else if (touchEndX > touchStartX.current + swipeThreshold) {
      showSlide(currentSlide - 1); // Swipe right (previous slide)
    }
  };

  return (
    // Main wrapper for the school's carousel section
    <div className="carousel-wrapper" data-school={school.toLowerCase().replace(/\s/g, '-')}>
      {/* School header (static for each school carousel) */}
      <div className="school-header">
        <h1>{school}</h1>
        <p>{schoolTagline}</p>
      </div>

      {/* Carousel content wrapper */}
      <div
        className="carousel"
        ref={carouselRef} // Attach ref for touch events
        style={{ transform: `translateX(-${currentSlide * 100}%)` }} // Dynamic transform for sliding
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        // Pause/resume autoplay on hover
        onMouseEnter={() => clearInterval(autoplayIntervalRef.current)}
        onMouseLeave={resetAutoplay}
      >
        {/*
          Map directly over the 'members' array. Each 'member' will now
          represent a single slide in the carousel.
          The key={member.id} is crucial for React's list rendering optimization.
        */}
        {members.map((member) => (
          <div className="carousel-slide" key={member.id}> {/* Unique key for each slide */}
            <div className="container-fypl">
              <div className="card-fypl">
                {/* Render the TeamMemberCard for the current member */}
                <TeamMemberCard
                  key={member.id} // Unique key for the individual TeamMemberCard component
                  id={member.id}
                  major={member.major}
                  name={member.name}
                  image={member.image}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls (Previous/Next buttons and Pagination dots) */}
      {/* Only show controls if there's more than one slide */}
      {totalSlides > 1 && (
        <>
          <button className="carousel-nav prev" onClick={() => showSlide(currentSlide - 1)}>&lsaquo;</button>
          <button className="carousel-nav next" onClick={() => showSlide(currentSlide + 1)}>&rsaquo;</button>
          <div className="carousel-pagination">
            {/* Render pagination dots based on totalSlides */}
            {/* Updated key prop for pagination dots */}
            {Array.from({ length: totalSlides }).map((_, index) => (
              <span
                key={`dot-${school.schoolSlug}-${index}`} // <--- UPDATED KEY HERE!
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => showSlide(index)}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SchoolCarousel;