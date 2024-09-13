gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const burger = document.querySelector(".burger");
const headerList = document.querySelector(".navigation-list");
const modal = document.querySelector(".modalWindow");
const modalForm = document.querySelector(".modalWindow-form");
const modalClose = document.querySelector(".modalWindow__close");
const sections = document.querySelectorAll("section");
const modalWindowContent = document.querySelector(".modalWindow__content");
let wasApplSent = false;

function setDarkSections() {
  sections.forEach((el) => {
    el.classList.add("darkMode");
  });
}

function removeDarkSections() {
  sections.forEach((el) => {
    el.classList.remove("darkMode");
  });
}

document.addEventListener("click", function (e) {
  if (
    !headerList.contains(e.target) &&
    !burger.contains(e.target) &&
    !modal.classList.contains("modalWindow-active")
  ) {
    headerList.classList.remove("left");
    burger.classList.remove("active");
    removeDarkSections();
  }

  if (e.target === modal || e.target === modalClose) {
    modal.classList.remove("modalWindow-active");
    removeDarkSections();
  }

  if (wasApplSent) {
    setTimeout(() => {
      modalWindowContent.innerHTML = `<h2>Sign up<br />for training</h2>
            <form action="#" id="form" class="modalWindow-form">
              <div class="modalWindow__close"></div>
              <div class="modalWindow__item modalWindow__select">
                <select id="program" name="program">
                  <option value="personalized">Personalized training</option>
                  <option value="group">Group classes</option>
                  <option value="online">Online training</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  width="512.000000pt"
                  height="512.000000pt"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M2315 5109 c-800 -83 -1501 -518 -1927 -1196 -604 -961 -490 -2237 274 -3068 425 -462 951 -737 1583 -827 119 -17 512 -16 635 1 622 86 1148 360 1572 820 349 378 572 861 650 1406 17 118 17 512 0 630 -59 416 -191 769 -410 1099 -92 140 -185 254 -315 385 -399 404 -893 653 -1462 737 -123 18 -478 26 -600 13z m-80 -1468 c52 -32 1119 -971 1139 -1002 24 -39 24 -119 0 -158 -20 -31 -1087 -970 -1139 -1002 -41 -25 -120 -25 -162 1 -82 50 -102 170 -40 239 12 13 230 205 485 428 254 223 462 409 462 413 0 4 -210 192 -467 417 -258 226 -475 419 -485 429 -40 47 -42 131 -3 191 40 61 147 83 210 44z"
                    />
                  </g>
                </svg>
              </div>

              <div class="modalWindow__item">
                <input
                  type="text"
                  name="name"
                  class="modalWindow__input"
                  id="formName"
                  placeholder="YOUR NAME"
                  required
                />
              </div>

              <div class="modalWindow__item">
                <input
                  type="tel"
                  name="phone"
                  class="modalWindow__input"
                  id="formPhone"
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div class="button__wrapper">
                <button class="button mainButton">Sign up</button>
              </div>
            </form>`;
      addMainButtonListener();
      wasApplSent = false;
    }, 600);
  }
});

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  headerList.classList.toggle("left");

  if (!modal.classList.contains("modalWindow-active")) {
    sections.forEach((el) => {
      el.classList.toggle("darkMode");
    });
  }
});

const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.add("modalWindow-active");
    setDarkSections();
  });
});

function validatePhoneNumber(input) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(input);
}

const mainButton = document.querySelector(".mainButton");
const phone = modalForm.phone;

const loader = document.querySelector(".loader");
mainButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validatePhoneNumber(phone.value)) {
    return (phone.style.outline = "3px #c91d1d solid");
  }
  phone.style.outline = "";
  modalWindowContent.classList.add("none");
  modalWindowContent.addEventListener("transitionend", success);
});

function success() {
  modalWindowContent.style.display = "none";
  loader.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
    modalWindowContent.classList.remove("none");
    modalWindowContent.innerHTML = "<p>Application successfully sent</p>";
    modalWindowContent.style.display = "block";
    wasApplSent = true;
  }, 1500);
  modalWindowContent.removeEventListener("transitionend", success);
}

function addMainButtonListener() {
  const mainButton = document.querySelector(".mainButton");
  const phone = modalForm.phone;

  if (mainButton) {
    mainButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (!validatePhoneNumber(phone.value)) {
        return (phone.style.outline = "3px #c91d1d solid");
      }
      phone.style.outline = "";
      modalWindowContent.classList.add("none");
      modalWindowContent.addEventListener("transitionend", success);
    });
  }
}

