const textContainer = document.getElementById('circle-text-container');
const characters = document.querySelectorAll('.circle-char');
const radius = 100; // Radius of the circle (half of container width)
let angleOffset = 0; // Angle for rotation
let mouseX = window.innerWidth / 2; // Default to center of the screen
let mouseY = window.innerHeight / 2;

// Update mouse position when the mouse moves
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Function to update the circular text's position and orientation
function rotateCircularText() {
  // Position the container at the mouse's location
  textContainer.style.left = `${mouseX}px`;
  textContainer.style.top = `${mouseY}px`;

  const charCount = characters.length; // Number of characters
  const angleStep = (2 * Math.PI) / (charCount * 1); // Angle between each character

  characters.forEach((char, index) => {
    const angle = angleStep * index + angleOffset; // Position of each character on the circle

    // Calculate character's position on the circular path
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // Align character rotation along the tangent of the circle
    const rotationAngle = (angle * 180) / Math.PI + 90; // Convert to degrees and adjust for alignment

    // Apply position and rotation
    char.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${rotationAngle}deg)`;
  });

  // Increment the rotation angle for the next frame
  angleOffset -= 0.02; // Adjust speed of rotation

  // Continue the animation
  requestAnimationFrame(rotateCircularText);
}

// Start the animation
document.addEventListener('DOMContentLoaded', () => {
  rotateCircularText();
});

// Video hover behavior
document.querySelectorAll('video').forEach(video => {
  video.muted = true; // Ensure video is muted for autoplay compatibility

  // Play the video on hover
  video.addEventListener('mouseenter', () => {
    video.play().catch(error => console.error('Error playing video:', error));
  });

  // Pause and reset the video on hover out
  video.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});