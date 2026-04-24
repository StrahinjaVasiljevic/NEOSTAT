// == 1. SAKRIJ LOADER NAKON MINIMUM 1 SEKUNDE ==
window.addEventListener("load", function () {
  setTimeout(() => {
    const loader = document.getElementById("loader-overlay");
    if (loader) {
      loader.classList.add("hidden");
    }
  }, 1000); // Uvek čeka bar 1 sekundu
});

document.addEventListener("DOMContentLoaded", () => {

  // == 2. POSTAVI TRENUTNU GODINU U FOOTER ==
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // == 3. SCROLL ANIMACIJA SEKCIJA (INTERSECTION OBSERVER) ==
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

  // == 4. VALIDACIJA KONTAKT FORME SA AJAX SLANJEM ==
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      // Reset poruka
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
        // DISABLE SUBMIT BUTTON DURING SUBMISSION
        const submitButton = contactForm.querySelector("button[type='submit']");
        const originalText = submitButton.textContent;
        submitButton.textContent = "Slanje...";
        submitButton.disabled = true;

        try {
          const formData = new FormData(contactForm);
          const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json"
            }
          });

          if (response.ok) {
            alert("Uspešno poslata poruka!");
            contactForm.reset();
          } else {
            alert("Došlo je do greške pri slanju. Pokušajte ponovo kasnije.");
          }
        } catch (error) {
          console.error("Greška:", error);
          alert("Dogodila se mrežna greška. Proverite vašu konekciju.");
        } finally {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
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

  // == 5. TOGGLE DARK / LIGHT MODE WITH LOCALSTORAGE ==
  const themeButton = document.getElementById("themeToggleButton");
  const storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeIcon(storedTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeButton) {
      themeButton.textContent = theme === "dark" ? "☀️" : "🌙"; // Sunce za light, mesec za dark
    }
  }

  // == 6. HAMBURGER MENI ZA MOBILNE ==
  const mobileMenu = document.getElementById("mobile-menu");
  const navList = document.getElementById("topNav");

  if (mobileMenu && navList) {
    mobileMenu.addEventListener("click", () => {
      navList.classList.toggle("active");
      mobileMenu.classList.toggle("is-active"); // Optional rotation effect
    });

    // Close menu if clicked outside
    document.addEventListener("click", (event) => {
      if (!navList.contains(event.target) && !mobileMenu.contains(event.target)) {
        navList.classList.remove("active");
        mobileMenu.classList.remove("is-active");
      }
    });
  }
});
