// src/components/MainLayout.jsx
'use client'; // This component needs to be a client component because it imports Navbar (which is client)

import Navbar from './navbar'; // Import Navbar
import Footer from './footer'; // Import Footer

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar /> {/* Render the Navbar component */}
      <main>{children}</main> {/* This is where the specific page content will be rendered */}
      <Footer /> {/* Render the Footer component */}
    </>
  );
};

export default MainLayout;