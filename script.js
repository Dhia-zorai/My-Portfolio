// Fade-in effect on scroll and initial load
let ticking = false;
function revealSections() {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add("visible");
    }
  });
}
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const nav = document.querySelector(".desktop-nav");
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
      revealSections();
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener("scroll", onScroll);
document.addEventListener("DOMContentLoaded", () => {
  revealSections();
});

// Dark Mode Toggle
const toggle = document.querySelectorAll(".theme-toggle");
function updateThemeIcon() {
  toggle.forEach((btn) => {
    const icon = btn.querySelector("i");
    if (document.body.classList.contains("light-mode")) {
      icon.classList.remove("fa-lightbulb");
      icon.classList.add("fa-moon");
      icon.title = "Switch to dark mode";
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-lightbulb");
      icon.title = "Switch to light mode";
    }
  });
}
toggle.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    updateThemeIcon();
    const currentTheme = document.body.classList.contains("light-mode")
      ? "light"
      : "dark";
    localStorage.setItem("theme", currentTheme);
  });
});

// Persist theme on reload
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
  updateThemeIcon();
});

// Mobile Nav Blur Effect
if (CSS.supports("backdrop-filter", "blur(10px)")) {
  document.querySelector(".mobile-nav").style.backdropFilter = "blur(10px)";
}

// Instant Load Optimizations
document.addEventListener("DOMContentLoaded", () => {
  // Lazy load
  const styles = document.createElement("link");
  styles.rel = "stylesheet";
  styles.href = "fonts.css";
  document.head.appendChild(styles);
});

// Project Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Filter logic
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      card.style.display =
        filter === "all" || card.dataset.category === filter ? "block" : "none";
    });

    // Update active state
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Show More/Less Functionality
const showMoreBtn = document.querySelector(".show-more");
const showLessBtn = document.querySelector(".show-less");
let visibleProjects = 3;

function updateVisibleProjects() {
  const activeFilter =
    document.querySelector(".filter-btn.active").dataset.filter;
  const filteredProjects = Array.from(projectCards).filter(
    (card) => activeFilter === "all" || card.dataset.category === activeFilter
  );

  filteredProjects.forEach((project, index) => {
    project.style.display = index < visibleProjects ? "block" : "none";
  });

  showMoreBtn.style.display =
    visibleProjects < filteredProjects.length ? "block" : "none";
  showLessBtn.style.display =
    visibleProjects >= filteredProjects.length && filteredProjects.length > 3
      ? "block"
      : "none";
}

showMoreBtn.addEventListener("click", () => {
  visibleProjects = projectCards.length; // Show all on click
  updateVisibleProjects();
});
showLessBtn.addEventListener("click", () => {
  visibleProjects = 3;
  updateVisibleProjects();
  window.scrollTo({
    top: document.querySelector(".projects-grid").offsetTop - 100,
    behavior: "smooth",
  });
});

// Update on filter change
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    visibleProjects = 3;
    updateVisibleProjects();
  });
});

// projects
updateVisibleProjects();
