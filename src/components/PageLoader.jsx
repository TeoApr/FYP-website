// src/components/PageLoader.jsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter

const PageLoader = ({ initialLoad = false }) => {
  const [loading, setLoading] = useState(initialLoad);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const progressIntervalRef = useRef(null);
  const loadingTimeoutRef = useRef(null); // Ref to store the main loading timeout

  const startLoader = useCallback(() => {
    setLoading(true);
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) { // Fill faster, closer to 100%
          clearInterval(progressIntervalRef.current);
          return 95;
        }
        return prev + (Math.random() * 10 + 5); // Faster, more random progress
      });
    }, 50);
  }, []);

  const completeLoader = useCallback(() => {
    setProgress(100); // Ensure it hits 100%
    clearInterval(progressIntervalRef.current);
    // Use a small delay for the animation to show 100%
    loadingTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      setProgress(0); // Reset for next load
    }, 300); // Shorter delay after 100%
  }, []);

  // Effect to manage loader visibility based on route changes
  const isFirstClientSideRender = useRef(true); // Track first time this component renders client-side

  useEffect(() => {
    // On the very first page load, if loading.jsx is used, PageLoader gets initialLoad=true
    // We don't want this useEffect to interfere with that initial load.
    if (initialLoad) {
      // If this loader is used by loading.jsx, it's already visible.
      // We just need to make sure it hides after the content loads.
      // We don't trigger startLoader() here as loading.jsx already makes it visible.
      const hideTimeout = setTimeout(() => {
        completeLoader();
      }, 1000); // Hide after a minimum of 1 second on initial load (or when data is ready)

      return () => clearTimeout(hideTimeout);
    }

    // For client-side navigations (e.g., clicking <Link>)
    // When pathname changes (after the very first render)
    if (!isFirstClientSideRender.current) {
      startLoader(); // Show loader immediately
      // Set a forced timeout to hide the loader after a short perceived delay
      // This is crucial for transitions that are too fast for progress to matter
      const forceHideTimeout = setTimeout(() => {
        completeLoader();
      }, 700); // For example, force hide after 700ms if not already hidden

      return () => {
        clearTimeout(forceHideTimeout);
        clearInterval(progressIntervalRef.current);
        completeLoader(); // Ensure cleanup if navigation is very fast or cancelled
      };
    }

    isFirstClientSideRender.current = false; // Mark that first client-side render has passed
  }, [pathname, initialLoad, startLoader, completeLoader]);


  // Add a listener for router "start" and "complete" events directly for more robust detection
  // This is often more reliable than just `pathname` for aggressive loaders.
  // Note: `router.events` is deprecated for App Router, but often used for this pattern.
  // The official way is `useSelectedLayoutSegment()` or `useSelectedLayoutSegments()` + `usePathname()`
  // combined with `React.Suspense` for loading states.
  // But for a global, animated progress bar, this often works.
  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      // console.log(`Loading: ${url}`);
      startLoader();
    };
    const handleRouteChangeComplete = (url) => {
      // console.log(`Complete: ${url}`);
      completeLoader();
    };
    const handleRouteChangeError = (err, url) => {
      // console.log(`Error: ${url}, Error: ${err}`);
      completeLoader();
    };

    // Check if router.events exists before subscribing (Pages Router compatibility)
    if (router.events) {
      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.on('routeChangeComplete', handleRouteChangeComplete);
      router.events.on('routeChangeError', handleRouteChangeError);
    }

    return () => {
      if (router.events) {
        router.events.off('routeChangeStart', handleRouteChangeStart);
        router.events.off('routeChangeComplete', handleRouteChangeComplete);
        router.events.off('routeChangeError', handleRouteChangeError);
      }
    };
  }, [router.events, startLoader, completeLoader]);


  if (!loading) return null;

  return (
    <div className="page-loader-fixed-overlay">
      {/* Spinning Logo */}
      <div className="page-loader-logo-container">
        <div className="page-loader-spinning-wrapper">
          <img src="/assets/Logo.png" alt="Loading Logo" className="page-loader-spinning-logo" />
        </div>
      </div>

      {/* Loading Bar Container */}
      <div className="page-loader-bar-outer">
        {/* Liquid Fill */}
        <div
          className="page-loader-bar-fill"
          style={{ width: `${progress}%` }}
        >
          {/* Liquid Wave Effect */}
          <div className="page-loader-liquid-wave-effect">
            <div
              className="page-loader-liquid-gradient"
              style={{
                background: `linear-gradient(90deg,
                  rgba(255,255,255,0) 0%,
                  rgba(255,255,255,0.3) 25%,
                  rgba(255,255,255,0.5) 50%,
                  rgba(255,255,255,0.3) 75%,
                  rgba(255,255,255,0) 100%)`
              }}
            />
          </div>

          {/* Animated Wave */}
          <div className="page-loader-animated-wave">
            <div className="page-loader-animated-wave-child" />
          </div>
        </div>

        {/* Progress Text */}
        <div className="page-loader-progress-text">
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Shimmer Effect */}
        <div className="page-loader-shimmer-effect" />
      </div>

      {/* Loading Text */}
      <div className="page-loader-text-section">
        <p>Loading...</p>
        <p>Please wait while we prepare your content</p>
      </div>

      {/* Floating particles */}
      <div className="page-loader-floating-particles-container">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="page-loader-floating-particle"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PageLoader;