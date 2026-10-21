(() => {
  "use strict";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const phone = "94712941115";
  let language = "en";

  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  menuToggle?.addEventListener("click", () => {
    const opened = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(opened));
    mainNav.classList.toggle("open", opened);
    document.body.classList.toggle("menu-open", opened);
  });
  $$("#mainNav a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));

  const languageToggle = $("#languageToggle");
  languageToggle?.addEventListener("click", () => {
    language = language === "en" ? "si" : "en";
    document.documentElement.lang = language === "si" ? "si" : "en";
    $$("[data-si][data-en]").forEach(el => {
      const value = el.dataset[language];
      if (value !== undefined) el.innerHTML = value;
    });
    languageToggle.textContent = language === "en" ? "සිං" : "EN";
    // Keep form-select options and accessible labels in sync.
    $$("option[data-si][data-en]").forEach(option => option.textContent = option.dataset[language]);
    showToast(language === "si" ? "සිංහල භාෂාව තෝරා ඇත" : "English selected");
  });

  const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 }) : null;
  $$(".reveal").forEach(el => observer ? observer.observe(el) : el.classList.add("is-visible"));

  const scrollProgress = $("#scrollProgress");
  const backToTop = $("#backToTop");
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    backToTop.classList.toggle("visible", window.scrollY > 650);
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $("#year").textContent = new Date().getFullYear();

  const toast = $("#toast");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  const serviceSelect = $("#serviceSelect");
  const quantity = $("#quantity");
  const quantityValue = $("#quantityValue");
  const estimateValue = $("#estimateValue");
  const money = amount => new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR", maximumFractionDigits: 0 }).format(amount).replace("LKR", "LKR");
  function updateEstimate() {
    const qty = Number(quantity.value || 1);
    quantityValue.value = String(qty);
    quantityValue.textContent = String(qty);
    estimateValue.textContent = money(Number(serviceSelect.value) * qty);
  }
  serviceSelect?.addEventListener("change", updateEstimate);
  quantity?.addEventListener("input", updateEstimate);
  updateEstimate();

  $("#estimateOrder")?.addEventListener("click", () => {
    const service = serviceSelect.options[serviceSelect.selectedIndex].textContent;
    const qty = quantity.value;
    const total = estimateValue.textContent;
    const message = `Hello ALFA DESIGNS! I would like to ask about this estimate:\nService: ${service}\nQuantity: ${qty}\nStarting estimate: ${total}\nPlease confirm the final price.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  $$(".order-package").forEach(button => button.addEventListener("click", () => {
    const packageName = button.dataset.package;
    const messageField = $("#customerMessage");
    const serviceField = $("#customerService");
    if (messageField) messageField.value = `I'm interested in the ${packageName} package. Please share the details.`;
    if (serviceField) serviceField.value = packageName === "Digital Launch" ? "Website Design" : packageName === "Creative Start" ? "Logo Design" : "Graphic Design";
  }));

  $("#contactForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "");
    const budget = String(data.get("budget") || "");
    const details = String(data.get("message") || "").trim();
    const message = `Hello ALFA DESIGNS! I'd like to make an inquiry.\n\nName: ${name}\nEmail: ${email || "Not provided"}\nService: ${service}\nBudget: ${budget}\nProject details: ${details}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  // Small pointer glow only on devices with a fine pointer.
  if (window.matchMedia("(pointer:fine)").matches) {
    let lastMove = 0;
    document.addEventListener("pointermove", event => {
      const now = performance.now();
      if (now - lastMove < 35) return;
      lastMove = now;
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    }, { passive: true });
  }

  // Local scripted assistant demo. Connect a secure backend for real AI responses.
  const assistantLauncher = $("#assistantLauncher");
  const assistantPanel = $("#assistantPanel");
  const assistantClose = $("#assistantClose");
  const assistantMessages = $("#assistantMessages");
  const assistantForm = $("#assistantForm");
  const assistantInput = $("#assistantInput");
  function toggleAssistant(open) {
    if (!assistantPanel || !assistantLauncher) return;
    assistantPanel.hidden = !open;
    assistantLauncher.setAttribute("aria-expanded", String(open));
    if (open) setTimeout(() => assistantInput?.focus(), 100);
  }
  assistantLauncher?.addEventListener("click", () => toggleAssistant(assistantPanel.hidden));
  assistantClose?.addEventListener("click", () => toggleAssistant(false));
  function appendAssistantMessage(text, who) {
    const bubble = document.createElement("div");
    bubble.className = `assistant-bubble ${who === "user" ? "assistant-user" : "assistant-bot"}`;
    bubble.textContent = text;
    assistantMessages.appendChild(bubble);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }
  function getAssistantReply(question) {
    const q = question.toLowerCase();
    if (q.includes("price") || q.includes("cost") || q.includes("මිල") || q.includes("ගාස්තු")) {
      return "Starting prices: Website Design from LKR 10,000; Logo Design from LKR 150; CV Design LKR 250; AI Photo Editing from LKR 100. Graphic Design is quoted by the design scope. Final prices are confirmed directly.";
    }
    if (q.includes("service") || q.includes("offer") || q.includes("සේවා") || q.includes("මොනවද")) {
      return "ALFA DESIGNS offers Website Design, Graphic Design, Logo Design, CV Design, AI Photo Editing and other digital services. Tell us what you need and we'll guide you.";
    }
    if (q.includes("order") || q.includes("contact") || q.includes("buy") || q.includes("ඕඩර්") || q.includes("අමත")) {
      return "You can use the contact form or WhatsApp button. Phone/WhatsApp: 071 294 1115. Email: yehanpabasara69@gmail.com.";
    }
    if (q.includes("website") || q.includes("web")) {
      return "Website Design starts from LKR 10,000. The final quote depends on page count, features, content and integrations. Use the contact form to describe your project.";
    }
    if (q.includes("logo")) return "Logo Design starts from LKR 150. Please share your brand name, preferred style and any colour ideas when you contact us.";
    if (q.includes("cv")) return "CV Design is listed at LKR 250. Contact us to confirm the information and delivery details before ordering.";
    if (q.includes("ai") || q.includes("photo") || q.includes("image")) return "AI Photo Editing starts from LKR 100. The final price depends on the edit and complexity. Please contact us with your request.";
    if (q.includes("hello") || q.includes("hi") || q.includes("ආයුබෝවන්")) return "Hello! Welcome to ALFA DESIGNS. Ask about our services, starting prices or how to place an inquiry.";
    return "Thanks for your question! This assistant is a simple website demo and can't access live order records. Please contact ALFA DESIGNS on WhatsApp at 071 294 1115 for a confirmed answer.";
  }
  function askAssistant(question) {
    const cleaned = question.trim();
    if (!cleaned) return;
    appendAssistantMessage(cleaned, "user");
    appendAssistantMessage(getAssistantReply(cleaned), "bot");
  }
  assistantForm?.addEventListener("submit", event => {
    event.preventDefault();
    askAssistant(assistantInput.value);
    assistantInput.value = "";
  });
  $$("#assistantQuick button").forEach(button => button.addEventListener("click", () => askAssistant(button.dataset.question || button.textContent)));

})();