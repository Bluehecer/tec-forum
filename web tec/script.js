const homeSlides = [
  {
    title: 'Vision & Innovation',
    desc: 'Dynamic workshops, futuristic events, and tools for makers.',
    gallery: 'Sample event photos ready to replace with your own images.'
  },
  {
    title: 'Community Showcase',
    desc: 'Show off member projects, event highlights, and tech achievements.',
    gallery: 'Highlighting team projects, presentations, and innovation demos.'
  },
  {
    title: 'Digital Learning',
    desc: 'Strengthen skills in coding, robotics, design, and AI through practice.',
    gallery: 'Training sessions, workshops, and hands-on student learning.'
  }
];

const activitySlides = [
  {
    title: 'Coding From CSS & Python',
    desc: 'Master the art of web design with CSS and dive deep into programming logic with Python.'
  },
  {
    title: 'Tech Challenges',
    desc: 'Participate in school-level coding challenges and exhibitions to win exciting prizes and recognition.'
  },
  {
    title: 'Robotics & Electronics',
    desc: 'Learn to build circuits and program intelligent robots through fun, hands-on practical sessions.'
  }
];

let homeSlideIndex = 0;
let activitySlideIndex = 0;

function updateHomeSlide() {
  const title = document.getElementById('homeSlideTitle');
  const desc = document.getElementById('homeSlideDesc');
  const gallerySlide = document.getElementById('gallerySlide');
  const galleryMeta = document.getElementById('galleryMeta');
  if (!title || !desc || !gallerySlide || !galleryMeta) return;

  const slide = homeSlides[homeSlideIndex];
  title.textContent = slide.title;
  desc.textContent = slide.desc;
  gallerySlide.textContent = slide.gallery;
  galleryMeta.textContent = slide.gallery;
}

function updateActivitySlide() {
  const title = document.getElementById('activityTitle');
  const desc = document.getElementById('activityDesc');
  if (!title || !desc) return;

  const slide = activitySlides[activitySlideIndex];
  title.textContent = slide.title;
  desc.textContent = slide.desc;
}

function createMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const fontSize = 16;
  const columns = Math.floor(width / fontSize);
  const drops = Array(columns).fill(0);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function draw() {
    ctx.fillStyle = 'rgba(2, 5, 12, 0.15)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#5ce5ff';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  return setInterval(draw, 60);
}

function hideIntro() {
  const overlay = document.getElementById('introOverlay');
  if (!overlay) return;
  overlay.classList.add('fade-out');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
}

function setupButtons() {
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      homeSlideIndex = (homeSlideIndex + 1) % homeSlides.length;
      updateHomeSlide();
    });
  }

  const nextActivityBtn = document.getElementById('nextActivityBtn');
  if (nextActivityBtn) {
    nextActivityBtn.addEventListener('click', () => {
      activitySlideIndex = (activitySlideIndex + 1) % activitySlides.length;
      updateActivitySlide();
    });
  }
}

function initPage() {
  updateHomeSlide();
  updateActivitySlide();
  setupButtons();
  const matrixLoop = createMatrix();
  setTimeout(hideIntro, 2600);
  return matrixLoop;
}

window.addEventListener('DOMContentLoaded', () => {
  const matrixLoop = initPage();
  if (matrixLoop) {
    setTimeout(() => clearInterval(matrixLoop), 4200);
  }
});
