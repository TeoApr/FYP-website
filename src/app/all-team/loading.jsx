// src/app/all-team/loading.jsx
'use client';

import PageLoader from '../../components/PageLoader'; // Adjust path based on your components folder

// This component will be displayed instantly while src/app/all-team/page.jsx is loading.
export default function Loading() {
  return <PageLoader initialLoad={true} />;
}