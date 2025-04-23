// navbar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('resp-nav');

if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if(close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}



// faq
const faqQuestions = document.querySelectorAll('.faq-question');
        
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const toggle = question.querySelector('.faq-toggle');
        
        // Toggle active class
        answer.classList.toggle('active');
        
        // Change the toggle symbol
        if (toggle.textContent === '+') {
            toggle.textContent = '−';
        } else {
            toggle.textContent = '+';
        }
        
        // Close other answers
        const otherAnswers = document.querySelectorAll('.faq-answer.active');
        const otherToggles = document.querySelectorAll('.faq-toggle');
        
        otherAnswers.forEach(item => {
            if (item !== answer && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
        
        otherToggles.forEach(item => {
            if (item !== toggle && item.textContent === '−') {
                item.textContent = '+';
            }
        });
    });
});

// Search functionality
const searchInput = document.getElementById('searchFAQ');
const faqItems = document.querySelectorAll('.faq-item');

searchInput.addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const fromA = params.get("from") === "A";

  if (fromA) {
    // Slide in animasi secara berurutan
    const boxes = [document.getElementById("box1"), document.getElementById("box2"), document.getElementById("box3")];

    boxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("slide-in");
      }, index * 300); // delay antar kotak
    });
  }
});

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${0.2 * index}s`;
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0
  });

  faqItems.forEach((item, i) => {
    observer.observe(item);
  });


// fyp
document.getElementById('exploreButton').addEventListener('click', function() {
  const contentSection = document.getElementById('content-section');
  contentSection.scrollIntoView({ behavior: 'smooth' });
});