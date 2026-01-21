const observers = document.querySelectorAll(
  ".section, .project-card, .timeline-item, .skill-block"
);

const reveal = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal", "visible");
    }
  });
};

const observer = new IntersectionObserver(reveal, {
  threshold: 0.2,
});

observers.forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});

const modal = document.querySelector("#contactModal");
const modalTriggers = document.querySelectorAll(".js-open-contact");
const modalClosers = document.querySelectorAll("[data-close]");

const openModal = () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openModal);
});

modalClosers.forEach((closer) => {
  closer.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

modal.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const params = {
    name: data.get("name"),
    email: data.get("email"),
    topic: data.get("topic") || "Portfolio inquiry",
    message: data.get("message"),
  };

  if (!window.emailjs) {
    alert("Email service not available. Please try again later.");
    return;
  }

  window.emailjs
    .send("service_796215r", "template_5njk7sq", params)
    .then(() => {
      form.reset();
      closeModal();
      alert("Message sent. Thanks for reaching out!");
    })
    .catch(() => {
      alert("Something went wrong. Please email me directly.");
    });
});
