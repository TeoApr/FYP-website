// src/components/Footer.jsx

// No 'use client' needed here if it's purely static content without hooks.
// If it were to include interactivity later, 'use client' would be added.

const Footer = () => {
  return (
    <footer>
      <p>See you in FYP! - @efwaipiel.alsut</p>
      {/* External link with target and rel for security */}
      <a
        href="https://www.instagram.com/efwaipiel.alsut?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/instagram.png" alt="instagram-logo" />
      </a>
    </footer>
  );
};

export default Footer;