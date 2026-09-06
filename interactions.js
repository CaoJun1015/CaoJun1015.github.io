(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const note = document.querySelector('.paper-note');
  const lines = [
    ['build something.', 'make it useful.', 'stay curious.'],
    ['start small.', 'look closely.', 'keep learning.'],
    ['make room', 'for a little', 'imagination.'],
    ['build carefully.', 'keep exploring.', 'enjoy the process.']
  ];
  let index = 0;
  note.addEventListener('click', () => {
    index = (index + 1) % lines.length;
    const text = note.querySelector('.note-text');
    text.replaceChildren();
    lines[index].forEach((line, i) => {
      if (i) text.append(document.createElement('br'));
      text.append(document.createTextNode(line));
    });
    note.querySelector('.note-label').textContent = `FIELD NOTES / ${String(index + 1).padStart(3, '0')}`;
  });

  // Content remains visible without JavaScript or intersection support.
  if (!('IntersectionObserver' in window)) return;
  const sections = [...document.querySelectorAll('.section, .contact')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  if (!motion.matches) sections.forEach(section => {
    if (section.getBoundingClientRect().top > window.innerHeight) {
      section.classList.add('reveal-pending');
      observer.observe(section);
    }
  });
  const revealAll = () => {
    observer.disconnect();
    sections.forEach(section => section.classList.remove('reveal-pending'));
  };
  motion.addEventListener('change', revealAll);
  document.addEventListener('focusin', event => {
    const section = event.target.closest('.reveal-pending');
    if (section) { section.classList.remove('reveal-pending'); observer.unobserve(section); }
  });
  // Anchor navigation reveals its destination before scrolling starts.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', revealAll);
  });
})();
