const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const reducedMotion = reducedMotionQuery.matches;
const isMobile = window.matchMedia("(max-width: 760px)").matches;

const translations = {
  en: {
    navHome: "Home",
    navProjects: "Projects",
    navAbout: "About",
    navContact: "Contact",
    heroLabel: "Systems UI Portfolio",
    heroTitle: "Alvaro Chacon",
    heroRole: "Frontend Engineer · 3D Web Developer",
    heroCopy:
      "I design and ship resilient web systems that merge performance, interaction, and product clarity.",
    heroCtaProjects: "View projects",
    heroCtaContact: "Contact",
    scrollCue: "Scroll to explore",
    posLabel: "Positioning",
    posTitle: "Problem → Solution → Outcome",
    posCopy:
      "I translate product constraints into robust interfaces: bottlenecks identified, systems refactored, and measurable outcomes delivered.",
    metricPerfLabel: "Performance",
    metricA11yLabel: "Accessibility",
    metricReliabilityLabel: "Reliability",
    metricDeliveryLabel: "Delivery",
    capLabel: "Capability Stack",
    capTitle: "Core technical pillars",
    pillarFrontend: "Frontend Systems",
    pillarFrontendCopy: "Scalable design systems and architecture-first UI.",
    pillar3d: "3D Web",
    pillar3dCopy: "Real-time visuals with restrained, product-safe motion.",
    pillarPerf: "Performance",
    pillarPerfCopy: "Profiling, rendering budgets, and Core Web Vitals execution.",
    pillarProduct: "Product UI",
    pillarProductCopy: "Decision-ready interfaces for critical product workflows.",
    projectsLabel: "Projects",
    projectsTitle: "Selected deployment history",
    project1Outcome: "Outcome: 48% faster incident diagnosis through real-time observability UI.",
    project2Outcome: "Outcome: cut onboarding time by 37% with spatially guided model context.",
    project3Outcome: "Outcome: reduced transaction error rates by 19% via resilient UX patterns.",
    project4Outcome: "Outcome: improved time-to-insight with low-latency visual analytics pipelines.",
    aboutLabel: "About",
    aboutTitle: "Technical profile",
    aboutCopy:
      "I build production interfaces for high-stakes systems where speed and correctness are non-negotiable. My approach starts with constraints, then architecture, then motion. I prioritize clear information hierarchy, robust state handling, and measurable rendering performance. I collaborate tightly with product and platform teams, and I treat accessibility as a baseline requirement. I ship clean code, maintainable components, and instrumentation that supports long-term operation.",
    contactLabel: "Final CTA",
    contactTitle: "Let's build something critical.",
    contactCopy:
      "Available for product engineering, systems UI, and performance-driven web projects.",
    systemStatus: "OPERATIONAL",
  },
  es: {
    navHome: "Inicio",
    navProjects: "Proyectos",
    navAbout: "Perfil",
    navContact: "Contacto",
    heroLabel: "Portfolio de Sistemas UI",
    heroTitle: "Alvaro Chacon",
    heroRole: "Ingeniero Frontend · Desarrollador Web 3D",
    heroCopy:
      "Diseño y entrego sistemas web resilientes que combinan rendimiento, interacción y claridad de producto.",
    heroCtaProjects: "Ver proyectos",
    heroCtaContact: "Contactar",
    scrollCue: "Explorar con scroll",
    posLabel: "Posicionamiento",
    posTitle: "Problema → Solución → Resultado",
    posCopy:
      "Convierto restricciones de producto en interfaces robustas: cuellos de botella detectados, sistemas refactorizados y resultados medibles.",
    metricPerfLabel: "Rendimiento",
    metricA11yLabel: "Accesibilidad",
    metricReliabilityLabel: "Confiabilidad",
    metricDeliveryLabel: "Entrega",
    capLabel: "Stack de Capacidades",
    capTitle: "Pilares técnicos centrales",
    pillarFrontend: "Sistemas Frontend",
    pillarFrontendCopy: "Sistemas de diseño escalables y UI orientada a arquitectura.",
    pillar3d: "Web 3D",
    pillar3dCopy: "Visuales en tiempo real con movimiento sobrio y útil.",
    pillarPerf: "Performance",
    pillarPerfCopy: "Perfilado, presupuestos de render y ejecución de Core Web Vitals.",
    pillarProduct: "Product UI",
    pillarProductCopy: "Interfaces orientadas a decisiones para flujos críticos.",
    projectsLabel: "Proyectos",
    projectsTitle: "Historial de despliegues seleccionados",
    project1Outcome:
      "Resultado: 48% más rapidez en diagnóstico de incidentes con observabilidad en tiempo real.",
    project2Outcome:
      "Resultado: reducción del 37% en onboarding con contexto espacial guiado.",
    project3Outcome:
      "Resultado: 19% menos errores transaccionales con patrones UX resilientes.",
    project4Outcome:
      "Resultado: mejor tiempo hasta insight con analítica visual de baja latencia.",
    aboutLabel: "Perfil",
    aboutTitle: "Perfil técnico",
    aboutCopy:
      "Construyo interfaces de producción para sistemas críticos donde velocidad y precisión son obligatorias. Mi enfoque parte de las restricciones, luego arquitectura y después movimiento. Priorizo jerarquía de información, manejo robusto de estado y rendimiento de render medible. Colaboro de forma estrecha con producto y plataforma, y trato la accesibilidad como requisito base. Entrego código limpio, componentes mantenibles e instrumentación preparada para operación continua.",
    contactLabel: "CTA Final",
    contactTitle: "Construyamos algo crítico.",
    contactCopy:
      "Disponible para ingeniería de producto, sistemas UI y proyectos web orientados al rendimiento.",
    systemStatus: "OPERATIVO",
  },
};

