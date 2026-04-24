// Pokreni sve funkcije tek kada se DOM učita
document.addEventListener("DOMContentLoaded", function () {

  // === 1. Prikaz trenutne godine u footeru ===
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // === 2. Validacija forme - handleSubmit ===
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Onemogući default slanje forme
    
    // Resetuj prethodne greške
    clearErrors();

    let isValid = true;

    // Provera svih obaveznih polja
    const requiredFields = contactForm.querySelectorAll("[required]");
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        showError(field, `${getFieldName(field)} je obavezno.`);
      }
    });

    // Specifična validacija e-maila
    const emailField = document.getElementById("email");
    if (emailField && !isValidEmail(emailField.value)) {
      isValid = false;
      showError(emailField, "Molimo unesite validnu e-mail adresu.");
    }

    // Ako je sve OK
    if (isValid) {
      alert("Hvala na poruci! Uskoro ćemo Vas kontaktirati.");
      contactForm.reset(); // Resetuj formu
    }
  }

  // Helper za ime polja
  function getFieldName(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.innerText.replace("*", "").trim() : field.name || "Polje";
  }

  // Prosta validacija e-maila
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Prikaz greške
  function showError(input, message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "#ff4d4d";
    errorDiv.style.fontSize = "0.85rem";
    errorDiv.style.marginTop = "4px";
    errorDiv.innerText = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
    input.style.borderColor = "#ff4d4d";
  }

  // Brisanje svih poruka greške
  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((err) => err.remove());

    const fields = contactForm.querySelectorAll("input, textarea, select");
    fields.forEach((field) => {
      field.style.borderColor = "";
    });
  }

  // === 3. E-mail validacija na Blur event ===
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (emailInput.value && !isValidEmail(emailInput.value)) {
        alert("Neispravan format e-mail adrese.");
      }
    });
  }

  // === 4. Intersection Observer za Fade-In sekcije ===
  const sections = document.querySelectorAll(".fade-in-section");

  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});
