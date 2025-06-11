// src/app/page.jsx
'use client'; // Needed if you plan to add interactive hooks here, or if children components are client components

import Link from 'next/link';

const HomePage = () => {
  return (
    <> {/* Using a React Fragment to return multiple top-level elements */}
      <div className="title-home">
        <h1>Curious About-</h1>
        <h1>FYP Orientation?</h1>
        {/* Using Next.js Link component for internal navigation */}
        <Link href="/fyp">Find Your Answer Here!</Link>
      </div>

      {/* Footer content directly on this page */}
      <footer style={{
        backgroundColor: '#59282b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        height: '80px',
        borderTop: '1px solid white',
        color: 'white' // Assuming text color needs to be white
      }}>
        <p>See you in FYP! - @efwaipiel.alsut</p>
        <a href="https://www.instagram.com/efwaipiel.alsut?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
          <img src="/assets/instagram.png" alt="instagram-logo" style={{height: '50px'}} />
        </a>
      </footer>
    </>
  );
};

export default HomePage;