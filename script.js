
document.addEventListener("DOMContentLoaded", () => {

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );
      });
    });
  }


  // Profile photograph
  const profilePhoto = document.getElementById("profile-photo");
  const photoPlaceholder = document.getElementById("photo-placeholder");

  if (profilePhoto && photoPlaceholder) {
    function showPlaceholder() {
      profilePhoto.style.display = "none";
      photoPlaceholder.style.display = "flex";
    }

    profilePhoto.addEventListener("error", showPlaceholder);

    if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
      showPlaceholder();
    }
  }


  // Automatic copyright year
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});




/* ==========================================
   PAGE 4 — PROJECT FILTERING
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const filterButtons =
    document.querySelectorAll(".project-filter");

  const projectCards =
    document.querySelectorAll(".project-card");

  const projectCount =
    document.getElementById("project-count");

  if (!filterButtons.length || !projectCards.length) {
    return;
  }

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const selectedFilter = button.dataset.filter;
      let visibleCount = 0;

      // Update selected button
      filterButtons.forEach(filterButton => {
        const selected = filterButton === button;

        filterButton.classList.toggle("active", selected);
        filterButton.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });

      // Filter cards
      projectCards.forEach(card => {

        const categories =
          (card.dataset.category || "").split(" ");

        const show =
          selectedFilter === "all" ||
          categories.includes(selectedFilter);

        card.hidden = !show;

        if (show) {
          visibleCount++;
        }

      });

      // Update project count
      if (projectCount) {
        projectCount.textContent =
          `Showing ${visibleCount} ` +
          (visibleCount === 1 ? "project" : "projects");
      }

    });

  });

});



/* ==========================================
   PAGE 7 — CONTACT FORM
   Opens visitor's email application
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm =
    document.getElementById("portfolio-contact-form");

  if (!contactForm) return;

  const feedback =
    document.getElementById("contact-form-feedback");

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const name =
      document.getElementById("contact-name").value.trim();

    const email =
      document.getElementById("contact-email").value.trim();

    const subject =
      document.getElementById("contact-subject").value;

    const message =
      document.getElementById("contact-message").value.trim();

    const emailSubject =
      encodeURIComponent(`[Portfolio] ${subject}`);

    const emailBody = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`
    );

    const mailtoLink =
      `mailto:khushal0519@gmail.com` +
      `?subject=${emailSubject}` +
      `&body=${emailBody}`;

    if (feedback) {
      feedback.textContent =
        "Opening your email application. " +
        "Please review and send the prepared email there.";
    }

    window.location.href = mailtoLink;
  });
});
