document.addEventListener("DOMContentLoaded", function () {

    /* ================== IMAGE DATA ================== */
    const PD = {
        mosque: [
            '/static/images/masjid_1.jpeg',
            '/static/images/masjid_2.jpeg',
            '/static/images/masjid_3.jpeg'
        ],
        minar: [
            '/static/images/masjid_4.jpeg',
            '/static/images/masjid_5.jpeg',
            '/static/images/masjid_6.jpeg'
        ],
        dome: [
            '/static/images/masjid_7.jpeg',
            '/static/images/masjid_8.jpeg',
            '/static/images/masjid_9.jpeg'
        ],
        madarsa: [
            '/static/images/masjid_10.jpeg',
            '/static/images/masjid_11.jpeg'
        ],
        restoration: [
            '/static/images/masjid_12.jpeg',
            '/static/images/masjid_13.jpeg'
        ]
    };

    /* ================== PROJECT DATA ================== */
    const projects = [
        { cat: 'mosque', name: 'Masjid Al-Noor', loc: 'Lahore', year: '2023', desc: '4 grand minars...', tags: ['4 Minars', 'Dome 65ft', 'Mughal Style'], img: PD.mosque[0] },
        { cat: 'mosque', name: 'Jamia Masjid Al-Falah', loc: 'Islamabad', year: '2022', desc: 'Contemporary mosque...', tags: ['2 Minars', 'Ottoman', 'Marble'], img: PD.mosque[1] },
        { cat: 'mosque', name: 'Masjid Rahma', loc: 'Peshawar', year: '2021', desc: 'Pathan-style mosque...', tags: ['Pathan Style', 'Green Dome', 'Jali'], img: PD.mosque[2] },
        { cat: 'minar', name: 'Twin Minars Project', loc: 'Faisalabad', year: '2021', desc: '120ft minars...', tags: ['120ft', 'Octagonal'], img: PD.minar[0] },
        { cat: 'dome', name: 'Grand Dome', loc: 'Rawalpindi', year: '2022', desc: '45ft dome...', tags: ['45ft Dome'], img: PD.dome[0] },
        { cat: 'madarsa', name: 'Jamia Islamia', loc: 'Karachi', year: '2022', desc: '800 students...', tags: ['Full Complex'], img: PD.madarsa[0] },
        { cat: 'restoration', name: 'Heritage Mosque', loc: 'Multan', year: '2023', desc: 'Restoration...', tags: ['80yr'], img: PD.restoration[0] }
    ];

    const CL = {
        mosque: 'Mosque',
        minar: 'Minar',
        dome: 'Dome',
        madarsa: 'Madarsa',
        restoration: 'Restoration'
    };

    /* ================== RENDER PROJECTS ================== */
    function renderP(filter = 'all') {
        const g = document.getElementById('ppg');
        if (!g) return;

        const list = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

        g.innerHTML = list.map(p => `
      <div class="pfc">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="pfi">
          <div class="pfcat">${CL[p.cat]} · ${p.year}</div>
          <div class="pfn">${p.name}</div>
          <div class="pfl">📍 ${p.loc}</div>
          <div class="pfd">${p.desc}</div>
          <div class="ptags">
            ${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
          </div>
          <div style="margin-top:1rem;">
            <a href="https://wa.me/919997868686?text=Assalamu%20Alaikum!%20I%20like%20${encodeURIComponent(p.name)}"
               target="_blank" class="btn-primary">
               Enquire
            </a>
          </div>
        </div>
      </div>
    `).join('');
    }

    window.filterP = function (f, btn) {
        document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
        if (btn) btn.classList.add('active');
        renderP(f);
    };

    /* ================== PAGE NAVIGATION ================== */
    window.goPage = function (p) {
        document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));

        const pageMap = {
            home: 'home-page',
            projects: 'projects-page',
            contact: 'contact-page'
        };

        const el = document.getElementById(pageMap[p]);
        if (el) el.classList.add('active');

        if (p === 'projects') renderP('all');

        window.scrollTo(0, 0);
    };

    /* ================== MOBILE MENU ================== */
    //  window.openMob = () => document.getElementById('mob')?.classList.add('open');
    // window.closeMob = () => document.getElementById('mob')?.classList.remove('open');
window.toggleMob = function () {
  const mob = document.getElementById('mob');
  const icon = document.getElementById('menuIcon');

  mob.classList.toggle('open');

  if (mob.classList.contains('open')) {
    icon.classList.remove('ri-menu-3-line');
    icon.classList.add('ri-close-large-fill');
  } else {
    icon.classList.remove('ri-close-large-fill');
    icon.classList.add('ri-menu-3-line');
  }
};
    

    /* ================== NAV SCROLL ================== */
    window.addEventListener('scroll', () => {
        document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 40);
    });

    renderP();


    /* ================== LIGHTBOX ================== */
    const galleryImgs = document.querySelectorAll('.image-grid img');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');

    let currentIndex = 0;

    function openLightbox(i) {
        if (!galleryImgs.length) return;

        currentIndex = i;
        lightboxImage.src = galleryImgs[i].src;
        lightboxImage.alt = galleryImgs[i].alt;
        lightboxCounter.textContent = `${i + 1} / ${galleryImgs.length}`;
        lightboxOverlay.classList.add('active');
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
    }

    function slideImage(dir) {
        currentIndex = (currentIndex + dir + galleryImgs.length) % galleryImgs.length;

        lightboxImage.src = galleryImgs[currentIndex].src;
        lightboxImage.alt = galleryImgs[currentIndex].alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImgs.length}`;
    }

    galleryImgs.forEach((img, i) => {
        img.addEventListener('click', () => openLightbox(i));
    });

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev')?.addEventListener('click', () => slideImage(-1));
    document.getElementById('lightboxNext')?.addEventListener('click', () => slideImage(1));

    lightboxOverlay?.addEventListener('click', e => {
        if (e.target === lightboxOverlay) closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (!lightboxOverlay?.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') slideImage(-1);
        if (e.key === 'ArrowRight') slideImage(1);
        if (e.key === 'Escape') closeLightbox();
    });

});

  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

