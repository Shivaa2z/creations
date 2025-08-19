// Global variables
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
});

// Slider functionality
function showSlide(n) {
    // Pause current video
    const currentVideo = slides[currentSlide].querySelector('.slide-video');
    if (currentVideo) {
        currentVideo.pause();
    }
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Play new video
    const newVideo = slides[currentSlide].querySelector('.slide-video');
    if (newVideo) {
        newVideo.play().catch(e => console.log('Video autoplay prevented:', e));
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function currentSlideSet(n) {
    showSlide(n - 1);
}

// Auto slider
function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Event listeners for slider
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    // Only initialize slider if elements exist
    if (slides.length > 0 && nextBtn && prevBtn) {
        // Initialize first video
        const firstVideo = slides[0].querySelector('.slide-video');
        if (firstVideo) {
            firstVideo.play().catch(e => console.log('Video autoplay prevented:', e));
        }
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlider();
            startSlider();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlider();
            startSlider();
        });
        
        // Start auto slider
        startSlider();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                stopSlider();
                // Pause current video on hover
                const currentVideo = slides[currentSlide].querySelector('.slide-video');
                if (currentVideo) {
                    currentVideo.pause();
                }
            });
            sliderContainer.addEventListener('mouseleave', () => {
                startSlider();
                // Resume current video when not hovering
                const currentVideo = slides[currentSlide].querySelector('.slide-video');
                if (currentVideo) {
                    currentVideo.play().catch(e => console.log('Video autoplay prevented:', e));
                }
            });
        }
    }
});

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 200;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 10);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            } else {
                entry.target.classList.add('fade-in-up');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    const serviceCards = document.querySelectorAll('.service-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    counters.forEach(counter => observer.observe(counter));
    serviceCards.forEach(card => observer.observe(card));
    statCards.forEach(card => observer.observe(card));
});

// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-tab');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Lightbox functionality
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxVideo = document.getElementById('lightbox-video');
            
            if (item.classList.contains('video')) {
                // Handle YouTube video lightbox
                const img = item.querySelector('img');
                const videoId = img.getAttribute('data-video-id');
                if (lightboxImg && lightboxVideo) {
                    lightboxImg.style.display = 'none';
                    lightboxVideo.style.display = 'block';
                    lightboxVideo.innerHTML = `
                        <iframe width="800" height="450" 
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            style="border-radius: 15px; max-width: 90vw; max-height: 80vh; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                        </iframe>
                    `;
                }
            } else {
                // Handle image lightbox
                const img = item.querySelector('img');
                if (lightboxImg && lightboxVideo) {
                    lightboxVideo.style.display = 'none';
                    lightboxImg.style.display = 'block';
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                }
            }
            
            if (lightbox) {
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close lightbox
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightbox = document.getElementById('lightbox');
    
    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
            const lightboxVideo = document.getElementById('lightbox-video');
            if (lightboxVideo) {
                lightboxVideo.innerHTML = ''; // Stop video playback
            }
        });
    }
    
    // Close lightbox when clicking outside content
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
                const lightboxVideo = document.getElementById('lightbox-video');
                if (lightboxVideo) {
                    lightboxVideo.innerHTML = '';
                }
            }
        });
    }
});

// Service card tilt effect
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('[data-tilt]');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
    });
});

