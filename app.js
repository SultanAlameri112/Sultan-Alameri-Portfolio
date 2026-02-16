// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Theme (Dark/Light) =====
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");

function updateThemeIcon() {
  themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}
updateThemeIcon();

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
});
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.style.display = "none"));

// ===== Reveal on scroll =====
const items = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("show"); });
}, { threshold: 0.12 });
items.forEach(el => io.observe(el));

// ===== i18n (EN/AR) =====
const langBtn = document.getElementById("langBtn");
const root = document.documentElement;

const dict = {
  en: {
    brand: "YourName",
    nav_home: "Home",
    nav_projects: "Projects",
    nav_cv: "CV",
    nav_contact: "Contact",
    hello: "Hello, I’m",
    name: "Your Name",
    role: "UI/UX & Front-End",
    subtitle: "I design clean interfaces and build fast, modern websites.",
    about_title: "About",
    about_text: "Short bio goes here. Focus on what you do, your style, and the value you bring.",
    prog_langs: "Programming Languages",
    skills: "Skills",
    contact_me: "Contact Me",
    phone_btn: "Phone",
    cv_btn: "View CV",
    projects_title: "My Work",
    proj_desc: "Short description of the project and your role.",
    details: "Details",
    live: "Live/Repo",
    cv_title: "CV",
    cv_hint: "Put your CV link here (PDF).",
    download_cv: " CV",
    contact_title: "Contact",
    lets_work: "Let’s work together",
    contact_text: "Send me a message and I’ll get back to you.",
    quick_msg: "Quick Message",
    send_btn: "Send (UI)",
    form_hint: "We can connect this to Formspree/EmailJS later.",
    ph_name: "Your name",
    ph_email: "Your email",
    ph_msg: "Write your message..."
  },
  ar: {
    brand: "اسمك",
    nav_home: "الرئيسية",
    nav_projects: "مشاريعي",
    nav_cv: "السيرة",
    nav_contact: "تواصل",
    hello: "أهلًا، أنا",
    name: "اسمك",
    role: "واجهات UI/UX وتطوير ويب",
    subtitle: "أصمم واجهات نظيفة وأبني مواقع سريعة وحديثة.",
    about_title: "نبذة عني",
    about_text: "اكتب نبذة قصيرة هنا: مين أنت، وش تسوي، وإيش يميز أسلوبك.",
    prog_langs: "لغات البرمجة",
    skills: "المهارات",
    contact_me: "تواصل معي",
    phone_btn: "اتصال",
    cv_btn: "عرض السيرة",
    projects_title: "أعمالي",
    proj_desc: "وصف قصير للمشروع ودورك فيه.",
    details: "التفاصيل",
    live: "تجربة/المصدر",
    cv_title: "السيرة الذاتية",
    cv_hint: "ضع رابط ملف السيرة PDF هنا.",
    download_cv: "تحميل السيرة",
    contact_title: "التواصل",
    lets_work: "خلّنا نشتغل سوا",
    contact_text: "ارسل رسالة وبرجع لك قريب.",
    quick_msg: "رسالة سريعة",
    send_btn: "إرسال (واجهة فقط)",
    form_hint: "نقدر نربطه بـ Formspree/EmailJS لاحقًا.",
    ph_name: "اسمك",
    ph_email: "إيميلك",
    ph_msg: "اكتب رسالتك..."
  }
};

function applyLang(lang){
  root.setAttribute("data-lang", lang);
  root.lang = (lang === "ar") ? "ar" : "en";
  root.dir = (lang === "ar") ? "rtl" : "ltr";
  langBtn.textContent = (lang === "ar") ? "EN" : "AR";

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (dict[lang][key]) el.textContent = dict[lang][key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[lang][key]) el.setAttribute("placeholder", dict[lang][key]);
  });

  localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang") || "en";
applyLang(savedLang);

langBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-lang") || "en";
  applyLang(current === "en" ? "ar" : "en");
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quickForm");
  const statusEl = document.getElementById("formStatus");

  if (!form || !statusEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // يمنع التحويل لصفحة ثانية

    statusEl.textContent = "Sending...";
    statusEl.style.color = "#aaa";

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (res.ok) {
        statusEl.textContent = "✅ Message sent successfully!";
        statusEl.style.color = "#1bfd9c";
        form.reset();
      } else {
        statusEl.textContent = "❌ Failed to send. Try again.";
        statusEl.style.color = "#ff4d6d";
      }
    } catch (err) {
      statusEl.textContent = "❌ Network error. Try again.";
      statusEl.style.color = "#ff4d6d";
    }
  });
});
