// ===== BANANA BAY PHOTO SLIDER =====
function bbSlide(cardClass, dir) {
  const card = document.querySelector('.' + cardClass);
  if (!card) return;
  const slides = card.querySelectorAll('.bb-slide');
  const dots = card.querySelectorAll('.bb-dot');
  let current = Array.from(slides).findIndex(s => s.classList.contains('active'));
  slides[current].classList.remove('active');
  dots[current]?.classList.remove('active');
  current = (current + dir + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current]?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderCards = [
    { cls: 'banana-bay-restaurant-card', interval: 4000 },
    { cls: 'stone-crab-card', interval: 4500 },
    { cls: 'pirates-cove-card', interval: 4000 },
    { cls: 'zorbas-card', interval: 4200 },
    { cls: 'port-lucaya-card', interval: 4000 },
    { cls: 'garden-groves-card', interval: 4500 },
    { cls: 'unexso-card', interval: 4000 },
    { cls: 'snorkel-card', interval: 4300 },
    // Restaurants
    { cls: 'beckys-card', interval: 5000 },
    { cls: 'churchills-card', interval: 5000 },
    { cls: 'rum-runners-card', interval: 4200 },
    { cls: 'conch-world-card', interval: 4000 },
    { cls: 'pisces-card', interval: 4300 },
    { cls: 'fish-fry-card', interval: 4000 },
    { cls: 'sabor-card', interval: 4200 },
    // Nightlife
    { cls: 'count-basie-card', interval: 4000 },
    { cls: 'rum-runners-nightlife-card', interval: 4200 },
    { cls: 'taino-beach-card', interval: 4000 },
    { cls: 'junkanoo-card', interval: 4500 },
    // Activities
    { cls: 'fishing-card', interval: 4200 },
    { cls: 'kayak-card', interval: 4000 },
    { cls: 'boat-tours-card', interval: 4000 },
    // Attractions
    { cls: 'straw-market-card', interval: 4300 },
  ];
  sliderCards.forEach(({ cls, interval }) => {
    const card = document.querySelector('.' + cls);
    if (!card) return;
    const slides = card.querySelectorAll('.bb-slide');
    const dotsContainer = card.querySelector('.bb-dots');
    if (!dotsContainer) return;
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'bb-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        card.querySelectorAll('.bb-slide').forEach(s => s.classList.remove('active'));
        card.querySelectorAll('.bb-dot').forEach(d => d.classList.remove('active'));
        slides[i].classList.add('active');
        dot.classList.add('active');
      });
      dotsContainer.appendChild(dot);
    });
    setInterval(() => bbSlide(cls, 1), interval);
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});
// Close nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.hero-slide');
if (slides.length > 0) {
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = '✅ Request Sent! We\'ll be in touch soon.';
  btn.style.background = '#2d9e2d';
  btn.style.borderColor = '#2d9e2d';
  btn.style.color = 'white';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Booking Request';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
    btn.disabled = false;
    contactForm.reset();
  }, 5000);
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.property-card, .card, .explore-card, .testimonial-card, .about-text, .about-images').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.92);
      display:flex; align-items:center; justify-content:center;
      z-index:9999; cursor:zoom-out; padding:20px;
    `;
    const image = document.createElement('img');
    image.src = img.src;
    image.style.cssText = 'max-width:90vw; max-height:90vh; object-fit:contain; border-radius:8px;';
    overlay.appendChild(image);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// ===== VIEW ALL PHOTOS BUTTON =====
document.getElementById('viewAllPhotos')?.addEventListener('click', () => {
  const photos = [
    'Photos/702A5322.jpeg','Photos/702A5323.jpeg','Photos/702A5326.jpeg',
    'Photos/702A5329.jpeg','Photos/702A5331.jpeg','Photos/702A5334.jpeg',
    'Photos/702A5338.jpeg','Photos/702A5342.jpeg','Photos/702A5344.jpeg',
    'Photos/702A5348.jpeg','Photos/702A5349.jpeg','Photos/702A5350.jpeg',
  ];

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,0.95);
    z-index:9999; overflow-y:auto; padding:40px 20px;
  `;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕ Close';
  closeBtn.style.cssText = `
    position:fixed; top:20px; right:20px; background:#7ECECA;
    border:none; padding:10px 20px; border-radius:50px;
    font-weight:600; cursor:pointer; z-index:10000; font-size:1rem;
  `;
  closeBtn.addEventListener('click', () => overlay.remove());

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px; max-width:1200px; margin:0 auto;';

  photos.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = 'width:100%; height:200px; object-fit:cover; border-radius:8px; cursor:pointer;';
    grid.appendChild(img);
  });

  overlay.appendChild(closeBtn);
  overlay.appendChild(grid);
  document.body.appendChild(overlay);
});
