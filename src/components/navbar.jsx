// src/components/Navbar.jsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav id="navbar-container">
      <Link href="/fyp" id="logo-fypl">
        <img src="/assets/Logo.png" alt="logo" id="logo-nav" />
      </Link>

      <div>
        <ul id="resp-nav" className={isMobileMenuOpen ? 'active' : ''}>
          <li><Link href="/fyp" onClick={() => setIsMobileMenuOpen(false)}>FYP</Link></li>
          <li><Link href="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link></li>
          <li><Link href="/fypl" onClick={() => setIsMobileMenuOpen(false)}>FYPL</Link></li>
          {/* NEW: Link to the all-team page */}
          <li><Link href="/all-team" onClick={() => setIsMobileMenuOpen(false)}>FL&FP</Link></li>
          {/* END NEW */}
          <li><a href="https://freshmen.apps.binus.ac.id" target="_blank" rel="noopener noreferrer">Register</a></li>
          <a href="#" id="close" onClick={toggleMobileMenu}>
            <img src="/assets/x-button.png" alt="Close menu" />
          </a>
        </ul>
      </div>

      <div id="mobile" onClick={toggleMobileMenu}>
        <i id="bar"><img src="/assets/drop-button.png" alt="Open menu" /></i>
      </div>
    </nav>
  );
};

export default Navbar;