function setupLanguageToggle() {
  const buttons = [...document.querySelectorAll(".lang-btn")];
  const nodes = [...document.querySelectorAll("[data-i18n]")];

  const applyLang = (lang) => {
    const dict = translations[lang];
    if (!dict) return;

    nodes.forEach((node) => {
      const key = node.dataset.i18n;
      if (dict[key]) node.textContent = dict[key];
    });

    buttons.forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    document.documentElement.lang = lang;
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
}

function setupRevealAnimations() {
  const sections = [...document.querySelectorAll(".reveal")];
  const staggerTargets = [
    ".metrics-grid",
    ".pillars-grid",
    ".projects-grid",
    ".contact-links",
    ".hero-cta",
  ];

  staggerTargets.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) element.classList.add("reveal-stagger");
  });

  if (reducedMotion) {
    sections.forEach((node) => node.classList.add("is-visible"));
    document.querySelectorAll(".reveal-stagger").forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );

  sections.forEach((node) => observer.observe(node));
  document.querySelectorAll(".reveal-stagger").forEach((node) => observer.observe(node));
}

function setupScrollParallax() {
  if (reducedMotion) return;
  const setScrollRatio = () => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    document.documentElement.style.setProperty("--scroll-ratio", ratio.toFixed(4));
  };

  setScrollRatio();
  window.addEventListener("scroll", setScrollRatio, { passive: true });
}

async function initThreeBackground() {
  if (reducedMotion) return;
  const canvas = document.getElementById("scene-bg");
  if (!canvas) return;

  try {
    const THREE = await import("https://unpkg.com/three@0.161.0/build/three.module.js");

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.6));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const ambient = new THREE.AmbientLight(0x9edcff, 0.18);
    scene.add(ambient);

    const particleCount = isMobile ? 180 : 360;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 9.2;
      positions[i3 + 2] = (Math.random() - 0.5) * 7.2;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8edcff,
      size: isMobile ? 0.017 : 0.014,
      transparent: true,
      opacity: isMobile ? 0.32 : 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(6.5, 28, 28),
      new THREE.MeshBasicMaterial({
        color: 0x2f4f62,
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
      })
    );
    scene.add(halo);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.7, 0.015, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x86e6ff, transparent: true, opacity: 0.08 })
    );
    ring.rotation.x = Math.PI / 2.4;
    ring.rotation.y = Math.PI / 6;
    scene.add(ring);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    let isPaused = document.hidden;
    const minFrameMs = isMobile ? 1000 / 28 : 1000 / 45;
    let last = 0;

    const render = (time) => {
      if (isPaused) return;
      rafId = requestAnimationFrame(render);
      if (time - last < minFrameMs) return;
      last = time;

      const t = time * 0.00018;
      particles.rotation.y = t * 0.7;
      particles.rotation.x = Math.sin(t * 1.3) * 0.08;
      ring.rotation.z = t * 0.32;
      halo.rotation.y = t * 0.22;
      camera.position.x = Math.sin(t * 2.1) * 0.11;
      camera.position.y = Math.cos(t * 1.7) * 0.08;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(rafId);
      } else {
        isPaused = false;
        last = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    if (!isPaused) rafId = requestAnimationFrame(render);
  } catch (err) {
    console.error("Three.js background failed to initialize:", err);
  }
}

setupLanguageToggle();
setupRevealAnimations();
setupScrollParallax();
initThreeBackground();
