// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
let isMenuOpen = false;

// Create overlay element
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = isMenuOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close menu when clicking nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (isMenuOpen) {
                hamburger.click();
            }
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (window.scrollY > 100) {
        navbar.style.background = currentTheme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = currentTheme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Handle contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector('select').value;
    const message = this.querySelector('textarea').value;
    
    // Create WhatsApp message for client
    const clientMessage = `*New Service Request*%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Service:* ${service}%0A
*Message:* ${message}`;
    
    // Create WhatsApp message for owner with more details
    const ownerMessage = `*New Lead Alert!*%0A
*Client Details:*%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Service:* ${service}%0A
*Message:* ${message}%0A
*Time:* ${new Date().toLocaleString()}`;
    
    // WhatsApp numbers
    const clientNumber = phone.replace(/[^0-9]/g, ''); // Clean phone number
    const ownerNumber = '917972935258'; // Owner's number
    
    // Show thank you modal
    const modal = document.getElementById('thankYouModal');
    modal.classList.add('show');
    
    // Send data to owner's WhatsApp silently
    const ownerWhatsappURL = `https://wa.me/${ownerNumber}?text=${ownerMessage}`;
    const ownerTab = window.open(ownerWhatsappURL, '_blank');
    if (ownerTab) {
        ownerTab.blur(); // Immediately blur the owner tab
        window.focus(); // Focus back on the main window
    }
    
    // Close modal and redirect client after 5 seconds
    setTimeout(() => {
        modal.classList.remove('show');
        setTimeout(() => {
            // Create client WhatsApp URL
            const clientWhatsappURL = `https://wa.me/${ownerNumber}?text=${clientMessage}`;
            // Open WhatsApp in new tab for client
            window.open(clientWhatsappURL, '_blank');
            // Reset form
            this.reset();
        }, 300);
    }, 5000);
});

// Service Cards Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
    });
});

// Intersection Observer for Fade-In Animation
const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize theme from localStorage or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
const themeToggle = document.getElementById('themeToggle');
themeToggle.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
    
    // Update navbar background based on new theme
    if (window.scrollY > 100) {
        navbar.style.background = newTheme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = newTheme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    }
});

// Language translations
const translations = {
    en: {
        home: "Home",
        services: "Services",
        about: "About",
        contact: "Contact",
        heroTitle: "Your Trusted Partner in Technical Solutions",
        heroDesc: "Expert services in Electrical, CCTV, Networking & Security Systems",
        ctaButton: "Get Started",
        servicesTitle: "Our Services",
        aboutTitle: "Why Choose Us",
        contactTitle: "Contact Us",
        // Service Cards
        electricalTitle: "Electrical Services",
        electricalDesc: "Professional electrical installation, maintenance, and repair services for your home and business.",
        cctvTitle: "CCTV Installation",
        cctvDesc: "State-of-the-art surveillance systems with professional installation and maintenance.",
        networkTitle: "Network Cabling",
        networkDesc: "Expert CAT6, CAT6A, and CAT7 cable installation for optimal network performance.",
        accessTitle: "Smart Access Control",
        accessDesc: "Modern door access solutions for enhanced security and convenience.",
        // Features
        qualityService: "Best Quality Service",
        support: "24/7 Emergency Support",
        workmanship: "Guaranteed Workmanship",
        pricing: "Competitive Pricing",
        experience: "15+ Years of Experience",
        satisfaction: "100% Customer Satisfaction",
        expertise: "Expert Technical Team",
        // Form
        formName: "Your Name",
        formEmail: "Your Email",
        formPhone: "Phone Number",
        formService: "Select Service",
        formMessage: "Your Message",
        submitButton: "Submit",
        // Services Options
        serviceOpt1: "Electrical Services",
        serviceOpt2: "CCTV Installation",
        serviceOpt3: "Network Cabling",
        serviceOpt4: "Smart Access Control"
    },
    ar: {
        home: "الرئيسية",
        services: "خدماتنا",
        about: "من نحن",
        contact: "اتصل بنا",
        heroTitle: "شريكك الموثوق في الحلول التقنية",
        heroDesc: "خدمات متخصصة في الكهرباء والمراقبة والشبكات وأنظمة الأمان",
        ctaButton: "ابدأ الآن",
        servicesTitle: "خدماتنا",
        aboutTitle: "لماذا تختارنا",
        contactTitle: "تواصل معنا",
        // Service Cards
        electricalTitle: "الخدمات الكهربائية",
        electricalDesc: "خدمات التركيب والصيانة والإصلاح الكهربائية المهنية لمنزلك وعملك",
        cctvTitle: "تركيب كاميرات المراقبة",
        cctvDesc: "أنظمة مراقبة متطورة مع التركيب والصيانة المهنية",
        networkTitle: "تمديد شبكات",
        networkDesc: "تركيب كابلات CAT6 وCAT6A وCAT7 بخبرة عالية لأداء شبكي مثالي",
        accessTitle: "التحكم بالدخول الذكي",
        accessDesc: "حلول أبواب ذكية حديثة لتعزيز الأمان والراحة",
        // Features
        qualityService: "أفضل جودة خدمة",
        support: "دعم طوارئ 24/7",
        workmanship: "ضمان العمل",
        pricing: "أسعار تنافسية",
        experience: "خبرة تزيد عن 15 عامًا",
        satisfaction: "رضا العملاء 100%",
        expertise: "فريق تقني متخصص",
        // Form
        formName: "الاسم",
        formEmail: "البريد الإلكتروني",
        formPhone: "رقم الجوال",
        formService: "اختر الخدمة",
        formMessage: "رسالتك",
        submitButton: "إرسال",
        // Services Options
        serviceOpt1: "الخدمات الكهربائية",
        serviceOpt2: "تركيب كاميرات المراقبة",
        serviceOpt3: "تمديد شبكات",
        serviceOpt4: "التحكم بالدخول الذكي"
    }
};