// Contact form handling
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Thank you ${name}! Your message has been sent successfully. Shiva will get back to you soon at ${email}.`);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        event.target.reset();
    }, 2000);
}

// Download portfolio function
function downloadPortfolio() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#'; // In a real application, this would be the path to the PDF file
    link.download = 'Alex_Morgan_Portfolio.pdf';
    
    // Simulate download
    alert('Shiva Anchor Portfolio download started! In a real application, this would download a PDF file.');
    
    // In a real application, you would have:
    // link.href = '/path/to/shiva_anchor_portfolio.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Smooth scrolling for navigation links and buttons
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add scroll event for navbar background
document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(30, 58, 138, 0.98)';
    } else {
        navbar.style.background = 'rgba(30, 58, 138, 0.95)';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('.slide-content > *');
    animatedElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add parallax effect to hero section
document.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect for hero text (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.slide.active h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }
});

// Add scroll-to-top button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll-to-top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
    });
});

// Add lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add search functionality for portfolio (bonus feature)
function createSearchFilter() {
    const portfolioSection = document.querySelector('.portfolio-tabs');
    
    // Only create search filter if portfolio section exists
    if (!portfolioSection) {
        return;
    }
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search portfolio...';
    searchInput.className = 'portfolio-search';
    searchInput.style.cssText = `
        width: 300px;
        padding: 12px 20px;
        border: 2px solid #e2e8f0;
        border-radius: 25px;
        font-size: 16px;
        margin: 20px auto;
        display: block;
        transition: border-color 0.3s ease;
    `;
    
    portfolioSection.parentNode.insertBefore(searchInput, portfolioSection.nextSibling);
    
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#1e3a8a';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#e2e8f0';
    });
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            const img = item.querySelector('img');
            const alt = img.alt.toLowerCase();
            
            if (alt.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Initialize search filter
document.addEventListener('DOMContentLoaded', createSearchFilter);

// Language Translation System
const translations = {
    en: {
        // Navigation
        'home': 'Home',
        'about': 'About',
        'services': 'Services',
        'portfolio': 'Portfolio',
        'contact': 'Contact',
        'go-back': 'Go Back',
        
        // Hero Section
        'hero-title-1': 'Professional Anchor & Content Creator',
        'hero-desc-1': 'Bringing stories to life through compelling performances and engaging content',
        'hero-title-2': 'Award-Winning Anchor',
        'hero-desc-2': 'Hosting events and shows with charisma and professionalism',
        'hero-title-3': 'Social Media Influencer',
        'hero-desc-3': 'Inspiring millions with authentic content and brand partnerships',
        'watch-videos': 'Watch Videos',
        'book-now': 'Book Now',
        'see-stats': 'See Stats',
        
        // Social Media
        'instagram-followers': 'Instagram Followers',
        'youtube-subscribers': 'a2zcreations Subscribers',
        'twitter-followers': 'Twitter Followers',
        'facebook-fans': 'Facebook Fans',
        'follow': 'Follow',
        'subscribe': 'Subscribe',
        'like': 'Like',
        
        // Services
        'my-services': 'My Services',
        'anchoring': 'Anchoring',
        'anchoring-desc': 'Professional event hosting, award shows, corporate events, and live television programs.',
        'acting': 'Acting',
        'acting-desc': 'Film, television, and theater performances with versatility and emotional depth.',
        'agency': 'A2Z Creations Agency',
        'agency-desc': 'Complete movie production services including locations, manpower, casting, and materials for filmmakers.',
        'video-shooting': 'Video Shooting',
        'video-shooting-desc': 'Professional video production, commercials, music videos, and creative content.',
        'learn-more': 'Learn More',
        
        // Portfolio
        'my-portfolio': 'My Portfolio',
        'all': 'All',
        'videos': 'Videos',
        'images': 'Images',
        
        // About
        'about-shiva': 'About Shiva Anchor',
        'about-desc-1': 'With over 8 years of experience in the entertainment industry, Shiva Anchor has established himself as a versatile performer and influential content creator. From hosting major events to creating engaging content for a2zcreations, Shiva brings authenticity and professionalism to every project.',
        'about-desc-2': 'His journey began with anchoring local events during college, which quickly evolved into television hosting and digital content creation. Today, Shiva is not just an anchor but a digital entrepreneur who has built a massive following through a2zcreations, inspiring millions with his creative content and positive message.',
        'about-desc-3': 'Shiva\'s commitment to excellence and his ability to connect with audiences has made him one of the most sought-after talents in the industry. Whether it\'s hosting an event, creating content for a2zcreations, or a brand campaign, Shiva delivers with passion and precision.',
        'download-portfolio': 'Download Portfolio',
        
        // Stats
        'years-experience': 'Years Experience',
        'projects-completed': 'Projects Completed',
        'awards-won': 'Awards Won',
        'brand-partners': 'Brand Partners',
        
        // Contact
        'get-in-touch': 'Get In Touch',
        'contact-info': 'Contact Info',
        'send-message': 'Send Message',
        'your-name': 'Your Name',
        'your-email': 'Your Email',
        'your-message': 'Your Message',
        
        // Service Pages
        'professional-anchoring': 'Professional Anchoring Services',
        'professional-acting': 'Professional Acting Services',
        'a2z-agency': 'A2Z Creations Agency',
        'video-production': 'Professional Video Production',
        'hire-me': 'Hire Me',
        'partner-with-me': 'Partner With Me',
        'start-project': 'Start Project',
        'get-quote': 'Get Quote',
        'call-now': 'Call Now',
        'apply-now': 'Apply Now',
        
        // Anchoring Page
        'anchoring-page-desc': 'Expert event hosting, award shows, corporate events, and live television programs with charisma and professionalism that captivates audiences and ensures memorable experiences.',
        'my-anchoring-process': 'My Anchoring Process',
        'event-planning': 'Event Planning',
        'event-planning-desc': 'Comprehensive event planning including venue assessment, audience analysis, and program flow to ensure seamless execution.',
        'script-preparation': 'Script Preparation',
        'script-preparation-desc': 'Thorough script review, content customization, and preparation of engaging material tailored to your event\'s theme and audience.',
        'rehearsal-coordination': 'Rehearsal & Coordination',
        'rehearsal-coordination-desc': 'Pre-event rehearsals, technical coordination, and team briefings to ensure flawless performance on the day of the event.',
        'live-hosting': 'Live Event Hosting',
        'live-hosting-desc': 'Professional on-stage presence, audience engagement, smooth transitions, and adaptability to handle any unexpected situations.',
        'post-event-follow': 'Post-Event Follow-up',
        'post-event-follow-desc': 'Event wrap-up, feedback collection, and post-event content creation for social media and promotional purposes.',
        'anchoring-portfolio': 'Anchoring Portfolio',
        'corporate-event': 'Corporate Event Hosting\\nAnnual Conference',
        'award-show': 'Award Show Hosting\\nEntertainment Industry',
        'tv-show': 'Television Show\\nPrime Time Hosting',
        'wedding-hosting': 'Wedding Ceremonies\\nSpecial Occasions',
        'product-launch': 'Product Launch Events\\nBrand Presentations',
        'live-broadcasting': 'Live Broadcasting\\nNews & Entertainment',
        'ready-to-host': 'Ready to Host Your Event?',
        'event-memorable': 'Let\'s make your event memorable with professional anchoring services',
        'discuss-rates': 'Discuss Rates',
        'follow-me': 'Follow Me',
        
        // Acting Page
        'acting-page-desc': 'Bringing characters to life through authentic performances across film, television, theater, and digital media. With versatility and emotional depth, I deliver compelling performances that resonate with audiences.',
        'my-acting-process': 'My Acting Process',
        'script-analysis': 'Script Analysis',
        'script-analysis-desc': 'Deep dive into the script to understand character motivations, relationships, and the story\'s emotional arc for authentic portrayal.',
        'character-development': 'Character Development',
        'character-development-desc': 'Creating detailed character backstories, mannerisms, and emotional triggers to build a three-dimensional performance.',
        'rehearsal-preparation': 'Rehearsal & Preparation',
        'rehearsal-preparation-desc': 'Intensive rehearsals, line memorization, and physical preparation to ensure flawless execution during filming or performance.',
        'performance-delivery': 'Performance Delivery',
        'performance-delivery-desc': 'Professional on-set behavior, adaptability to direction, and consistent character portrayal throughout the production.',
        'post-production': 'Post-Production Collaboration',
        'post-production-desc': 'Working closely with directors and editors during post-production for ADR, reshoots, and promotional activities.',
        'acting-portfolio': 'Acting Portfolio',
        'midnight-dreams': '"Midnight Dreams"\\nLead Role - Drama',
        'romeo-juliet': '"Romeo & Juliet"\\nBroadway Theater',
        'city-lights': '"City Lights"\\nTV Series - Season 3',
        'storm-chaser': '"Storm Chaser"\\nAction Thriller',
        'last-mile': '"The Last Mile"\\nIndie Film Festival Winner',
        'tv-commercial': 'National TV Commercial\\nBrand Ambassador',
        'ready-story': 'Ready to Bring Your Story to Life?',
        'discuss-production': 'Let\'s discuss your next film, TV show, or theater production',
        'call-agent': 'Call My Agent',
        
        // Agency Page
        'agency-page-desc': 'Your complete movie production partner. We provide everything from locations and manpower to casting and materials. Making your film dreams a reality with professional coordination and comprehensive production services.',
        'production-services': 'Our Production Services',
        'location-scouting': 'Location Scouting',
        'location-scouting-desc': 'Premium filming locations across the country. From urban landscapes to natural settings, we provide the perfect backdrop for your story with all necessary permits and arrangements.',
        'manpower-crew': 'Manpower & Crew',
        'manpower-crew-desc': 'Professional film crew including directors, cinematographers, sound engineers, lighting technicians, and production assistants. Experienced teams for projects of any scale.',
        'casting-services': 'Casting Services',
        'casting-services-desc': 'Complete casting solutions from lead actors to background artists. Access to our extensive talent database with professional actors, models, and performers.',
        'equipment-materials': 'Equipment & Materials',
        'equipment-materials-desc': 'State-of-the-art filming equipment, cameras, lighting rigs, sound equipment, props, costumes, and all production materials needed for your project.',
        'production-coordination': 'Production Coordination',
        'production-coordination-desc': 'End-to-end project management, scheduling, logistics coordination, permit handling, and ensuring smooth production workflow from pre to post-production.',
        'producer-support': 'Producer Support',
        'producer-support-desc': 'Comprehensive support for producers and filmmakers including budget planning, resource allocation, vendor management, and production consulting services.',
        'join-team': 'Join Our Team',
        'movie-opportunities': 'Looking for opportunities in the movie industry? We\'re always seeking talented individuals to join our growing team.',
        'available-positions': 'Available Positions',
        'why-work-us': 'Why Work With Us?',
        'competitive-compensation': 'Competitive compensation',
        'exciting-projects': 'Work on exciting projects',
        'growth-opportunities': 'Professional growth opportunities',
        'flexible-scheduling': 'Flexible scheduling',
        'industry-networking': 'Industry networking',
        'full-name': 'Full Name *',
        'enter-full-name': 'Enter your full name',
        'email-address': 'Email Address *',
        'email-placeholder': 'your.email@example.com',
        'phone-number': 'Phone Number *',
        'phone-placeholder': '+1 (555) 123-4567',
        'position-interested': 'Position Interested In *',
        'select-position': 'Select a position',
        'select-experience': 'Select experience level',
        'portfolio-resume': 'Portfolio/Resume Link',
        'portfolio-placeholder': 'https://your-portfolio.com',
        'availability': 'Availability',
        'select-availability': 'Select availability',
        'tell-about-yourself': 'Tell us about yourself *',
        'share-experience': 'Share your experience, skills, and why you want to work with A2Z Creations...',
        'submit-application': 'Submit Application',
        'work-portfolio': 'Our Work Portfolio',
        'feature-film': 'Feature Film Production\\n"City Lights" - 2024',
        'casting-session': 'Casting Session\\nLead Role Selection',
        'premium-locations': 'Premium Locations\\nUrban & Natural Settings',
        'professional-equipment': 'Professional Equipment\\n4K Cinema Cameras',
        'expert-crew': 'Expert Crew\\nProfessional Team',
        'post-production-work': 'Post-Production\\nEditing & VFX',
        'ready-start-project': 'Ready to Start Your Project?',
        'handle-production-needs': 'Let A2Z Creations Agency handle all your movie production needs from start to finish',
        'follow-a2z': 'Follow A2Z Creations',
        
        // Video Shooting Page
        'video-page-desc': 'High-quality video production services including commercials, music videos, social media content, and creative projects. From concept to final delivery, I bring stories to life through compelling visual storytelling.',
        'video-production-process': 'My Video Production Process',
        'concept-development': 'Concept Development',
        'concept-development-desc': 'Collaborative brainstorming and concept development to create compelling narratives that align with your vision and objectives.',
        'pre-production': 'Pre-Production Planning',
        'pre-production-desc': 'Detailed storyboarding, location scouting, cast selection, and logistics planning to ensure smooth production execution.',
        'professional-filming': 'Professional Filming',
        'professional-filming-desc': 'High-end equipment and experienced crew for cinematography, lighting, and sound recording to capture stunning visuals.',
        'post-production-video': 'Post-Production',
        'post-production-video-desc': 'Professional editing, color grading, sound design, and visual effects to create polished, broadcast-ready content.',
        'delivery-distribution': 'Delivery & Distribution',
        'delivery-distribution-desc': 'Multiple format delivery and assistance with distribution strategy across various platforms and channels.',
        'video-portfolio': 'Video Production Portfolio',
        'national-commercial': 'National TV Commercial\\nLuxury Brand',
        'music-video': 'Music Video Production\\nChart-topping Artist',
        'corporate-documentary': 'Corporate Documentary\\nFortune 500 Company',
        'social-media-series': 'Social Media Series\\nViral Campaign',
        'event-highlight': 'Event Highlight Reel\\nAward Ceremony',
        'brand-story': 'Brand Story Video\\nStartup Launch',
        'ready-create-videos': 'Ready to Create Stunning Videos?',
        'bring-vision-life': 'Let\'s bring your vision to life with professional video production services'
    },
    te: {
        // Navigation
        'home': 'హోమ్',
        'about': 'గురించి',
        'services': 'సేవలు',
        'portfolio': 'పోర్ట్‌ఫోలియో',
        'contact': 'సంప్రదించండి',
        'go-back': 'వెనుకకు వెళ్ళు',
        
        // Hero Section
        'hero-title-1': 'ప్రొఫెషనల్ యాంకర్ & కంటెంట్ క్రియేటర్',
        'hero-desc-1': 'ఆకర్షణీయమైన ప్రదర్శనలు మరియు ఆకర్షణీయ కంటెంట్ ద్వారా కథలను జీవంతం చేయడం',
        'hero-title-2': 'అవార్డు గెలుచుకున్న యాంకర్',
        'hero-desc-2': 'ఆకర్షణ మరియు వృత్తిపరత్వంతో ఈవెంట్లు మరియు షోలను హోస్ట్ చేయడం',
        'hero-title-3': 'సోషల్ మీడియా ఇన్‌ఫ్లుయెన్సర్',
        'hero-desc-3': 'ప్రామాణిక కంటెంట్ మరియు బ్రాండ్ భాగస్వామ్యాలతో లక్షలాది మందిని ప్రేరేపించడం',
        'watch-videos': 'వీడియోలు చూడండి',
        'book-now': 'ఇప్పుడే బుక్ చేయండి',
        'see-stats': 'గణాంకాలు చూడండి',
        
        // Social Media
        'instagram-followers': 'ఇన్‌స్టాగ్రామ్ ఫాలోవర్స్',
        'youtube-subscribers': 'a2zcreations సబ్‌స్క్రైబర్స్',
        'twitter-followers': 'ట్విట్టర్ ఫాలోవర్స్',
        'facebook-fans': 'ఫేస్‌బుక్ అభిమానులు',
        'follow': 'ఫాలో చేయండి',
        'subscribe': 'సబ్‌స్క్రైబ్ చేయండి',
        'like': 'లైక్ చేయండి',
        
        // Services
        'my-services': 'నా సేవలు',
        'anchoring': 'యాంకరింగ్',
        'anchoring-desc': 'ప్రొఫెషనల్ ఈవెంట్ హోస్టింగ్, అవార్డు షోలు, కార్పొరేట్ ఈవెంట్లు మరియు లైవ్ టెలివిజన్ ప్రోగ్రామ్‌లు.',
        'acting': 'నటన',
        'acting-desc': 'చలనచిత్రం, టెలివిజన్ మరియు థియేటర్ ప్రదర్శనలు బహుముఖత్వం మరియు భావోద్వేగ లోతుతో.',
        'agency': 'A2Z క్రియేషన్స్ ఏజెన్సీ',
        'agency-desc': 'చలనచిత్ర నిర్మాతలకు లొకేషన్లు, మానవ శక్తి, కాస్టింగ్ మరియు మెటీరియల్స్‌తో సహా పూర్తి చలనచిత్ర నిర్మాణ సేవలు.',
        'video-shooting': 'వీడియో షూటింగ్',
        'video-shooting-desc': 'ప్రొఫెషనల్ వీడియో ప్రొడక్షన్, వాణిజ్య ప్రకటనలు, సంగీత వీడియోలు మరియు సృజనాత్మక కంటెంట్.',
        'learn-more': 'మరింత తెలుసుకోండి',
        
        // Portfolio
        'my-portfolio': 'నా పోర్ట్‌ఫోలియో',
        'all': 'అన్నీ',
        'videos': 'వీడియోలు',
        'images': 'చిత్రాలు',
        
        // About
        'about-shiva': 'శివ యాంకర్ గురించి',
        'about-desc-1': 'వినోద పరిశ్రమలో 8 సంవత్సరాలకు మించిన అనుభవంతో, శివ యాంకర్ తనను తాను బహుముఖ ప్రదర్శనకారుడిగా మరియు ప్రభావవంతమైన కంటెంట్ క్రియేటర్‌గా స్థాపించుకున్నాడు. ప్రధాన కార్యక్రమాలను హోస్ట్ చేయడం నుండి a2zcreations కోసం ఆకర్షణీయ కంటెంట్ సృష్టించడం వరకు, శివ ప్రతి ప్రాజెక్ట్‌కు ప్రామాణికత మరియు వృత్తిపరత్వాన్ని తెస్తాడు.',
        'about-desc-2': 'అతని ప్రయాణం కాలేజీ సమయంలో స్థానిక కార్యక్రమాలను యాంకరింగ్ చేయడంతో ప్రారంభమైంది, ఇది త్వరగా టెలివిజన్ హోస్టింగ్ మరియు డిజిటల్ కంటెంట్ క్రియేషన్‌గా అభివృద్ధి చెందింది. నేడు, శివ కేవలం యాంకర్ మాత్రమే కాకుండా a2zcreations ద్వారా భారీ అనుచరులను నిర్మించిన డిజిటల్ వ్యవస్థాపకుడు, తన సృజనాత్మక కంటెంట్ మరియు సానుకూల సందేశంతో లక్షలాది మందిని ప్రేరేపిస్తున్నాడు.',
        'about-desc-3': 'శివ యొక్క శ్రేష్ఠత పట్ల నిబద్ధత మరియు ప్రేక్షకులతో అనుసంధానం చేసుకునే అతని సామర్థ్యం అతన్ని పరిశ్రమలో అత్యంత కోరుకునే ప్రతిభలలో ఒకరిగా చేసింది. ఇది ఈవెంట్ హోస్ట్ చేయడం, a2zcreations కోసం కంటెంట్ సృష్టించడం లేదా బ్రాండ్ ప్రచారం అయినా, శివ అభిరుచి మరియు ఖచ్చితత్వంతో అందిస్తాడు.',
        'download-portfolio': 'పోర్ట్‌ఫోలియో డౌన్‌లోడ్ చేయండి',
        
        // Stats
        'years-experience': 'సంవత్సరాల అనుభవం',
        'projects-completed': 'పూర్తి చేసిన ప్రాజెక్ట్‌లు',
        'awards-won': 'గెలుచుకున్న అవార్డులు',
        'brand-partners': 'బ్రాండ్ భాగస్వాములు',
        
        // Contact
        'get-in-touch': 'సంప్రదించండి',
        'contact-info': 'సంప్రదింపు సమాచారం',
        'send-message': 'సందేశం పంపండి',
        'your-name': 'మీ పేరు',
        'your-email': 'మీ ఇమెయిల్',
        'your-message': 'మీ సందేశం',
        
        // Service Pages
        'professional-anchoring': 'ప్రొఫెషనల్ యాంకరింగ్ సేవలు',
        'professional-acting': 'ప్రొఫెషనల్ నటన సేవలు',
        'a2z-agency': 'A2Z క్రియేషన్స్ ఏజెన్సీ',
        'video-production': 'ప్రొఫెషనల్ వీడియో ప్రొడక్షన్',
        'hire-me': 'నన్ను నియమించండి',
        'partner-with-me': 'నాతో భాగస్వామ్యం చేయండి',
        'start-project': 'ప్రాజెక్ట్ ప్రారంభించండి',
        'get-quote': 'కోట్ పొందండి',
        'call-now': 'ఇప్పుడే కాల్ చేయండి',
        'apply-now': 'ఇప్పుడే దరఖాస్తు చేయండి',
        
        // Anchoring Page
        'anchoring-page-desc': 'ఆకర్షణ మరియు వృత్తిపరత్వంతో ప్రేక్షకులను ఆకర్షించే మరియు గుర్తుండిపోయే అనుభవాలను నిర్ధారించే నిపుణుల ఈవెంట్ హోస్టింగ్, అవార్డు షోలు, కార్పొరేట్ ఈవెంట్లు మరియు లైవ్ టెలివిజన్ ప్రోగ్రామ్‌లు.',
        'my-anchoring-process': 'నా యాంకరింగ్ ప్రక్రియ',
        'event-planning': 'ఈవెంట్ ప్లానింగ్',
        'event-planning-desc': 'వేదిక అంచనా, ప్రేక్షకుల విశ్లేషణ మరియు ప్రోగ్రామ్ ఫ్లో సహిత సమగ్ర ఈవెంట్ ప్లానింగ్ సజావుగా అమలు చేయడానికి.',
        'script-preparation': 'స్క్రిప్ట్ తయారీ',
        'script-preparation-desc': 'మీ ఈవెంట్ యొక్క థీమ్ మరియు ప్రేక్షకులకు అనుకూలంగా రూపొందించిన ఆకర్షణీయ మెటీరియల్ యొక్క సమగ్ర స్క్రిప్ట్ సమీక్ష, కంటెంట్ అనుకూలీకరణ మరియు తయారీ.',
        'rehearsal-coordination': 'రిహార్సల్ & కోఆర్డినేషన్',
        'rehearsal-coordination-desc': 'ఈవెంట్ రోజున దోషరహిత ప్రదర్శనను నిర్ధారించడానికి ప్రీ-ఈవెంట్ రిహార్సల్స్, టెక్నికల్ కోఆర్డినేషన్ మరియు టీమ్ బ్రీఫింగ్‌లు.',
        'live-hosting': 'లైవ్ ఈవెంట్ హోస్టింగ్',
        'live-hosting-desc': 'ప్రొఫెషనల్ వేదిక ఉనికి, ప్రేక్షకుల నిమగ్నత, సజావుగా మార్పులు మరియు ఏదైనా ఊహించని పరిస్థితులను నిర్వహించడానికి అనుకూలత.',
        'post-event-follow': 'పోస్ట్-ఈవెంట్ ఫాలో-అప్',
        'post-event-follow-desc': 'ఈవెంట్ ర్యాప్-అప్, ఫీడ్‌బ్యాక్ సేకరణ మరియు సోషల్ మీడియా మరియు ప్రమోషనల్ ప్రయోజనాల కోసం పోస్ట్-ఈవెంట్ కంటెంట్ సృష్టి.',
        'anchoring-portfolio': 'యాంకరింగ్ పోర్ట్‌ఫోలియో',
        'corporate-event': 'కార్పొరేట్ ఈవెంట్ హోస్టింగ్\\nవార్షిక సమావేశం',
        'award-show': 'అవార్డు షో హోస్టింగ్\\nవినోద పరిశ్రమ',
        'tv-show': 'టెలివిజన్ షో\\nప్రైమ్ టైమ్ హోస్టింగ్',
        'wedding-hosting': 'వివాహ వేడుకలు\\nప్రత్యేక సందర్భాలు',
        'product-launch': 'ప్రొడక్ట్ లాంచ్ ఈవెంట్‌లు\\nబ్రాండ్ ప్రెజెంటేషన్‌లు',
        'live-broadcasting': 'లైవ్ బ్రాడ్‌కాస్టింగ్\\nవార్తలు & వినోదం',
        'ready-to-host': 'మీ ఈవెంట్‌ను హోస్ట్ చేయడానికి సిద్ధంగా ఉన్నారా?',
        'event-memorable': 'ప్రొఫెషనల్ యాంకరింగ్ సేవలతో మీ ఈవెంట్‌ను గుర్తుండిపోయేలా చేద్దాం',
        'discuss-rates': 'రేట్లను చర్చించండి',
        'follow-me': 'నన్ను ఫాలో చేయండి',
        
        // Acting Page
        'acting-page-desc': 'చలనచిత్రం, టెలివిజన్, థియేటర్ మరియు డిజిటల్ మీడియా అంతటా ప్రామాణిక ప్రదర్శనల ద్వారా పాత్రలను జీవంతం చేయడం. బహుముఖత్వం మరియు భావోద్వేగ లోతుతో, నేను ప్రేక్షకులతో ప్రతిధ్వనించే ఆకర్షణీయ ప్రదర్శనలను అందిస్తాను.',
        'my-acting-process': 'నా నటన ప్రక్రియ',
        'script-analysis': 'స్క్రిప్ట్ విశ్లేషణ',
        'script-analysis-desc': 'ప్రామాణిక చిత్రణ కోసం పాత్ర ప్రేరణలు, సంబంధాలు మరియు కథ యొక్క భావోద్వేగ ఆర్క్‌ను అర్థం చేసుకోవడానికి స్క్రిప్ట్‌లో లోతుగా మునిగిపోవడం.',
        'character-development': 'పాత్ర అభివృద్ధి',
        'character-development-desc': 'త్రిమితీయ ప్రదర్శనను నిర్మించడానికి వివరణాత్మక పాత్ర బ్యాక్‌స్టోరీలు, మర్యాదలు మరియు భావోద్వేగ ట్రిగ్గర్‌లను సృష్టించడం.',
        'rehearsal-preparation': 'రిహార్సల్ & తయారీ',
        'rehearsal-preparation-desc': 'చిత్రీకరణ లేదా ప్రదర్శన సమయంలో దోషరహిత అమలును నిర్ధారించడానికి ఇంటెన్సివ్ రిహార్సల్స్, లైన్ మెమోరైజేషన్ మరియు భౌతిక తయారీ.',
        'performance-delivery': 'ప్రదర్శన డెలివరీ',
        'performance-delivery-desc': 'ప్రొఫెషనల్ ఆన్-సెట్ ప్రవర్తన, దర్శకత్వానికి అనుకూలత మరియు ఉత్పాదన అంతటా స్థిరమైన పాత్ర చిత్రణ.',
        'post-production': 'పోస్ట్-ప్రొడక్షన్ సహకారం',
        'post-production-desc': 'ADR, రీషూట్‌లు మరియు ప్రమోషనల్ కార్యకలాపాల కోసం పోస్ట్-ప్రొడక్షన్ సమయంలో దర్శకులు మరియు ఎడిటర్‌లతో దగ్గరగా పని చేయడం.',
        'acting-portfolio': 'నటన పోర్ట్‌ఫోలియో',
        'midnight-dreams': '"మిడ్‌నైట్ డ్రీమ్స్"\\nలీడ్ రోల్ - డ్రామా',
        'romeo-juliet': '"రోమియో & జూలియట్"\\nబ్రాడ్‌వే థియేటర్',
        'city-lights': '"సిటీ లైట్స్"\\nTV సిరీస్ - సీజన్ 3',
        'storm-chaser': '"స్టార్మ్ చేజర్"\\nయాక్షన్ థ్రిల్లర్',
        'last-mile': '"ది లాస్ట్ మైల్"\\nఇండీ ఫిల్మ్ ఫెస్టివల్ విన్నర్',
        'tv-commercial': 'నేషనల్ TV కమర్షియల్\\nబ్రాండ్ అంబాసిడర్',
        'ready-story': 'మీ కథను జీవంతం చేయడానికి సిద్ధంగా ఉన్నారా?',
        'discuss-production': 'మీ తదుపరి చలనచిత్రం, TV షో లేదా థియేటర్ ప్రొడక్షన్‌ను చర్చిద్దాం',
        'call-agent': 'నా ఏజెంట్‌కు కాల్ చేయండి',
        
        // Agency Page
        'agency-page-desc': 'మీ పూర్తి చలనచిత్ర నిర్మాణ భాగస్వామి. మేము లొకేషన్లు మరియు మానవ శక్తి నుండి కాస్టింగ్ మరియు మెటీరియల్స్ వరకు అన్నింటినీ అందిస్తాము. ప్రొఫెషనల్ కోఆర్డినేషన్ మరియు సమగ్ర ప్రొడక్షన్ సేవలతో మీ చలనచిత్ర కలలను వాస్తవం చేయడం.',
        'production-services': 'మా ప్రొడక్షన్ సేవలు',
        'location-scouting': 'లొకేషన్ స్కౌటింగ్',
        'location-scouting-desc': 'దేశవ్యాప్తంగా ప్రీమియం చిత్రీకరణ స్థలాలు. పట్టణ ప్రకృతి దృశ్యాల నుండి సహజ సెట్టింగ్‌ల వరకు, మేము అవసరమైన అన్ని అనుమతులు మరియు ఏర్పాట్లతో మీ కథకు సరైన నేపథ్యాన్ని అందిస్తాము.',
        'manpower-crew': 'మానవ శక్తి & క్రూ',
        'manpower-crew-desc': 'దర్శకులు, సినిమాటోగ్రాఫర్‌లు, సౌండ్ ఇంజనీర్లు, లైటింగ్ టెక్నీషియన్లు మరియు ప్రొడక్షన్ అసిస్టెంట్‌లతో సహా ప్రొఫెషనల్ ఫిల్మ్ క్రూ. ఏ స్కేల్ ప్రాజెక్ట్‌లకైనా అనుభవజ్ఞులైన టీమ్‌లు.',
        'casting-services': 'కాస్టింగ్ సేవలు',
        'casting-services-desc': 'లీడ్ యాక్టర్‌ల నుండి బ్యాక్‌గ్రౌండ్ ఆర్టిస్ట్‌ల వరకు పూర్తి కాస్టింగ్ సొల్యూషన్‌లు. ప్రొఫెషనల్ యాక్టర్లు, మోడల్స్ మరియు ప్రదర్శనకారులతో మా విస్తృత టాలెంట్ డేటాబేస్‌కు యాక్సెస్.',
        'equipment-materials': 'పరికరాలు & మెటీరియల్స్',
        'equipment-materials-desc': 'అత్యాధునిక చిత్రీకరణ పరికరాలు, కెమెరాలు, లైటింగ్ రిగ్‌లు, సౌండ్ ఎక్విప్‌మెంట్, ప్రాప్స్, కాస్ట్యూమ్స్ మరియు మీ ప్రాజెక్ట్‌కు అవసరమైన అన్ని ప్రొడక్షన్ మెటీరియల్స్.',
        'production-coordination': 'ప్రొడక్షన్ కోఆర్డినేషన్',
        'production-coordination-desc': 'ఎండ్-టు-ఎండ్ ప్రాజెక్ట్ మేనేజ్‌మెంట్, షెడ్యూలింగ్, లాజిస్టిక్స్ కోఆర్డినేషన్, పర్మిట్ హ్యాండ్లింగ్ మరియు ప్రీ నుండి పోస్ట్-ప్రొడక్షన్ వరకు సజావుగా ప్రొడక్షన్ వర్క్‌ఫ్లోను నిర్ధారించడం.',
        'producer-support': 'ప్రొడ్యూసర్ సపోర్ట్',
        'producer-support-desc': 'బడ్జెట్ ప్లానింగ్, రిసోర్స్ అలోకేషన్, వెండర్ మేనేజ్‌మెంట్ మరియు ప్రొడక్షన్ కన్సల్టింగ్ సేవలతో సహా ప్రొడ్యూసర్లు మరియు చలనచిత్ర నిర్మాతలకు సమగ్ర మద్దతు.',
        'join-team': 'మా టీమ్‌లో చేరండి',
        'movie-opportunities': 'చలనచిత్ర పరిశ్రమలో అవకాశాల కోసం చూస్తున్నారా? మేము ఎల్లప్పుడూ మా పెరుగుతున్న టీమ్‌లో చేరడానికి ప్రతిభావంతులైన వ్యక్తులను వెతుకుతున్నాము.',
        'available-positions': 'అందుబాటులో ఉన్న స్థానాలు',
        'why-work-us': 'మాతో ఎందుకు పని చేయాలి?',
        'competitive-compensation': 'పోటీ పరిహారం',
        'exciting-projects': 'ఉత్తేజకరమైన ప్రాజెక్ట్‌లపై పని చేయండి',
        'growth-opportunities': 'వృత్తిపరమైన వృద్ధి అవకాశాలు',
        'flexible-scheduling': 'సౌకర్యవంతమైన షెడ్యూలింగ్',
        'industry-networking': 'పరిశ్రమ నెట్‌వర్కింగ్',
        'full-name': 'పూర్తి పేరు *',
        'enter-full-name': 'మీ పూర్తి పేరు నమోదు చేయండి',
        'email-address': 'ఇమెయిల్ చిరునామా *',
        'email-placeholder': 'your.email@example.com',
        'phone-number': 'ఫోన్ నంబర్ *',
        'phone-placeholder': '+1 (555) 123-4567',
        'position-interested': 'ఆసక్తి ఉన్న స్థానం *',
        'select-position': 'స్థానాన్ని ఎంచుకోండి',
        'select-experience': 'అనుభవ స్థాయిని ఎంచుకోండి',
        'portfolio-resume': 'పోర్ట్‌ఫోలియో/రెజ్యూమ్ లింక్',
        'portfolio-placeholder': 'https://your-portfolio.com',
        'availability': 'అందుబాటు',
        'select-availability': 'అందుబాటును ఎంచుకోండి',
        'tell-about-yourself': 'మీ గురించి చెప్పండి *',
        'share-experience': 'మీ అనుభవం, నైపుణ్యాలు మరియు మీరు A2Z క్రియేషన్స్‌తో ఎందుకు పని చేయాలనుకుంటున్నారో పంచుకోండి...',
        'submit-application': 'దరఖాస్తు సమర్పించండి',
        'work-portfolio': 'మా వర్క్ పోర్ట్‌ఫోలియో',
        'feature-film': 'ఫీచర్ ఫిల్మ్ ప్రొడక్షన్\\n"సిటీ లైట్స్" - 2024',
        'casting-session': 'కాస్టింగ్ సెషన్\\nలీడ్ రోల్ సెలెక్షన్',
        'premium-locations': 'ప్రీమియం లొకేషన్‌లు\\nపట్టణ & సహజ సెట్టింగ్‌లు',
        'professional-equipment': 'ప్రొఫెషనల్ ఎక్విప్‌మెంట్\\n4K సినిమా కెమెరాలు',
        'expert-crew': 'నిపుణుల క్రూ\\nప్రొఫెషనల్ టీమ్',
        'post-production-work': 'పోస్ట్-ప్రొడక్షన్\\nఎడిటింగ్ & VFX',
        'ready-start-project': 'మీ ప్రాజెక్ట్‌ను ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?',
        'handle-production-needs': 'A2Z క్రియేషన్స్ ఏజెన్సీ మీ అన్ని చలనచిత్ర నిర్మాణ అవసరాలను మొదటి నుండి చివరి వరకు నిర్వహించనివ్వండి',
        'follow-a2z': 'A2Z క్రియేషన్స్‌ను ఫాలో చేయండి',
        
        // Video Shooting Page
        'video-page-desc': 'వాణిజ్య ప్రకటనలు, సంగీత వీడియోలు, సోషల్ మీడియా కంటెంట్ మరియు సృజనాత్మక ప్రాజెక్ట్‌లతో సహా అధిక-నాణ్యత వీడియో ప్రొడక్షన్ సేవలు. కాన్సెప్ట్ నుండి చివరి డెలివరీ వరకు, నేను ఆకర్షణీయ దృశ్య కథనం ద్వారా కథలను జీవంతం చేస్తాను.',
        'video-production-process': 'నా వీడియో ప్రొడక్షన్ ప్రక్రియ',
        'concept-development': 'కాన్సెప్ట్ అభివృద్ధి',
        'concept-development-desc': 'మీ దృష్టి మరియు లక్ష్యాలతో సమలేఖనం చేసే ఆకర్షణీయ కథనాలను సృష్టించడానికి సహకార బ్రెయిన్‌స్టార్మింగ్ మరియు కాన్సెప్ట్ అభివృద్ధి.',
        'pre-production': 'ప్రీ-ప్రొడక్షన్ ప్లానింగ్',
        'pre-production-desc': 'సజావుగా ప్రొడక్షన్ అమలును నిర్ధారించడానికి వివరణాత్మక స్టోరీబోర్డింగ్, లొకేషన్ స్కౌటింగ్, కాస్ట్ సెలెక్షన్ మరియు లాజిస్టిక్స్ ప్లానింగ్.',
        'professional-filming': 'ప్రొఫెషనల్ ఫిల్మింగ్',
        'professional-filming-desc': 'అద్భుతమైన దృశ్యాలను క్యాప్చర్ చేయడానికి సినిమాటోగ్రఫీ, లైటింగ్ మరియు సౌండ్ రికార్డింగ్ కోసం హై-ఎండ్ ఎక్విప్‌మెంట్ మరియు అనుభవజ్ఞులైన క్రూ.',
        'post-production-video': 'పోస్ట్-ప్రొడక్షన్',
        'post-production-video-desc': 'పాలిష్ చేసిన, బ్రాడ్‌కాస్ట్-రెడీ కంటెంట్‌ను సృష్టించడానికి ప్రొఫెషనల్ ఎడిటింగ్, కలర్ గ్రేడింగ్, సౌండ్ డిజైన్ మరియు విజువల్ ఎఫెక్ట్స్.',
        'delivery-distribution': 'డెలివరీ & డిస్ట్రిబ్యూషన్',
        'delivery-distribution-desc': 'మల్టిపుల్ ఫార్మాట్ డెలివరీ మరియు వివిధ ప్లాట్‌ఫారమ్‌లు మరియు ఛానెల్‌లలో డిస్ట్రిబ్యూషన్ స్ట్రాటజీతో సహాయం.',
        'video-portfolio': 'వీడియో ప్రొడక్షన్ పోర్ట్‌ఫోలియో',
        'national-commercial': 'నేషనల్ TV కమర్షియల్\\nలగ్జరీ బ్రాండ్',
        'music-video': 'మ్యూజిక్ వీడియో ప్రొడక్షన్\\nచార్ట్-టాపింగ్ ఆర్టిస్ట్',
        'corporate-documentary': 'కార్పొరేట్ డాక్యుమెంటరీ\\nఫార్చ్యూన్ 500 కంపెనీ',
        'social-media-series': 'సోషల్ మీడియా సిరీస్\\nవైరల్ క్యాంపెయిన్',
        'event-highlight': 'ఈవెంట్ హైలైట్ రీల్\\nఅవార్డు వేడుక',
        'brand-story': 'బ్రాండ్ స్టోరీ వీడియో\\nస్టార్టప్ లాంచ్',
        'ready-create-videos': 'అద్భుతమైన వీడియోలను సృష్టించడానికి సిద్ధంగా ఉన్నారా?',
        'bring-vision-life': 'ప్రొఫెషనల్ వీడియో ప్రొడక్షన్ సేవలతో మీ దృష్టిని జీవంతం చేద్దాం'
    }
};

let currentLanguage = 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update text content
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    if (savedLanguage !== 'en') {
        changeLanguage(savedLanguage);
    }
});