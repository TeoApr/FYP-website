// src/components/TeamMemberCard.jsx
'use client';

import { useRef } from 'react';
import { createConfetti } from '../utils/confetti';

// Re-added 'image' to props destructuring
const TeamMemberCard = ({ id, name, program, school, role, image, disableConfetti }) => {
  const confettiContainerRef = useRef(null);

  const handleMouseEnter = () => {
    if (!disableConfetti && confettiContainerRef.current) {
      createConfetti(confettiContainerRef.current);
    }
  };

  return (
    <div
      className="fypl-solo"
      id={id}
      onMouseEnter={!disableConfetti ? handleMouseEnter : undefined}
    >
      <p style={{ fontWeight: 'bold' }}>{role}</p>

      {/* This section is NOW UNCOMMENTED to display the image again */}
      {image ? ( // Check if image prop exists and is not null/empty
        <img src={image} alt={name} />
      ) : (
        // The 'No Image' placeholder will now only show if 'image' prop is actually missing/empty
        <div style={{
            width: '100%',
            height: '250px', // Adjust height to match your desired card image height
            backgroundColor: '#b99b84', // Placeholder background color
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '8px',
            padding: '10px',
            boxSizing: 'border-box',
            textAlign: 'center'
          }}>
            No Image
          </div>
      )}

      <p>{name}</p>
      <p style={{ fontSize: '0.9em', color: '#ccc' }}>{program}</p>
      <p style={{ fontSize: '0.8em', color: '#aaa' }}>{school}</p>

      <div className="confetti-container" ref={confettiContainerRef}></div>
    </div>
  );
};

export default TeamMemberCard;