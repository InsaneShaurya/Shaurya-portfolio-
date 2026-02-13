const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollTopBtn = document.querySelector('.scroll-top');
const year = document.querySelector('#year');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const submitButton = document.querySelector('.form-submit');

if (year) {
  year.textContent = new Date().getFullYear();
}

const closeNav = () => {
  navLinks?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('click', (event) => {
  if (!navLinks?.classList.contains('open')) {
    return;
  }

  if (!navLinks.contains(event.target) && !navToggle?.contains(event.target)) {
    closeNav();
  }
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 320) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formStatus.style.color = '#fda4af';

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    return;
  }

  submitButton?.setAttribute('disabled', 'true');
  formStatus.style.color = '#51d8ff';
  formStatus.textContent = 'Sending your message...';

  setTimeout(() => {
    formStatus.style.color = '#4ade80';
    formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
    form.reset();
    submitButton?.removeAttribute('disabled');
  }, 700);
});
