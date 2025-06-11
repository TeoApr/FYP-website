// src/app/fyp/page.jsx

'use client'; // This directive is crucial for client-side functionality (hooks, event listeners)

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/MainLayout'; // Import the custom layout component
import TestimonialCarousel from '../../components//temporarycarousel'; // Import the testimonial carousel

const FypPage = () => {
  // === JavaScript Logic for First Card Background Carousel ===
  const bgImages = [
    "/assets/card1.png",
    "/assets/card-2.png",
    "/assets/card-3.jpg",
    "/assets/card-4.png",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 3500);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [bgImages.length]);

  // === JavaScript Logic for Timeline Animation ===
  // Function to handle scrolling to the timeline section
  const exploreButtonHandler = () => {
    const timelineSec = document.getElementById("timeline-sec");
    if (timelineSec) {
      timelineSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timeline = document.querySelector(".timeline");
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (timeline && !timeline.classList.contains("animate")) {
              timeline.classList.add("animate"); // Add 'animate' class to trigger CSS animation
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the timeline is visible
    );

    if (timeline) {
      observer.observe(timeline);
    }

    // Apply sequential transition delays to each timeline item for staggered animation
    timelineItems.forEach((item, index) => {
      item.style.transitionDelay = `${0.2 * index}s`;
    });

    // Cleanup function: runs when the component unmounts or before the effect re-runs
    return () => {
      if (timeline) observer.unobserve(timeline);
    };
  }, []); // Empty dependency array: ensures this effect runs only once after initial render

  // === End of JavaScript Logic ===

  return (
    // Wrap the entire page content with MainLayout
    <MainLayout>
      {/* First Card section: Dynamic background image */}
      <div
        className="first-card"
        style={{ backgroundImage: `url('${bgImages[currentImageIndex]}')` }}
      >
        <div>
          <h1>What is FYP?</h1>
          <p>Your first step into the binusian journey.</p>
          <p>A space to explore, connect, and grow—without the pressure.</p>
          <p>
            You'll meet awesome friends, discover new passions, and get a feel for
            what uni life is really like.
          </p>
          <p>
            Expect fun events, creative projects, and chill moments that help you
            settle in. it's not just orientation—it's the start of something big.
          </p>
          <p>Welcome to BINUS, your story starts here.</p>
          {/* Button to scroll to the timeline section */}
          <button id="exploreButton" onClick={exploreButtonHandler}>Explore</button>
        </div>
      </div>

      {/* Timeline section */}
      <div className="main-wrapper" id="timeline-sec">
        <div className="timeline-container">
          <div className="timeline-title">
            <span>F</span>
            <span>Y</span>
            <span>P</span>
          </div>
          <div className="timeline">
            {/* Timeline items - these are static content */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">Pre FYP</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">Kick off FYPL - FL - FP</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">Training FL FP</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">Briefing FL FYPL</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">Opening FYP B2029</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">NEXT</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">Academic Experience</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">NEXT Step</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-text">Inauguration</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - Now rendered by the TestimonialCarousel component */}
      <TestimonialCarousel />

      {/* FAQ Card section */}
      <div className="card-faq">
        <div>
          <h1>Want to know</h1>
          <h1>more about FYP?</h1>
        </div>
        <Link href="/faq">Click Here</Link>
      </div>

      {/* Register Card section */}
      <div className="register-card">
        <h1>Register Now!</h1>
        <a href="https://freshmen.apps.binus.ac.id" target="_blank" rel="noopener noreferrer">Go to Freshmesn Apps</a>
      </div>
    </MainLayout>
  );
};

export default FypPage;