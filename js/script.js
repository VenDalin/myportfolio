// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetHref = link.getAttribute('href');
        
        // If it's a hash link (starts with #), handle smooth scrolling
        if (targetHref.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetHref);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
        // For other links (like project.html, about.html), let the browser handle normal navigation
        // Don't prevent default, let the browser navigate to the new page
    });
});


const contactBtn = document.getElementById('contactBtn');
const projectsBtn = document.getElementById('projectsBtn');

if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        // Add contact functionality here
        alert('Contact functionality would be implemented here!');
    });
}

if (projectsBtn) {
    projectsBtn.addEventListener('click', () => {
        // Add projects navigation here
        alert('Projects section would be implemented here!');
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const theme = document.body.getAttribute('data-theme') || 'light';
    if (window.scrollY > 100) {
        if (theme === 'dark') {
            header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)'; // dark background with opacity
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)'; // light background with opacity
        }
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--background)';
        header.style.backdropFilter = 'none';
    }

    // Update active nav link based on scroll position
    const sections = [...document.querySelectorAll('section[id]'), document.getElementById('footer')];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.hero-text > *, .profile-img').forEach(el => {
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const profileImg = document.querySelector('.profile-img');
    const rate = scrolled * -0.5;
    
    if (profileImg) {
        profileImg.style.transform = `translateY(${rate}px) scale(1)`;
    }
});

document.addEventListener('mousemove', (e) => {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    const rect = profileContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.01;
    const moveY = y * 0.01;
    
    profileContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

document.addEventListener('mouseleave', () => {
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.style.transform = 'translate(0, 0)';
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});



function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
});
