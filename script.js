document.addEventListener('DOMContentLoaded', function() {
    // Dark/Light Mode Toggle
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('light-theme');
    });

    // Modal Windows
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const downloadModal = document.getElementById('downloadModal');
    const trailerModal = document.getElementById('trailerModal');
    const closeBtns = document.querySelectorAll('.close');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const trailerBtns = document.querySelectorAll('.trailer-btn');
    
    // Open modals
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });
    
    signupBtn.addEventListener('click', function() {
        signupModal.style.display = 'block';
    });
    
    // Close modals
    closeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            downloadModal.style.display = 'none';
            trailerModal.style.display = 'none';
        });
    });
    
    // Download buttons
    downloadBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            downloadModal.style.display = 'block';
        });
    });
    
    // Trailer buttons
    trailerBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const trailerId = this.getAttribute('data-trailer');
            const trailerTitle = document.getElementById('trailerTitle');
            
            // Set trailer title based on data-trailer attribute
            if (trailerId === 'featured') {
                trailerTitle.textContent = 'The Latest Blockbuster - Trailer';
            } else if (trailerId === 'trailer1') {
                trailerTitle.textContent = 'Space Explorers 2 - Trailer';
            } else {
                trailerTitle.textContent = 'Movie Trailer';
            }
            
            trailerModal.style.display = 'block';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
        if (event.target === downloadModal) {
            downloadModal.style.display = 'none';
        }
        if (event.target === trailerModal) {
            trailerModal.style.display = 'none';
        }
    });
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        downloadModal.style.display = 'block';
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        downloadModal.style.display = 'block';
    });
    
    // Animated Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let slideWidth = slides[0].clientWidth + 20; // Width + margin
    let currentIndex = 0;
    
    // Clone first slides for infinite carousel
    const slidesToClone = 2;
    for (let i = 0; i < slidesToClone; i++) {
        const clone = slides[i].cloneNode(true);
        carouselTrack.appendChild(clone);
    }
    
    function moveToSlide(index) {
        carouselTrack.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex === 0) {
            // Jump to end clone
            carouselTrack.style.transition = 'none';
            moveToSlide(slides.length - slidesToClone);
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
                moveToSlide(currentIndex - 1);
            }, 10);
        } else {
            moveToSlide(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex === slides.length) {
            // Jump to start
            carouselTrack.style.transition = 'none';
            moveToSlide(0);
            setTimeout(() => {
                carouselTrack.style.transition = 'transform 0.5s ease-in-out';
                moveToSlide(currentIndex + 1);
            }, 10);
        } else {
            moveToSlide(currentIndex + 1);
        }
    });
    
    // Auto slide
    setInterval(() => {
        nextBtn.click();
    }, 5000);
    
    // Upcoming Movies Countdown
    const countdowns = document.querySelectorAll('.countdown');
    
    countdowns.forEach(countdown => {
        const releaseDate = new Date(countdown.getAttribute('data-release'));
        const daysEl = countdown.querySelector('.days');
        const hoursEl = countdown.querySelector('.hours');
        const minutesEl = countdown.querySelector('.minutes');
        const secondsEl = countdown.querySelector('.seconds');
        
        function updateCountdown() {
            const now = new Date();
            const diff = releaseDate - now;
            
            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            daysEl.textContent = days < 10 ? `0${days}` : days;
            hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
            minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
            secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
});