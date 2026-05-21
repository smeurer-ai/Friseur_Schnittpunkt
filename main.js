/**
 * Friseursalon Schnittpunkt — main.js
 * Vanilla JS · Kein externes Framework
 */

'use strict';

/* ── Helpers ──────────────────────────────────────────────── */
function qs(selector, context = document) {
  return context.querySelector(selector);
}
function qsa(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/* ══════════════════════════════════════════════════════════
   1. NAVIGATION — Scrolled-State & Hamburger
══════════════════════════════════════════════════════════ */
(function initNav() {
  const nav        = qs('#nav');
  const hamburger  = qs('#hamburger');
  const mobileMenu = qs('#mobileMenu');
  const mobileLinks = qsa('.mobile-link, .mobile-cta', mobileMenu);

  if (!nav || !hamburger || !mobileMenu) return;

  // Scrolled-Klasse
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger öffnen/schließen
  function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  // Menü bei Link-Klick schließen
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Außenklick
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Escape-Taste
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
})();


/* ══════════════════════════════════════════════════════════
   2. SCROLL-ANIMATIONEN (IntersectionObserver)
══════════════════════════════════════════════════════════ */
(function initScrollAnimations() {
  const els = qsa('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════════════════════════
   3. PREISTABS
══════════════════════════════════════════════════════════ */
(function initPreisTabs() {
  const tabs   = qsa('.preise__tab');
  const panels = qsa('.preise__panel');

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('aria-controls');

      // Tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Panels
      panels.forEach(p => p.classList.remove('active'));
      const targetPanel = qs('#' + targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });

    // Tastaturnavigation
    tab.addEventListener('keydown', (e) => {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') {
        tabs[(idx + 1) % tabs.length].focus();
        tabs[(idx + 1) % tabs.length].click();
      } else if (e.key === 'ArrowLeft') {
        tabs[(idx - 1 + tabs.length) % tabs.length].focus();
        tabs[(idx - 1 + tabs.length) % tabs.length].click();
      }
    });
  });
})();


/* ══════════════════════════════════════════════════════════
   4. GALERIE-LIGHTBOX (Vanilla, kein Plugin)
══════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lightbox      = qs('#lightbox');
  const lightboxClose = qs('#lightboxClose');
  const lightboxPrev  = qs('#lightboxPrev');
  const lightboxNext  = qs('#lightboxNext');
  const lightboxImg   = qs('#lightboxImg');
  const lightboxFallback = qs('#lightboxFallback');
  const lightboxLabel = qs('#lightboxLabel');

  if (!lightbox) return;

  // Alle klickbaren Galerieelemente (Galerie + Hochzeit-Minigalerie)
  const galleryItems = qsa('.galerie__item, .hochzeit__gallery-item');
  let currentIndex = 0;
  let currentGroup = [];

  function openLightbox(items, index) {
    currentGroup = items;
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showImage(index) {
    const item = currentGroup[index];
    if (!item) return;

    const src   = item.dataset.src || '';
    const label = item.getAttribute('aria-label') || ('Bild ' + (index + 1));

    if (src) {
      const img = new Image();
      img.onload = () => {
        lightboxImg.src = src;
        lightboxImg.alt = label;
        lightboxImg.style.display = 'block';
        lightboxFallback.style.display = 'none';
      };
      img.onerror = () => {
        lightboxImg.style.display = 'none';
        lightboxFallback.style.display = 'flex';
        if (lightboxLabel) lightboxLabel.textContent = src;
      };
      img.src = src;
    } else {
      lightboxImg.style.display = 'none';
      lightboxFallback.style.display = 'flex';
    }
  }

  function prev() {
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    showImage(currentIndex);
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentGroup.length;
    showImage(currentIndex);
  }

  // Galerie-Items klickbar machen
  galleryItems.forEach((item, i) => {
    // Bestimme die Gruppe (Galerie oder Hochzeit)
    const isHochzeit = item.classList.contains('hochzeit__gallery-item');
    const group = isHochzeit
      ? qsa('.hochzeit__gallery-item')
      : qsa('.galerie__item');

    const indexInGroup = group.indexOf(item);

    item.addEventListener('click', () => openLightbox(group, indexInGroup));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(group, indexInGroup);
      }
    });
  });

  // Steuerung
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', prev);
  if (lightboxNext)  lightboxNext.addEventListener('click', next);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
})();


/* ══════════════════════════════════════════════════════════
   5. LEAFLET-KARTE
══════════════════════════════════════════════════════════ */
(function initMap() {
  const mapEl = qs('#map');
  if (!mapEl || typeof L === 'undefined') return;

  // Leaflet-Marker-Icons lokal setzen
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl:       'leaflet/images/marker-icon.png',
    iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
    shadowUrl:     'leaflet/images/marker-shadow.png',
  });

  const lat = 49.0173;
  const lng = 12.9838;

  const map = L.map('map', {
    center: [lat, lng],
    zoom: 15,
    scrollWheelZoom: false,
    zoomControl: true,
  });

  // Dunkles Kartenlayer (OpenStreetMap, kein Tracking, datenschutzkonform)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende',
    maxZoom: 19,
  }).addTo(map);

  // Marker mit Popup
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(
    '<strong>Friseursalon Schnittpunkt</strong><br>Viechtacherstr. 1<br>94262 Kollnburg',
    { maxWidth: 200 }
  ).openPopup();

  // Karte neu zeichnen wenn Container sichtbar wird
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => map.invalidateSize(), 100);
        mapObserver.unobserve(entry.target);
      }
    });
  });
  mapObserver.observe(mapEl);
})();


/* ══════════════════════════════════════════════════════════
   6. AKTIVEN NAV-LINK BEIM SCROLLEN MARKIEREN
══════════════════════════════════════════════════════════ */
(function initActiveNavLink() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav__links a');

  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.style.color = (href === '#' + id)
              ? 'var(--color-text)'
              : '';
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => sectionObserver.observe(s));
})();
