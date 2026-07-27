/* ==========================================================================
   QEC SCHOOL USIA - MAIN JAVASCRIPT & THREE.JS 3D ENGINE
   ========================================================================== */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLiquidButtons();
  initAcademicTabs();
  initInquiryForm();
  initAchievementModal();
  init3DCampus();
});

/* ==========================================================================
   1. MOBILE NAVIGATION & SCROLL EFFECTS
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // Active Link Highlight on Scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   2. LIQUID UI BUTTON SYSTEM & MOUSE PHYSICS
   ========================================================================== */
function initLiquidButtons() {
  const liquidBtns = document.querySelectorAll('.liquid-btn');

  liquidBtns.forEach(btn => {
    // Magnetic Mouse Tracking
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;

      const blobs = btn.querySelectorAll('.blob');
      blobs.forEach((blob, idx) => {
        const factor = (idx + 1) * 0.1;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(${1 + factor})`;
      });
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
      const blobs = btn.querySelectorAll('.blob');
      blobs.forEach(blob => {
        blob.style.transform = '';
      });
    });

    // Ripple Liquid Effect on Click
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ==========================================================================
   3. ACADEMIC CURRICULUM DATA & TAB SYSTEM
   ========================================================================== */
const ACADEMIC_DATA = {
  preprimary: {
    title: "Pre-Primary Foundation (Nursery, LKG, UKG)",
    badge: "Ages 3 - 5 Years",
    desc: "A warm, nurturing play-based learning atmosphere focused on cognitive skills, language acquisition, and social interaction.",
    streams: [
      { title: "Early Literacy", icon: "fa-book-open", items: ["Phonics & Alphabet games", "Storytelling & Rhymes", "English & Hindi basic vocabulary"] },
      { title: "Creative Arts", icon: "fa-palette", items: ["Drawing & Color recognition", "Music & Movement activities", "Fine motor skill development"] },
      { title: "Numeracy Foundations", icon: "fa-shapes", items: ["Counting & Number patterns", "Basic geometric shapes", "Problem solving games"] }
    ]
  },
  primary: {
    title: "Primary & Middle School (Classes I to VIII)",
    badge: "Classes 1 to 8",
    desc: "Comprehensive CBSE syllabus fostering critical thinking, scientific curiosity, language proficiency, and core ethical values.",
    streams: [
      { title: "Core Subjects", icon: "fa-layer-group", items: ["Mathematics & Mental Aptitude", "Science & Environmental Studies", "Social Sciences & History"] },
      { title: "Languages Offered", icon: "fa-language", items: ["English Language & Literature", "Hindi Standard", "Urdu & Sanskrit Special Electives"] },
      { title: "Co-Curricular", icon: "fa-volleyball", items: ["Computer & Coding Basics", "Sports & Physical Fitness", "Moral Values & Discipline"] }
    ]
  },
  highschool: {
    title: "Secondary Education (Classes IX & X - CBSE)",
    badge: "Classes 9 & 10",
    desc: "Rigorous CBSE curriculum preparing students for Board Examinations with specialized practical lab training.",
    streams: [
      { title: "Sciences", icon: "fa-atom", items: ["Physics Theory & Experiments", "Chemistry Lab Practical", "Biology & Life Sciences"] },
      { title: "Mathematics & Tech", icon: "fa-calculator", items: ["Algebra, Geometry & Statistics", "Information Technology", "Analytical Problem Solving"] },
      { title: "Social Sciences", icon: "fa-earth-americas", items: ["History & Civics", "Geography & Economics", "Disaster Management"] }
    ]
  },
  senior: {
    title: "Senior Secondary Streams (Class XI - CBSE)",
    badge: "Class 11 Streams Available",
    desc: "Specialized academic pathways tailored for higher competitive exams (JEE, NEET, CUET, CA, Civil Services).",
    streams: [
      { title: "Science Stream", icon: "fa-flask", items: ["Physics & Chemistry", "Mathematics / Biology", "Computer Science / PE"] },
      { title: "Commerce Stream", icon: "fa-chart-line", items: ["Accountancy & Business Studies", "Economics & Statistics", "Applied Mathematics"] },
      { title: "Humanities Stream", icon: "fa-building-columns", items: ["History & Political Science", "Sociology & Geography", "Urdu / Sanskrit Electives"] }
    ]
  }
};

function initAcademicTabs() {
  const tabs = document.querySelectorAll('.academic-tab');
  const container = document.getElementById('academicContent');

  function renderTab(tabKey) {
    const data = ACADEMIC_DATA[tabKey];
    if (!data || !container) return;

    container.innerHTML = `
      <div class="academic-detail-wrapper">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <h3 style="font-family:var(--font-heading); font-size:1.6rem; color:var(--text-main);">${data.title}</h3>
          <span style="background:rgba(0,240,255,0.15); color:var(--primary-cyan); border:1px solid var(--border-cyan); padding:0.3rem 0.85rem; border-radius:var(--radius-pill); font-weight:700; font-size:0.85rem;">
            ${data.badge}
          </span>
        </div>
        <p style="color:var(--text-muted); font-size:1.05rem; margin-bottom:1.5rem;">${data.desc}</p>
        <div class="stream-grid">
          ${data.streams.map(s => `
            <div class="stream-card">
              <i class="fa-solid ${s.icon}"></i>
              <h4>${s.title}</h4>
              <ul>
                ${s.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTab(tab.getAttribute('data-tab'));
    });
  });

  // Initial Render
  renderTab('preprimary');
}

/* ==========================================================================
   4. ADMISSION INQUIRY FORM & MODALS
   ========================================================================== */
function initInquiryForm() {
  const form = document.getElementById('quickInquiryForm');
  const successMsg = document.getElementById('formSuccessMessage');
  const openAdmissionBtn = document.getElementById('openAdmissionBtn');
  const heroInquireBtn = document.getElementById('heroInquireBtn');

  if (openAdmissionBtn) {
    openAdmissionBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('studentName');
        if (nameInput) setTimeout(() => nameInput.focus(), 800);
      }
    });
  }

  if (heroInquireBtn) {
    heroInquireBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('.liquid-btn-text').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      }

      setTimeout(() => {
        form.classList.add('hidden');
        if (successMsg) successMsg.classList.remove('hidden');
      }, 1200);
    });
  }
}

/* ==========================================================================
   5. THREE.JS 3D SCHOOL CAMPUS ENGINE
   ========================================================================== */
function init3DCampus() {
  const container = document.getElementById('threejs-container');
  const loader = document.getElementById('canvasLoader');
  const hotspotCard = document.getElementById('hotspotCard');
  const closeHotspotBtn = document.getElementById('closeHotspotBtn');

  if (!container) return;

  // Scene Setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070b14);
  scene.fog = new THREE.FogExp2(0x070b14, 0.008);

  // Camera Setup
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(45, 30, 60);

  // Renderer Setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.02; // Keep camera above ground
  controls.minDistance = 15;
  controls.maxDistance = 120;
  controls.target.set(0, 10, 0);

  // Lighting System
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
  sunLight.position.set(60, 80, 40);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  const blueFillLight = new THREE.DirectionalLight(0x00f0ff, 0.5);
  blueFillLight.position.set(-50, 40, -40);
  scene.add(blueFillLight);

  // Ground / Courtyard Mesh
  const groundGeo = new THREE.PlaneGeometry(120, 100);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.8,
    metalness: 0.2
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Courtyard Tile Pattern Grid
  const gridHelper = new THREE.GridHelper(120, 30, 0x00f0ff, 0x334155);
  gridHelper.position.y = 0.05;
  scene.add(gridHelper);

  /* ------------------------------------------------------------------------
     BUILDING ARCHITECTURE GENERATION (QEC School Multi-Story Structure)
     ------------------------------------------------------------------------ */
  const schoolGroup = new THREE.Group();

  // Materials
  const yellowWallMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6 });
  const bluePillarMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
  const blueBalconyMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
  const glassWindowMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    transmission: 0.8,
    opacity: 1,
    transparent: true,
    roughness: 0.1,
    ior: 1.5
  });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });

  const buildingWidth = 50;
  const buildingHeightPerFloor = 7;
  const numFloors = 3;
  const buildingDepth = 18;

  // 1. Floor Slabs & Balconies
  for (let f = 0; f <= numFloors; f++) {
    const floorY = f * buildingHeightPerFloor;
    const slabGeo = new THREE.BoxGeometry(buildingWidth + 2, 0.8, buildingDepth + 4);
    const slab = new THREE.Mesh(slabGeo, bluePillarMat);
    slab.position.set(0, floorY, 0);
    slab.castShadow = true;
    slab.receiveShadow = true;
    schoolGroup.add(slab);

    // Balcony Railings for Upper Floors
    if (f > 0 && f < numFloors) {
      const railGeo = new THREE.BoxGeometry(buildingWidth, 1.2, 0.3);
      const rail = new THREE.Mesh(railGeo, blueBalconyMat);
      rail.position.set(0, floorY + 1, buildingDepth / 2 + 1.8);
      schoolGroup.add(rail);
    }
  }

  // 2. Main Wall Backing & Classrooms
  const mainWallGeo = new THREE.BoxGeometry(buildingWidth, buildingHeightPerFloor * numFloors, buildingDepth);
  const mainWall = new THREE.Mesh(mainWallGeo, yellowWallMat);
  mainWall.position.set(0, (buildingHeightPerFloor * numFloors) / 2, 0);
  mainWall.castShadow = true;
  mainWall.receiveShadow = true;
  schoolGroup.add(mainWall);

  // 3. Front Arch Walkway & Support Pillars
  const pillarSpacing = 7;
  const numPillars = 8;
  for (let i = 0; i < numPillars; i++) {
    const xPos = -buildingWidth / 2 + 3.5 + i * pillarSpacing;
    
    // Pillar
    const pillarGeo = new THREE.BoxGeometry(1.2, buildingHeightPerFloor * numFloors, 1.2);
    const pillar = new THREE.Mesh(pillarGeo, bluePillarMat);
    pillar.position.set(xPos, (buildingHeightPerFloor * numFloors) / 2, buildingDepth / 2 + 1.5);
    pillar.castShadow = true;
    schoolGroup.add(pillar);

    // Arch Tops on Ground Floor
    if (i < numPillars - 1) {
      const archGeo = new THREE.TorusGeometry(pillarSpacing / 2, 0.4, 8, 16, Math.PI);
      const arch = new THREE.Mesh(archGeo, yellowWallMat);
      arch.position.set(xPos + pillarSpacing / 2, buildingHeightPerFloor - 0.5, buildingDepth / 2 + 1.5);
      arch.rotation.x = 0;
      schoolGroup.add(arch);
    }
  }

  // 4. Central Elevator & Stairwell Tower
  const towerWidth = 8;
  const towerHeight = buildingHeightPerFloor * numFloors + 6;
  const towerDepth = buildingDepth + 3;

  const towerGeo = new THREE.BoxGeometry(towerWidth, towerHeight, towerDepth);
  const tower = new THREE.Mesh(towerGeo, yellowWallMat);
  tower.position.set(12, towerHeight / 2, 0);
  tower.castShadow = true;
  schoolGroup.add(tower);

  // Vertical Glass Windows on Tower
  const glassGeo = new THREE.BoxGeometry(towerWidth - 2, towerHeight - 4, 0.4);
  const glassPanel = new THREE.Mesh(glassGeo, glassWindowMat);
  glassPanel.position.set(12, towerHeight / 2, towerDepth / 2 + 0.1);
  schoolGroup.add(glassPanel);

  // Tower Roof Cap
  const capGeo = new THREE.BoxGeometry(towerWidth + 2, 1.5, towerDepth + 2);
  const cap = new THREE.Mesh(capGeo, roofMat);
  cap.position.set(12, towerHeight + 0.75, 0);
  schoolGroup.add(cap);

  // 5. School Facade Name Banner ("QEC SCHOOL")
  const bannerCanvas = document.createElement('canvas');
  bannerCanvas.width = 1024;
  bannerCanvas.height = 256;
  const ctx = bannerCanvas.getContext('2d');
  ctx.fillStyle = '#FEF08A';
  ctx.fillRect(0, 0, 1024, 256);
  ctx.font = 'bold 90px Outfit, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.textAlign = 'center';
  ctx.fillText('QEC SCHOOL', 512, 120);
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillStyle = '#0284C7';
  ctx.fillText('USIA, GHAZIPUR (CBSE)', 512, 190);

  const bannerTex = new THREE.CanvasTexture(bannerCanvas);
  const bannerMat = new THREE.MeshBasicMaterial({ map: bannerTex });
  const bannerGeo = new THREE.PlaneGeometry(16, 4);
  const bannerMesh = new THREE.Mesh(bannerGeo, bannerMat);
  bannerMesh.position.set(-6, buildingHeightPerFloor * numFloors - 2, buildingDepth / 2 + 2.1);
  schoolGroup.add(bannerMesh);

  // 6. Courtyard Flag Poles (Red, Yellow, Blue flags)
  const flagColors = [0xef4444, 0xeab308, 0x3b82f6];
  for (let k = 0; k < 3; k++) {
    const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 8, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(-15 + k * 3, 4, 20);
    schoolGroup.add(pole);

    const flagGeo = new THREE.BoxGeometry(2, 1.2, 0.05);
    const flagMat = new THREE.MeshStandardMaterial({ color: flagColors[k] });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(-15 + k * 3 + 1, 7.4, 20);
    schoolGroup.add(flag);
  }

  scene.add(schoolGroup);

  /* ------------------------------------------------------------------------
     INTERACTIVE 3D HOTSPOTS
     ------------------------------------------------------------------------ */
  const HOTSPOTS_DATA = [
    {
      id: 'academic',
      title: 'Main Academic Wing',
      tag: 'CBSE CLASSROOMS',
      pos: new THREE.Vector3(-10, 14, 12),
      desc: 'Spacious, well-ventilated classrooms equipped with modern smart boards, ergonomic seating, and individual student focus zones.',
      meta1: '<i class="fa-solid fa-chalkboard-user"></i> Nursery - Class XI',
      meta2: '<i class="fa-solid fa-wind"></i> Airy Corridors'
    },
    {
      id: 'admin',
      title: 'Administrative Wing & Management',
      tag: 'FOUNDATION OFFICE',
      pos: new THREE.Vector3(12, 16, 12),
      desc: 'Central office space for school owners MD Perwez Khan & Aarif Khan, principal room, admissions helpdesk, and accounts.',
      meta1: '<i class="fa-solid fa-user-shield"></i> Leadership Desk',
      meta2: '<i class="fa-solid fa-headset"></i> Parent Counseling'
    },
    {
      id: 'labs',
      title: 'Science & Computer Labs',
      tag: 'PRACTICAL INNOVATION',
      pos: new THREE.Vector3(-18, 7, 12),
      desc: 'State-of-the-art Physics, Chemistry, Biology, and IT computer labs adhering strictly to CBSE practical standards.',
      meta1: '<i class="fa-solid fa-microscope"></i> Modern Apparatus',
      meta2: '<i class="fa-solid fa-desktop"></i> High-Speed IT Lab'
    },
    {
      id: 'library',
      title: 'Sir Syed Resource Library',
      tag: 'KNOWLEDGE HUB',
      pos: new THREE.Vector3(2, 7, 12),
      desc: 'Extensive collection of academic books, reference guides, children stories, and special language literature in Sanskrit and Urdu.',
      meta1: '<i class="fa-solid fa-book"></i> 5000+ Books',
      meta2: '<i class="fa-solid fa-language"></i> Multi-lingual'
    },
    {
      id: 'courtyard',
      title: 'Central Assembly Courtyard',
      tag: 'SPORTS & CULTURE',
      pos: new THREE.Vector3(-9, 1, 20),
      desc: 'Expansive paved courtyard for morning prayer assemblies, annual sports meets, flag hoisting, and physical training.',
      meta1: '<i class="fa-solid fa-flag"></i> Daily Assembly',
      meta2: '<i class="fa-solid fa-volleyball"></i> Sports Field'
    }
  ];

  const hotspotMeshes = [];

  HOTSPOTS_DATA.forEach(data => {
    // Glowing sphere pin
    const pinGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const pinMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true
    });
    const pin = new THREE.Mesh(pinGeo, pinMat);
    pin.position.copy(data.pos);
    pin.userData = data;
    scene.add(pin);
    hotspotMeshes.push(pin);

    // Outer pulse ring
    const ringGeo = new THREE.RingGeometry(1, 1.4, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffb800,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(data.pos);
    ring.rotation.x = Math.PI / 2;
    ring.userData.isRing = true;
    scene.add(ring);
  });

  // Hide Loader when ready
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
  }, 600);

  /* ------------------------------------------------------------------------
     INTERACTION & CAMERA CONTROLS
     ------------------------------------------------------------------------ */
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener('click', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hotspotMeshes);

    if (intersects.length > 0) {
      const data = intersects[0].object.userData;
      showHotspotCard(data);

      // Smooth camera lerp target
      controls.target.copy(data.pos);
    }
  });

  function showHotspotCard(data) {
    if (!hotspotCard) return;
    document.getElementById('hotspotTag').textContent = data.tag;
    document.getElementById('hotspotTitle').textContent = data.title;
    document.getElementById('hotspotDesc').textContent = data.desc;
    document.getElementById('hotspotMeta1').innerHTML = data.meta1;
    document.getElementById('hotspotMeta2').innerHTML = data.meta2;

    hotspotCard.classList.add('active');
  }

  if (closeHotspotBtn) {
    closeHotspotBtn.addEventListener('click', () => {
      hotspotCard.classList.remove('active');
    });
  }

  // Preset Buttons
  let isAutoRotate = false;

  const viewFrontBtn = document.getElementById('viewFrontBtn');
  const viewAerialBtn = document.getElementById('viewAerialBtn');
  const viewCourtyardBtn = document.getElementById('viewCourtyardBtn');
  const toggleRotateBtn = document.getElementById('toggleRotateBtn');
  const toggleLightingBtn = document.getElementById('toggleLightingBtn');
  const reset3dBtn = document.getElementById('reset3dBtn');

  function setPresetActive(activeBtn) {
    [viewFrontBtn, viewAerialBtn, viewCourtyardBtn].forEach(b => {
      if (b) b.classList.remove('active');
    });
    if (activeBtn) activeBtn.classList.add('active');
  }

  if (viewFrontBtn) {
    viewFrontBtn.addEventListener('click', () => {
      setPresetActive(viewFrontBtn);
      camera.position.set(0, 20, 55);
      controls.target.set(0, 10, 0);
    });
  }

  if (viewAerialBtn) {
    viewAerialBtn.addEventListener('click', () => {
      setPresetActive(viewAerialBtn);
      camera.position.set(40, 55, 40);
      controls.target.set(0, 10, 0);
    });
  }

  if (viewCourtyardBtn) {
    viewCourtyardBtn.addEventListener('click', () => {
      setPresetActive(viewCourtyardBtn);
      camera.position.set(-15, 6, 35);
      controls.target.set(0, 5, 10);
    });
  }

  if (toggleRotateBtn) {
    toggleRotateBtn.addEventListener('click', () => {
      isAutoRotate = !isAutoRotate;
      controls.autoRotate = isAutoRotate;
      controls.autoRotateSpeed = 2.0;
      toggleRotateBtn.classList.toggle('active', isAutoRotate);
    });
  }

  let isNight = false;
  if (toggleLightingBtn) {
    toggleLightingBtn.addEventListener('click', () => {
      isNight = !isNight;
      toggleLightingBtn.classList.toggle('active', isNight);
      
      if (isNight) {
        scene.background = new THREE.Color(0x030712);
        ambientLight.intensity = 0.25;
        sunLight.intensity = 0.3;
        blueFillLight.color.setHex(0xa855f7);
      } else {
        scene.background = new THREE.Color(0x070b14);
        ambientLight.intensity = 0.6;
        sunLight.intensity = 1.8;
        blueFillLight.color.setHex(0x00f0ff);
      }
    });
  }

  if (reset3dBtn) {
    reset3dBtn.addEventListener('click', () => {
      setPresetActive(viewFrontBtn);
      camera.position.set(45, 30, 60);
      controls.target.set(0, 10, 0);
    });
  }

  // Window Resize
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Pulse hotspot pins
    hotspotMeshes.forEach(pin => {
      pin.rotation.y = elapsedTime * 1.5;
      pin.rotation.x = elapsedTime * 0.8;
    });

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

/* ==========================================================================
   5. FULLSCREEN ACHIEVEMENT PHOTO MODAL VIEWER
   ========================================================================== */
function initAchievementModal() {
  const openBtn = document.getElementById('openAchievementModalBtn');
  const closeBtn = document.getElementById('closeAchievementModalBtn');
  const modal = document.getElementById('achievementModal');
  const backdrop = document.getElementById('modalBackdrop');
  const photoBox = document.getElementById('achievementPhotoBox');

  function openModal() {
    if (modal) modal.classList.add('active');
  }

  function closeModal() {
    if (modal) modal.classList.remove('active');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (photoBox) photoBox.addEventListener('click', (e) => {
    // Prevent triggering if clicked on other elements inside if any
    if (e.target.closest('#openAchievementModalBtn') || e.target.classList.contains('achievement-img')) {
      openModal();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) closeModal();
    }
  });

  // Campus Profile Photo Lightbox Modal
  const openProfBtn = document.getElementById('openProfileModalBtn');
  const closeProfBtn = document.getElementById('closeCampusModalBtn');
  const profModal = document.getElementById('campusProfileModal');
  const profBackdrop = document.getElementById('campusModalBackdrop');
  const profPhotoBox = document.getElementById('campusProfilePhotoBox');

  function openProfModal() {
    if (profModal) profModal.classList.add('active');
  }

  function closeProfModal() {
    if (profModal) profModal.classList.remove('active');
  }

  if (openProfBtn) openProfBtn.addEventListener('click', openProfModal);
  if (profPhotoBox) profPhotoBox.addEventListener('click', (e) => {
    if (e.target.closest('#openProfileModalBtn') || e.target.classList.contains('profile-img')) {
      openProfModal();
    }
  });

  if (closeProfBtn) closeProfBtn.addEventListener('click', closeProfModal);
  if (profBackdrop) profBackdrop.addEventListener('click', closeProfModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profModal && profModal.classList.contains('active')) {
      closeProfModal();
    }
  });

  // Official Logo Crest Lightbox Modal
  const openLogoBtn = document.getElementById('openLogoModalBtn');
  const closeLogoBtn = document.getElementById('closeLogoModalBtn');
  const logoModal = document.getElementById('logoModal');
  const logoBackdrop = document.getElementById('logoModalBackdrop');
  const logoPhotoBox = document.getElementById('logoPhotoBox');

  function openLogoModal() {
    if (logoModal) logoModal.classList.add('active');
  }

  function closeLogoModal() {
    if (logoModal) logoModal.classList.remove('active');
  }

  if (openLogoBtn) openLogoBtn.addEventListener('click', openLogoModal);
  if (logoPhotoBox) logoPhotoBox.addEventListener('click', (e) => {
    if (e.target.closest('#openLogoModalBtn') || e.target.classList.contains('crest-logo-img')) {
      openLogoModal();
    }
  });

  if (closeLogoBtn) closeLogoBtn.addEventListener('click', closeLogoModal);
  if (logoBackdrop) logoBackdrop.addEventListener('click', closeLogoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && logoModal && logoModal.classList.contains('active')) {
      closeLogoModal();
    }
  });
}

