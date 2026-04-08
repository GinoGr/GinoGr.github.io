document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".mobile-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("open");
      menuToggle.classList.toggle("is-open");
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    });

    // Close menu when clicking a link
    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Reset menu on resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
});


// ===== MOBILE MENU =====
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

// ===== REVIEWS DATA (embedded — no fetch needed) =====
const REVIEWS = [
  {
    "platform": "Airbnb",
    "author": "Meghan",
    "title": "What an amazing stay!!",
    "text": "A bit out in the country, yet still very close and to Centralia. The home was absolutely beautiful and could not have asked for more thoughtful hosts. The beds and bedding were very comfortable. The kitchen was well stocked and even had drinks and goodies waiting for us when we arrived. The property was absolutely gorgeous and we enjoyed sitting on the back deck watching the deer in the evening. Ken was very responsive with any questions we had. The next time we visit the area, we hope to stay again. 100% recommend",
    "date": "2026-03-10"
  },
  {
    "platform": "Vrbo",
    "author": "Samantha B.",
    "title": "10/10 Excellent",
    "text": "All aspects of our stay were absolutely perfect and seamless. The property is stunning, and the hosts were more than accommodating of what we needed for our stay. The whole place was clean, comfortable, and welcoming. Would most definitely stay here again!",
    "date": "2026-03-22"
  },
  {
    "platform": "Vrbo",
    "author": "Shelli N.",
    "title": "10/10 Excellent",
    "text": "Host was amazing Home was beautiful, well kept, and very welcoming The bottle of wine and other things left for us to enjoy were great as well",
    "date": "2026-02-22"
  },
  {
    "platform": "Vrbo",
    "author": "Randilynn K.",
    "title": "10/10 Excellent",
    "text": "This was a beautiful house. The host showed us amazing hospitality and the check in/out process was the easiest I have ever experienced. I would highly recommend staying here. We hope to come back soon.",
    "date": "2026-03-22"
  },
  {
    "platform": "Vrbo",
    "author": "Dolores C.",
    "title": "10/10 Excellent",
    "text": "Our stay was wonderful. We had a family of five adults and all loved it. The house and location are beautiful. The beds and couch were very comfy. Deer came and visited every morning and evening. Great coffee bar and kitchen well stocked. The host is absolutely amazing and one of the best I have encountered. We would stay here again. I highly recommend.",
    "date": "2026-03-22"
  },
  {
    "platform": "Vrbo",
    "author": "Oren J.",
    "title": "10/10 Excellent",
    "text": "The team really enjoyed their stay! Great host! Nice place to stay close by to NW Hub. Will use this location in the future.",
    "date": "2026-03-22"
  }
];

const MAX_REVIEW_TEXT_LENGTH = 220;

function createReviewTextNode(text) {
  const wrapper = document.createElement("div");
  wrapper.className = "review-text-wrapper";

  const paragraph = document.createElement("p");
  paragraph.className = "review-text";

  const isLong = text.length > MAX_REVIEW_TEXT_LENGTH;
  const shortText = `${text.slice(0, MAX_REVIEW_TEXT_LENGTH).trimEnd()}…`;

  paragraph.textContent = isLong ? shortText : text;
  wrapper.appendChild(paragraph);

  if (isLong) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "review-toggle";
    button.textContent = "Read more";
    button.dataset.expanded = "false";

    button.addEventListener("click", () => {
      const expanded = button.dataset.expanded === "true";
      if (expanded) {
        paragraph.textContent = shortText;
        button.textContent = "Read more";
        button.dataset.expanded = "false";
      } else {
        paragraph.textContent = text;
        button.textContent = "Show less";
        button.dataset.expanded = "true";
      }
    });

    wrapper.appendChild(button);
  }

  return wrapper;
}

function formatReviewDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

// ===== RENDER REVIEWS =====
function loadReviews() {
  const container = document.getElementById("reviewsTrack");
  const summary = document.getElementById("reviewsSummary");

  if (!container) return;

  container.innerHTML = "";

  let airbnbCount = 0;
  let vrboCount = 0;

  REVIEWS.forEach((review) => {
    if (review.platform === "Airbnb") airbnbCount++;
    if (review.platform === "Vrbo") vrboCount++;

    const card = document.createElement("div");
    card.className = "card review-card";

    card.innerHTML = `
      <div class="review-platform">${review.platform}</div>
      <h3>"${review.title}"</h3>
    `;
    card.appendChild(createReviewTextNode(review.text));
    card.insertAdjacentHTML(
      "beforeend",
      `
      <div class="review-footer">
        <span>— ${review.author}</span>
        <span>${formatReviewDate(review.date)}</span>
      </div>
    `
    );

    container.appendChild(card);
  });

  if (summary) {
    summary.innerHTML = `
      <span class="review-pill">${airbnbCount} Airbnb review${airbnbCount !== 1 ? "s" : ""}</span>
      <span class="review-pill">${vrboCount} Vrbo review${vrboCount !== 1 ? "s" : ""}</span>
    `;
  }
}

loadReviews();

// ===== HORIZONTAL SCROLL BUTTONS =====
const scrollContainer = document.getElementById("reviewsTrack");
const scrollLeftBtn = document.getElementById("reviewsPrev");
const scrollRightBtn = document.getElementById("reviewsNext");

if (scrollLeftBtn && scrollRightBtn && scrollContainer) {
  scrollLeftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -320, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 320, behavior: "smooth" });
  });
}