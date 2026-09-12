
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    if (mobileMenuBtn && mobileMenuOverlay && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
        });
        closeMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
        });
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
            });
        });
    }
    const chair = document.getElementById('main-chair');
    document.addEventListener('mousemove', (e) => {
        const nx = (e.clientX / window.innerWidth - 0.5);
        const ny = (e.clientY / window.innerHeight - 0.5);
        const chairX = nx * 12;
        const chairY = ny * 8;
        chair.style.transform = `translate(${chairX}px, ${chairY}px)`;
    });
    document.addEventListener('mouseleave', () => {
        chair.style.transform = 'translate(0, 0)';
    });
    const videoCard = document.getElementById('video-card');
    const videoModal = document.getElementById('video-modal');
    const closeModal = document.getElementById('close-modal');
    videoCard.addEventListener('click', () => {
        videoModal.classList.add('active');
    });
    closeModal.addEventListener('click', () => {
        videoModal.classList.remove('active');
    });
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            videoModal.classList.remove('active');
        }
    });
    const slides = [
        {
            thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80',
            label: 'Next Up',
            title: 'Sofas & Pillow',
            productTitle: 'Sofas & Pillow',
            price: '$79',
            desc: 'Checkout the best arrangement for your Apartment',
        },
        {
            thumb: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=200&q=80',
            label: 'Next Up',
            title: 'Accent Chair',
            productTitle: 'Accent Chair',
            price: '$149',
            desc: 'Statement seating that elevates any living space.',
        },
        {
            thumb: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=200&q=80',
            label: 'Next Up',
            title: 'Dining Set',
            productTitle: 'Dining Set',
            price: '$249',
            desc: 'Bring elegance to every meal with our signature sets.',
        },
    ];
    let currentSlide = 0;
    const pillThumb = document.querySelector('.pill-thumb');
    const nextLabel = document.querySelector('.next-label');
    const nextTitle = document.querySelector('.next-title');
    const productTitle = document.querySelector('.product-details h2');
    const productPrice = document.querySelector('.product-details .price');
    const productDesc = document.querySelector('.product-details p');
    const arrowBtn = document.getElementById('arrow-btn');
    const thumb1 = document.getElementById('thumb-1');
    const thumb2 = document.getElementById('thumb-2');
    function updateSlide(index) {
        const slide = slides[index];
        pillThumb.style.backgroundImage = `url('${slide.thumb}')`;
        nextLabel.textContent = slide.label;
        nextTitle.textContent = slide.title;
        productTitle.textContent = slide.productTitle;
        productPrice.textContent = slide.price;
        productDesc.textContent = slide.desc;
        const others = slides.filter((_, i) => i !== index);
        if (thumb1 && others[0]) {
            thumb1.style.backgroundImage = `url('${others[0].thumb}')`;
        }
        if (thumb2 && others[1]) {
            thumb2.style.backgroundImage = `url('${others[1].thumb}')`;
        }
    }
    arrowBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    });
    thumb1.addEventListener('click', () => {
        const others = slides.filter((_, i) => i !== currentSlide);
        if (others[0]) {
            currentSlide = slides.indexOf(others[0]);
            updateSlide(currentSlide);
        }
    });
    thumb2.addEventListener('click', () => {
        const others = slides.filter((_, i) => i !== currentSlide);
        if (others[1]) {
            currentSlide = slides.indexOf(others[1]);
            updateSlide(currentSlide);
        }
    });
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }, 5000);
    const navIcons = document.querySelectorAll('.nav-actions i');
    navIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.add('clicked');
            setTimeout(() => icon.classList.remove('clicked'), 300);
        });
    });
    updateSlide(0);
    const sparkleCanvas = document.getElementById('sparkle-canvas');
    if (sparkleCanvas) {
        const ctx = sparkleCanvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 80;
        function resizeCanvas() {
            const section = document.getElementById('products-section');
            sparkleCanvas.width = section.offsetWidth;
            sparkleCanvas.height = section.offsetHeight;
        }
        class Sparkle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * sparkleCanvas.width;
                this.y = Math.random() * sparkleCanvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.3 - 0.15;
                this.opacity = Math.random() * 0.7 + 0.3;
                this.fadeSpeed = Math.random() * 0.008 + 0.003;
                this.growing = Math.random() > 0.5;
                const isGold = Math.random() > 0.5;
                this.color = isGold
                    ? `rgba(196, 164, 124, ${this.opacity})`
                    : `rgba(255, 255, 255, ${this.opacity})`;
                this.isGold = isGold;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.growing) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 1) this.growing = false;
                } else {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) this.reset();
                }
                this.color = this.isGold
                    ? `rgba(196, 164, 124, ${Math.max(0, this.opacity)})`
                    : `rgba(255, 255, 255, ${Math.max(0, this.opacity)})`;
                if (this.x < 0) this.x = sparkleCanvas.width;
                if (this.x > sparkleCanvas.width) this.x = 0;
                if (this.y < 0) this.y = sparkleCanvas.height;
                if (this.y > sparkleCanvas.height) this.y = 0;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                const glow = this.isGold
                    ? `rgba(196, 164, 124, ${this.opacity * 0.15})`
                    : `rgba(255, 255, 255, ${this.opacity * 0.1})`;
                ctx.fillStyle = glow;
                ctx.fill();
            }
        }
        function initSparkles() {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Sparkle());
            }
        }
        function animateSparkles() {
            ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateSparkles);
        }
        initSparkles();
        animateSparkles();
        window.addEventListener('resize', resizeCanvas);
    }
    const productSets = [
        [
            { img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80', name: 'THE MIDNIGHT CHAIR' },
            { img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=80', name: 'THE ELEGANCE CHAIR' },
            { img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=500&q=80', name: 'THE CLASSIC CHAIR', price: '$0195' },
            { img: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80', name: 'THE MODERN CHAIR' },
            { img: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=400&q=80', name: 'THE WALNUT CHAIR' },
        ],
        [
            { img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80', name: 'THE NORDIC CHAIR' },
            { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80', name: 'THE LOUNGE CHAIR' },
            { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80', name: 'THE COMFORT SOFA', price: '$0349' },
            { img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&q=80', name: 'THE ACCENT CHAIR' },
            { img: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80', name: 'THE RECLINER' },
        ],
        [
            { img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=400&q=80', name: 'THE VINTAGE SOFA' },
            { img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=400&q=80', name: 'THE ARMREST CHAIR' },
            { img: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=500&q=80', name: 'THE STUDIO SET', price: '$0599' },
            { img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', name: 'THE OFFICE CHAIR' },
            { img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80', name: 'THE DINING CHAIR' },
        ],
    ];
    let currentSetIndex = 0;
    const carousel = document.getElementById('products-carousel');
    const swipeLeft = document.getElementById('swipe-left');
    const swipeRight = document.getElementById('swipe-right');
    const carouselDotsContainer = document.getElementById('carousel-dots');
    const tiltClasses = ['tilt-left-far', 'tilt-left', '', 'tilt-right', 'tilt-right-far'];
    const sizeClasses = ['card-small', 'card-medium', 'card-large', 'card-medium', 'card-small'];
    function renderProductSet(index, direction) {
        const set = productSets[index];
        const animClass = direction === 'left' ? 'sliding-left' : 'sliding-right';
        carousel.classList.add(animClass);
        setTimeout(() => {
            carousel.innerHTML = '';
            set.forEach((item, i) => {
                const card = document.createElement('div');
                const classes = ['product-card', sizeClasses[i], 'revealed'];
                if (tiltClasses[i]) classes.push(tiltClasses[i]);
                if (i === 2) classes.push('active-card');
                card.className = classes.join(' ');
                card.dataset.index = i;
                let infoHTML = `<span class="card-name">${item.name.toLowerCase()}</span>`;
                const displayPrice = item.price || '$149';
                infoHTML += `<span class="card-price">${displayPrice}</span>`;
                if (item.price) {
                    infoHTML += `<div class="card-colors">
                        <span class="color-dot dot-light active-dot"></span>
                        <span class="color-dot dot-dark"></span>
                    </div>`;
                }
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="card-info">${infoHTML}</div>
                `;
                carousel.appendChild(card);
            });
            bindColorDots();
        }, 250);
        setTimeout(() => {
            carousel.classList.remove(animClass);
        }, 500);
        updateDots(index);
    }
    function updateDots(activeIndex) {
        const dots = carouselDotsContainer.querySelectorAll('.c-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active-c-dot', i === activeIndex);
        });
    }
    if (swipeLeft) {
        swipeLeft.addEventListener('click', () => {
            currentSetIndex = (currentSetIndex - 1 + productSets.length) % productSets.length;
            renderProductSet(currentSetIndex, 'right');
        });
    }
    if (swipeRight) {
        swipeRight.addEventListener('click', () => {
            currentSetIndex = (currentSetIndex + 1) % productSets.length;
            renderProductSet(currentSetIndex, 'left');
        });
    }
    if (carouselDotsContainer) {
        carouselDotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.c-dot');
            if (!dot) return;
            const dots = Array.from(carouselDotsContainer.querySelectorAll('.c-dot'));
            const targetIndex = dots.indexOf(dot);
            if (targetIndex !== currentSetIndex) {
                const dir = targetIndex > currentSetIndex ? 'left' : 'right';
                currentSetIndex = targetIndex;
                renderProductSet(currentSetIndex, dir);
            }
        });
    }
    const revealElements = document.querySelectorAll('.products-section .section-heading, .product-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.index ? el.dataset.index * 120 : 0;
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
    function bindColorDots() {
        const dots = document.querySelectorAll('.color-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active-dot'));
                dot.classList.add('active-dot');
            });
        });
    }
    bindColorDots();
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');
    if (cdDays) {
        const deadline = new Date().getTime() + (4 * 24 * 60 * 60 + 14 * 60 * 60 + 48 * 60 + 18) * 1000;
        function updateCountdown() {
            const now = new Date().getTime();
            const diff = deadline - now;
            if (diff <= 0) {
                cdDays.textContent = '00';
                cdHours.textContent = '00';
                cdMinutes.textContent = '00';
                cdSeconds.textContent = '00';
                return;
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            cdDays.textContent = String(days).padStart(2, '0');
            cdHours.textContent = String(hours).padStart(2, '0');
            cdMinutes.textContent = String(minutes).padStart(2, '0');
            cdSeconds.textContent = String(seconds).padStart(2, '0');
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    const canvasHero = document.getElementById('sparkle-canvas-hero');
    const canvasFlash = document.getElementById('sparkle-canvas-2');
    function createSparkleManager(canvas, containerSelector, particleCount) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() {
            const container = document.querySelector(containerSelector);
            if (container) {
                canvas.width = container.offsetWidth;
                canvas.height = container.offsetHeight;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }
        class Sparkle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.35;
                this.speedY = (Math.random() - 0.5) * 0.25 - 0.1;
                this.opacity = Math.random() * 0.7 + 0.3;
                this.fadeSpeed = Math.random() * 0.008 + 0.003;
                this.growing = Math.random() > 0.5;
                const isGold = Math.random() > 0.5;
                this.isGold = isGold;
                this.color = isGold
                    ? `rgba(196, 164, 124, ${this.opacity})`
                    : `rgba(255, 255, 255, ${this.opacity})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.growing) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 1) this.growing = false;
                } else {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0) this.reset();
                }
                this.color = this.isGold
                    ? `rgba(196, 164, 124, ${Math.max(0, this.opacity)})`
                    : `rgba(255, 255, 255, ${Math.max(0, this.opacity)})`;
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                const glow = this.isGold
                    ? `rgba(196, 164, 124, ${this.opacity * 0.15})`
                    : `rgba(255, 255, 255, ${this.opacity * 0.1})`;
                ctx.fillStyle = glow;
                ctx.fill();
            }
        }
        function init() {
            resizeCanvas();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Sparkle());
            }
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        init();
        animate();
        window.addEventListener('resize', resizeCanvas);
    }
    createSparkleManager(canvasHero, '.app-container', 80);
    createSparkleManager(canvasFlash, '#flash-sale-section', 60);
    const canvasAbout = document.getElementById('sparkle-canvas-3');
    createSparkleManager(canvasAbout, '#about-section', 80);
    const aboutRevealElements = document.querySelectorAll('.flash-sale-outer, .benefit-item, .about-container');
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    aboutRevealElements.forEach(el => scrollRevealObserver.observe(el));
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const icon = faq.querySelector('.faq-icon i');
                if (icon) icon.className = 'fas fa-plus';
            });
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon i');
                if (icon) icon.className = 'fas fa-minus';
            }
        });
    });
    const canvasFaq = document.getElementById('sparkle-canvas-faq');
    createSparkleManager(canvasFaq, '#faq-section', 80);
    const faqSectionElement = document.querySelector('.faq-section');
    if (faqSectionElement) {
        scrollRevealObserver.observe(faqSectionElement);
    }
    const allTestimonials = [
        { name: 'Rachelle Beaudry', role: 'Traveler', img: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum mi sit amet commodo congue. Donec vel posuere leo.' },
        { name: 'James Hartwell', role: 'Designer', img: 'https://randomuser.me/api/portraits/men/75.jpg', text: 'Exceptional craftsmanship and attention to detail. Every piece from Studio feels like a work of art in our living room.' },
        { name: 'Sofia Martínez', role: 'Architect', img: 'https://randomuser.me/api/portraits/women/65.jpg', text: 'The quality of materials is outstanding. I recommend Studio to all my clients looking for premium furniture solutions.' },
        { name: 'Daniel Cooper', role: 'Homeowner', img: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'Fast delivery, beautiful packaging, and the furniture exceeded our expectations. Will definitely order again.' },
        { name: 'Emily Chen', role: 'Interior Stylist', img: 'https://randomuser.me/api/portraits/women/28.jpg', text: 'Studio brings a level of sophistication that is hard to find. Their modern pieces blend seamlessly into any décor.' },
        { name: 'Marcus Johnson', role: 'Entrepreneur', img: 'https://randomuser.me/api/portraits/men/52.jpg', text: 'Our office transformation was incredible. The ergonomic chairs and desks from Studio boosted productivity and style.' },
        { name: 'Olivia Tran', role: 'Blogger', img: 'https://randomuser.me/api/portraits/women/90.jpg', text: 'Every guest compliments our living room setup. Studio made our house feel like a magazine cover shoot.' },
        { name: 'Liam Murphy', role: 'Photographer', img: 'https://randomuser.me/api/portraits/men/45.jpg', text: 'The textures and tones of Studio furniture are incredibly photogenic. Perfect for both living and visual storytelling.' },
        { name: 'Amara Singh', role: 'Consultant', img: 'https://randomuser.me/api/portraits/women/33.jpg', text: 'I furnished my entire apartment with Studio pieces. The cohesive design language ties every room together beautifully.' },
        { name: 'Ryan Lee', role: 'Developer', img: 'https://randomuser.me/api/portraits/men/22.jpg', text: 'Minimal, functional, and stunning. Studio desks are the best investment I have made for my home office setup.' },
        { name: 'Isabella Rossi', role: 'Chef', img: 'https://randomuser.me/api/portraits/women/12.jpg', text: 'Our dining set from Studio is the centerpiece of every dinner party. Guests always ask where we got it!' },
        { name: 'Noah Kim', role: 'Student', img: 'https://randomuser.me/api/portraits/men/85.jpg', text: 'Affordable luxury—didn\'t think it was possible until I discovered Studio. My dorm room looks incredible now.' }
    ];
    const testimonialCardsContainer = document.getElementById('testimonial-cards');
    const dotsContainer = document.getElementById('testi-dots');
    const prevBtn = document.querySelector('.testi-prev');
    const nextBtn = document.querySelector('.testi-next');
    let currentTestiIndex = 0;
    let testiInterval;
    if (testimonialCardsContainer) {
        testimonialCardsContainer.innerHTML = '';
        allTestimonials.forEach((item, i) => {
            const card = document.createElement('div');
            card.className = 'testi-card testi-hidden';
            card.innerHTML = `
                <div class="testi-card-inner">
                    <img src="${item.img}" alt="${item.name}" class="testi-avatar">
                    <h4 class="testi-name">${item.name}</h4>
                    <span class="testi-role">${item.role}</span>
                    <div class="testi-stars">★★★★★</div>
                    <p class="testi-text">${item.text}</p>
                </div>
            `;
            testimonialCardsContainer.appendChild(card);
        });
        if (dotsContainer) {
            dotsContainer.innerHTML = `
                <span class="testi-dot active" data-index="0"></span>
                <span class="testi-dot" data-index="4"></span>
                <span class="testi-dot" data-index="8"></span>
            `;
            const dots = dotsContainer.querySelectorAll('.testi-dot');
            dots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    currentTestiIndex = parseInt(dot.dataset.index);
                    updateTestimonialCarousel();
                    resetTestiInterval();
                });
            });
        }
        function updateTestimonialCarousel() {
            const cards = testimonialCardsContainer.querySelectorAll('.testi-card');
            const total = cards.length;
            cards.forEach((card, i) => {
                let offset = (i - currentTestiIndex + total) % total;
                card.classList.remove('testi-bottom', 'testi-right', 'testi-top', 'testi-left', 'testi-hidden');
                if (offset === 0) {
                    card.classList.add('testi-bottom');
                } else if (offset === 1) {
                    card.classList.add('testi-right');
                } else if (offset === 2) {
                    card.classList.add('testi-top');
                } else if (offset === total - 1) {
                    card.classList.add('testi-left');
                } else {
                    card.classList.add('testi-hidden');
                }
            });
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.testi-dot');
                dots.forEach(dot => dot.classList.remove('active'));
                let activeDotIndex = 0;
                if (currentTestiIndex >= 8) activeDotIndex = 2;
                else if (currentTestiIndex >= 4) activeDotIndex = 1;
                if (dots[activeDotIndex]) dots[activeDotIndex].classList.add('active');
            }
        }
        setTimeout(updateTestimonialCarousel, 50);
        function nextTestimonial() {
            currentTestiIndex = (currentTestiIndex + 1) % allTestimonials.length;
            updateTestimonialCarousel();
        }
        function prevTestimonial() {
            currentTestiIndex = (currentTestiIndex - 1 + allTestimonials.length) % allTestimonials.length;
            updateTestimonialCarousel();
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextTestimonial();
                resetTestiInterval();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevTestimonial();
                resetTestiInterval();
            });
        }
        function resetTestiInterval() {
            clearInterval(testiInterval);
            testiInterval = setInterval(nextTestimonial, 3000);
        }
        testiInterval = setInterval(nextTestimonial, 3000);
    }
    const canvasTestimonial = document.getElementById('sparkle-canvas-testimonial');
    createSparkleManager(canvasTestimonial, '#testimonial-section', 60);
    const canvasFooter = document.getElementById('sparkle-canvas-footer');
    createSparkleManager(canvasFooter, '#main-footer', 50);
    const testimonialContent = document.querySelector('.testimonial-content');
    if (testimonialContent) {
        scrollRevealObserver.observe(testimonialContent);
    }
});
