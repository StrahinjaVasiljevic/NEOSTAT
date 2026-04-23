// == 1. DODAVANJE DINAMIČKE GODINE U FOOTER ==
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // == 2. VALIDACIJA KONTAKT FORME ==
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      let isValid = true;

      // Reset poruka
      clearMessages();

      // Validacija polja
      const requiredFields = contactForm.querySelectorAll("[required]");
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          showError(field, `${getFieldLabel(field)} je obavezno.`);
          isValid = false;
        } else {
          showSuccess(field);
        }
      });

      if (isValid) {
        // Simulacija slanja forme (ovde ide API integracija)
        alert("Poruka je uspešno poslata!");
        contactForm.reset(); // Resetovanje forme
      }
    });
  }

  function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.innerText.replace("*", "").trim() : field.name;
  }

  function showError(inputElement, message) {
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.style.color = "#ff4d4d";
    errorMsg.style.fontSize = "0.85rem";
    errorMsg.style.marginTop = "4px";
    errorMsg.innerText = message;
    inputElement.parentNode.insertBefore(errorMsg, inputElement.nextSibling);
    inputElement.style.borderColor = "#ff4d4d";
  }

  function showSuccess(inputElement) {
    inputElement.style.borderColor = "#00f7ff";
  }

  function clearMessages() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(el => el.remove());
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach(inp => inp.style.borderColor = "");
  }

  // == 3. INTERSECTION OBSERVER ZA SCROLL EFECTE ==
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  };

  const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach(section => {
    section.classList.add("fade-in-section");
    sectionObserver.observe(section);
  });
});
