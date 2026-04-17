document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("header");
  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");
  const themeButton = document.getElementById("themeButton");

  const contactForm = document.getElementById("contactForm");
  const fullNameInput = document.getElementById("fullName");
  const serviceSelect = document.getElementById("service");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const serviceError = document.getElementById("serviceError");
  const messageError = document.getElementById("messageError");
  const charCounter = document.getElementById("charCounter");
  const formStatus = document.getElementById("formStatus");

  const navLinks = document.querySelectorAll(".nav-link");
  const serviceButtons = document.querySelectorAll(".service-toggle");
  const sections = ["home", "services", "about", "contact"];

  function setTheme(mode) {
    const isDark = mode === "dark";
    body.classList.toggle("dark-theme", isDark);
    themeButton.textContent = isDark ? "Tema claro" : "Tema oscuro";
    themeButton.setAttribute("aria-pressed", String(isDark));
    localStorage.setItem("site-theme", mode);
  }

  const savedTheme = localStorage.getItem("site-theme") || "light";
  setTheme(savedTheme);

  themeButton.addEventListener("click", () => {
    const newMode = body.classList.contains("dark-theme") ? "light" : "dark";
    setTheme(newMode);
  });

  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth" });

      if (mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".service-card");
      const detail = card.querySelector(".service-detail");
      const isHidden = detail.hasAttribute("hidden");

      if (isHidden) {
        detail.removeAttribute("hidden");
        card.classList.add("is-open");
        button.textContent = "Ocultar detalle";
        button.setAttribute("aria-expanded", "true");
      } else {
        detail.setAttribute("hidden", "hidden");
        card.classList.remove("is-open");
        button.textContent = "Ver detalle";
        button.setAttribute("aria-expanded", "false");
      }
    });
  });

  messageInput.addEventListener("input", () => {
    charCounter.textContent = `${messageInput.value.trim().length} caracteres`;
  });

  function clearFormMessages() {
    nameError.textContent = "";
    serviceError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";
  }

  function validateForm() {
    clearFormMessages();

    let isValid = true;
    const fullName = fullNameInput.value.trim();
    const selectedService = serviceSelect.value.trim();
    const message = messageInput.value.trim();

    if (fullName === "") {
      nameError.textContent = "Ingresa tu nombre completo.";
      isValid = false;
    } else if (fullName.length < 3) {
      nameError.textContent = "El nombre debe tener al menos 3 caracteres.";
      isValid = false;
    }

    if (selectedService === "") {
      serviceError.textContent = "Debes seleccionar un servicio.";
      isValid = false;
    }

    if (message === "") {
      messageError.textContent = "Escribe un mensaje para continuar.";
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent = "El mensaje debe tener al menos 10 caracteres.";
      isValid = false;
    }

    return isValid;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validateForm()) {
      formStatus.textContent = "Revisa los campos marcados antes de enviar.";
      return;
    }

    const formData = {
      fullName: fullNameInput.value.trim(),
      service: serviceSelect.value,
      message: messageInput.value.trim()
    };

    console.log("Formulario enviado:", formData);
    formStatus.textContent = "Formulario enviado correctamente. Revisa la consola del navegador.";

    contactForm.reset();
    charCounter.textContent = "0 caracteres";
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);

    let currentSection = "home";

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section && window.scrollY >= section.offsetTop - 140) {
        currentSection = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
  });
});