// Initialize language from localStorage or default to English
const currentLang = localStorage.getItem('lang') || 'en';
document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
const langToggle = document.getElementById('langToggle');
langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';

// Update text content based on language
function updateContent(lang) {
    // Update navigation
    document.querySelector('a[href="#home"]').textContent = translations[lang].home;
    document.querySelector('a[href="#services"]').textContent = translations[lang].services;
    document.querySelector('a[href="#about"]').textContent = translations[lang].about;
    document.querySelector('a[href="#contact"]').textContent = translations[lang].contact;
    
    // Update hero section
    document.querySelector('.hero h1').textContent = translations[lang].heroTitle;
    document.querySelector('.hero p').textContent = translations[lang].heroDesc;
    document.querySelector('.cta-button').textContent = translations[lang].ctaButton;
    
    // Update section titles
    document.querySelector('#services .section-title').textContent = translations[lang].servicesTitle;
    document.querySelector('#about .section-title').textContent = translations[lang].aboutTitle;
    document.querySelector('#contact .section-title').textContent = translations[lang].contactTitle;
    
    // Update service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards[0].querySelector('h3').textContent = translations[lang].electricalTitle;
    serviceCards[0].querySelector('p').textContent = translations[lang].electricalDesc;
    serviceCards[1].querySelector('h3').textContent = translations[lang].cctvTitle;
    serviceCards[1].querySelector('p').textContent = translations[lang].cctvDesc;
    serviceCards[2].querySelector('h3').textContent = translations[lang].networkTitle;
    serviceCards[2].querySelector('p').textContent = translations[lang].networkDesc;
    serviceCards[3].querySelector('h3').textContent = translations[lang].accessTitle;
    serviceCards[3].querySelector('p').textContent = translations[lang].accessDesc;
    
    // Update features
    const features = document.querySelectorAll('.feature p');
    features[0].textContent = translations[lang].qualityService;
    features[1].textContent = translations[lang].support;
    features[2].textContent = translations[lang].workmanship;
    features[3].textContent = translations[lang].pricing;
    features[4].textContent = translations[lang].experience;
    features[5].textContent = translations[lang].satisfaction;
    
    // Update form
    const form = document.querySelector('.contact-form');
    form.querySelector('input[type="text"]').placeholder = translations[lang].formName;
    form.querySelector('input[type="email"]').placeholder = translations[lang].formEmail;
    form.querySelector('input[type="tel"]').placeholder = translations[lang].formPhone;
    
    // Update select options
    const select = form.querySelector('select');
    select.options[0].text = translations[lang].formService;
    select.options[1].text = translations[lang].serviceOpt1;
    select.options[2].text = translations[lang].serviceOpt2;
    select.options[3].text = translations[lang].serviceOpt3;
    select.options[4].text = translations[lang].serviceOpt4;
    
    form.querySelector('textarea').placeholder = translations[lang].formMessage;
    form.querySelector('.submit-button').textContent = translations[lang].submitButton;
}

// Language toggle functionality
langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', newLang);
    langToggle.textContent = newLang === 'ar' ? 'EN' : 'AR';
    
    updateContent(newLang);
});

// Initial content update
updateContent(currentLang);

// Update initial button text
langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';

// ... rest of the existing code ... 