document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------
    // Mobile Navigation Toggle
    // -----------------------------
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileNavToggle.addEventListener('click', () => {
        const isVisible = mainNav.getAttribute('data-visible');

        if (isVisible === 'false' || isVisible === null) {
            mainNav.setAttribute('data-visible', true);
            mobileNavToggle.setAttribute('aria-expanded', true);
        } else {
            mainNav.setAttribute('data-visible', false);
            mobileNavToggle.setAttribute('aria-expanded', false);
        }
    });

    // -----------------------------
    // Typing Effect
    // -----------------------------
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const words = ["Software Developer", "Computer Science Student"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChars = isDeleting ?
                currentWord.substring(0, charIndex--) :
                currentWord.substring(0, charIndex++);

            typingElement.textContent = currentChars;

            if (!isDeleting && charIndex === currentWord.length + 1) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end of word
            } else if (isDeleting && charIndex === -1) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before new word
            } else {
                const typingSpeed = isDeleting ? 75 : 150;
                setTimeout(type, typingSpeed);
            }
        }
        type();
    }

    // -----------------------------
    // Scroll Animations
    // -----------------------------
    const animatedElements = document.querySelectorAll('.animated');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // -----------------------------
    // Dark Mode Toggle
    // -----------------------------
    const themeToggle = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Function to set the theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.checked = theme === 'dark';
        }
    };

    // Check saved theme in localStorage
    if (currentTheme) {
        setTheme(currentTheme);
    } else {
        // Check for user's system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listener for the toggle switch
    if(themeToggle) {
        themeToggle.addEventListener('change', () => {
            setTheme(themeToggle.checked ? 'dark' : 'light');
        });
    }
});