//parallax
const boxes = document.querySelectorAll(".parallax");

let mouseX = 0,
  mouseY = 0;
let boxX = 0,
  boxY = 0;
const speed = 0.05;
const maxOffset = 50;

window.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  mouseX = e.clientX - centerX;
  mouseY = e.clientY - centerY;
});

function animate() {
  boxX += (mouseX * 0.05 - boxX) * speed;
  boxY += (mouseY * 0.05 - boxY) * speed;

  boxX = Math.max(-maxOffset, Math.min(boxX, maxOffset));
  boxY = Math.max(-maxOffset, Math.min(boxY, maxOffset));

  boxes.forEach((box) => {
    box.style.transform = `translate3d(${-boxX / box.dataset.depth}px, ${
      -boxY / box.dataset.depth
    }px,0)`;
  });
  requestAnimationFrame(animate);
}

//gsap animations

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});


const nav = document.querySelectorAll(".navigation-list__item");
nav.forEach((el) => {
  el.addEventListener("click", () => {
    headerList.classList.remove("left");
    burger.classList.remove("active");
    removeDarkSections();
    gsap.to(window, { duration: 0.7, scrollTo: `.${el.dataset.section}` });
  });
});


function gsapAnimate(className, duration, delay, stagger, callback) {
  gsap.to(className, {
    opacity: 1,
    y: 0,
    x: 0,
    duration: duration,
    delay: delay,
    stagger: stagger,
    ease: "power1.out",
    onComplete: callback,
  });
}

function signsAnimation() {
  gsap.to(".sign", {
    opacity: 1,
    y: 0,
    x: 0,
    duration: 1,
    delay: 0.1,
    stagger: 0.2,
    ease: "power1.out",
    onComplete: animate,
  });
}

gsapAnimate(".first__man", 1, 0.2, null, signsAnimation);

const titles = gsap.utils.toArray(".title");

titles.forEach((block) => {
  gsap.to(block, {
    duration: 1,
    opacity: 1,
    y: 0,

    scrollTrigger: {
      trigger: block.parentNode,
      start: "top 50%",
      toggleActions: "play none none none",
    },
  });
});

const aboutItem = gsap.utils.toArray(".about__item");
aboutItem.forEach((block) => {
  gsap.to(block, {
    duration: 1,
    opacity: 1,
    delay: 0.1,
    y: 0,
    x: 0,
    rotate: 0,
    scrollTrigger: {
      trigger: block,
      start: "top 30%",
      toggleActions: "play none none none",
    },
  });
});

const achievementsItem = gsap.utils.toArray(".achievements-list_item");
achievementsItem.forEach((block) => {
  gsap.to(block, {
    duration: 0.6,
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    scrollTrigger: {
      trigger: block,
      start: "top 60%",
      toggleActions: "play none none none",
    },
  });
});

gsap.to(".dumbbell", {
  opacity: 1,
  delay: 0.1,
  rotate: 1,
  ease: "power3.out",
  scrollTrigger: {
    start: `top 60%`,
    scrub: 3,
    trigger: ".title-achievements",
  },
});

let comments = gsap.utils.toArray(".reviews-list__item");

gsap.to(comments, {
  xPercent: -100 * comments.length,
  ease: "none",
  opacity: 1,

  scrollTrigger: {
    trigger: ".reviews",
    pin: true,
    scrub: 2,
    start: "top 30%",
    end: () => "+=" + document.querySelector(".reviews-list").offsetWidth * 2,
  },
});

gsap.to(".reviews-list", {
  opacity: 1,
  duration: 1,
  scrollTrigger: {
    trigger: ".reviews-list",
    start: "top 50%",
  },
});

let programs = gsap.utils.toArray(".programs__item");


programs.forEach((block) => {
  gsap.to(block, {
    opacity: 1,
    scale: 1,
    x: 0,
    stagger: 0.15,
    duration: 1,
    delay: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      start: `top 69%`,
      trigger: block,
      toggleActions: "play none none none",
    },
  });
});

gsap.to(".programs", {
  duration: 1,
  opacity: 1,
  y: 0,

  scrollTrigger: {
    trigger: ".programs",
    start: "top 50%",
    toggleActions: "play none none none",
  },
});

gsap.to(".footer", {
  duration: 1,
  opacity: 1,
  y: 0,

  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
    toggleActions: "play none none none",
  },
});
