// src/utils/confetti.js

// This function creates and animates confetti particles within a given container.
export function createConfetti(container) {
  // Clear any existing confetti particles to ensure a fresh animation
  container.innerHTML = "";

  // Define an array of colors for the confetti pieces
  const colors = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
  ];

  // Create a specified number of confetti pieces (e.g., 30)
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti"; // Assign a class for styling (from globals.css)

    // Generate random properties for each confetti piece
    const size = Math.random() * 10 + 5; // Random size between 5px and 15px
    const color = colors[Math.floor(Math.random() * colors.length)]; // Random color from the defined array

    // Set CSS custom properties (variables) for animation values
    // These will be used in the 'fall' keyframe animation in your CSS
    confetti.style.setProperty("--start-x", `${Math.random() * 100}%`); // Random start X position
    confetti.style.setProperty("--start-y", "0%"); // Start at the top of the container
    confetti.style.setProperty("--end-x", `${Math.random() * 200 - 50}%`); // Random end X position (can go outside container)
    confetti.style.setProperty("--end-y", `${Math.random() * 100 + 1000}%`); // Random end Y position (falls below container)
    confetti.style.setProperty("--rotation", `${Math.random() * 360}deg`); // Random final rotation

    // Apply basic styles and trigger the CSS animation
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.animation = `fall ${Math.random() * 4.5 + 1}s linear forwards`; // Random duration
    confetti.style.left = `${Math.random() * 100}%`; // Initial random left position
    confetti.style.top = "0"; // Initial top position

    // Append the confetti piece to the container
    container.appendChild(confetti);
  }

  // Set a timeout to remove the confetti pieces after the animation completes
  setTimeout(() => {
    container.innerHTML = ""; // Clear all confetti from the container
  }, 5000); // Remove after 3 seconds
}