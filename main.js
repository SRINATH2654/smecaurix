// Select all elements with "slide-in" class
const slideEls = document.querySelectorAll('.slide-in');

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.2 }); // trigger when 20% of element is visible

// Attach observer to each section
slideEls.forEach(el => observer.observe(el));

// Create moving stars dynamically
document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.createElement("div");
  starsContainer.classList.add("stars");
  document.body.appendChild(starsContainer);

  const numStars = 50; // adjust density of stars

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random position
    star.style.left = Math.random() * 100 + "vw";

    // Random size
    const size = Math.random() * 3 + 1; // 1px - 4px
    star.style.width = size + "px";
    star.style.height = size + "px";

    // Random duration for rise animation
    star.style.animationDuration = Math.random() * 10 + 5 + "s";

    // Random delay to stagger motion
    star.style.animationDelay = Math.random() * 10 + "s";

    starsContainer.appendChild(star);
  }
});


