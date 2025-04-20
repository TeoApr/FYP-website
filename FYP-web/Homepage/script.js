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