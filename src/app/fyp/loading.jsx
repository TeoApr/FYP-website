// src/app/fyp/loading.jsx
'use client'; // loading.js/jsx files should generally be client components if they use hooks/interactivity

import PageLoader from '../../components/PageLoader'; // Adjust path based on your components folder

// This component will be displayed instantly while src/app/fyp/page.jsx is loading.
export default function Loading() {
  return <PageLoader initialLoad={true} />; // Pass initialLoad to indicate it's the first render of the loader
}