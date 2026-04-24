// == 1. SAKRIJ LOADER KADA SE STRANICA UCITA ==
window.addEventListener("load", function () {
  setTimeout(() => {
    const loader = document.getElementById("loader-overlay");
    if (loader) {
      loader.classList.add("hidden");
    }
  }, 1000); // loader ostaje vidljiv bar 1 sekundu
});

// == 2. POSTAVI TRENUTNU GODINU U FOOTER ==
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // == 3. OBSERVE SECTIONS ZA SCROLL ANIMACIJU ==
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

  // == 4. VALIDACIJA FORME KONTAKTA ==
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Resetuj poruke
      clearValidationMessages();

      let isValid = true;
      const requiredFields = contactForm.querySelectorAll("[required]");
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          showError(field, `${getFieldLabel(field)} je obavezno.`);
          isValid = false;
        }
      });

      const emailField = contactForm.querySelector("#email");
      if (emailField && !validateEmail(emailField.value)) {
        showError(emailField, "Unesite validnu email adresu.");
        isValid = false;
      }

      if (isValid) {
        alert("Poruka je uspešno poslata!");
        contactForm.reset();
      }
    });
  }

  function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.innerText.replace("*", "").trim() : field.name;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
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

  function clearValidationMessages() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(el => el.remove());

    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach(inp => inp.style.borderColor = "");
  }
});
