<template>
  <ion-page class="guru-page">
    <!-- Header / Navbar -->
    <header class="toolbar">
      <div class="header-row container-row">
        <div class="left">
          <button class="menu-btn" @click="toggleMenu" aria-label="menu">
            ☰
          </button>
          <div class="logo">ॐ {{ $t("Gurudev Tiwari") }}</div>
        </div>
        <div class="action-btns right">
          <button class="btn-link lang-toggle" @click="toggleLang">
            {{ locale === "en" ? "हिंदी" : "EN" }}
          </button>
        </div>
      </div>
    </header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- Responsive side drawer for small screens -->
      <transition name="slide-fade">
        <div v-if="isMenuOpen" class="mobile-drawer">
          <div class="drawer-header">
            <button
              class="close-btn"
              @click="toggleMenu"
              aria-label="close menu"
            >
              ✕
            </button>
          </div>
          <nav>
            <a
              v-for="item in menu"
              :key="item.id"
              :href="`#${item.id}`"
              @click.prevent="onNav(item.id)"
            >
              <ion-icon :icon="item.icon" />
              <span>{{ item.title }}</span>
            </a>
          </nav>
        </div>
      </transition>

      <!-- Hero -->
      <section id="home" class="hero ionic-hero">
        <!-- Background Images -->
        <div
          v-for="(image, index) in backgroundImages"
          :key="index"
          class="hero-bg-image"
          :class="{ active: currentImageIndex === index }"
          :style="{ backgroundImage: `url(${image})` }"
        />

        <!-- Dark Overlay -->
        <div class="hero-overlay" />

        <div class="hero-inner">
          <div class="badge">✨ {{ $t("Presence") }}</div>
          <h1 class="hero-title">{{ heroTitle }}</h1>
          <p class="hero-sub">{{ heroSubtitle }}</p>
          <div class="hero-ctas">
            <ion-button
              size="large"
              class="primary"
              @click="scrollTo('contact')"
              >{{ ctaPrimary }}</ion-button
            >
            <ion-button
              size="large"
              fill="outline"
              @click="scrollTo('about')"
              >{{ ctaSecondary }}</ion-button
            >
          </div>
        </div>
      </section>

      <!-- About Card -->
      <section id="about" class="section container">
        <ion-card class="card-hero ion-no-margin">
          <ion-card-header>
            <ion-card-title>{{ aboutTitle }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>{{ aboutP1 }}</p>
            <p>{{ aboutP2 }}</p>
          </ion-card-content>
        </ion-card>
      </section>

      <!-- Daily Quotes as a Masonry-ish Grid of Ionic Cards -->
      <section class="section container">
        <div class="section-head">
          <div class="chip">{{ quotesChip }}</div>
          <h2>{{ quotesTitle }}</h2>
          <p class="muted">{{ quotesSubtitle }}</p>
        </div>

        <div class="quotes-grid">
          <ion-card
            v-for="(quote, i) in currentQuotes"
            :key="i"
            class="quote-card"
            :style="{ animationDelay: i * 60 + 'ms' }"
          >
            <ion-card-content>
              <div class="quote-mark">"</div>
              <p class="quote-text">{{ quote }}</p>
            </ion-card-content>
          </ion-card>
        </div>
      </section>

      <!-- Services with subtle hover animation -->
      <section id="services" class="section container">
        <div class="section-head">
          <div class="chip">{{ servicesChip }}</div>
          <h2>{{ servicesTitle }}</h2>
          <p class="muted">{{ servicesSubtitle }}</p>
        </div>

        <div class="services-grid">
          <ion-card
            v-for="(s, i) in currentServices"
            :key="i"
            class="service-card"
            @click="openService(s)"
            role="button"
          >
            <ion-card-content>
              <div class="service-emoji">🙏</div>
              <h3 class="service-title">{{ s }}</h3>
              <div class="service-underline" />
            </ion-card-content>
          </ion-card>
        </div>
      </section>

      <!-- Testimonials -->
      <section id="testimonials" class="section container">
        <h2 class="section-title">{{ testimonialsTitle }}</h2>
        <div class="testimonials">
          <ion-card
            v-for="(testimonial, i) in currentTestimonials"
            :key="i"
            class="test-card"
          >
            <ion-card-content>
              <p class="testimonial">"{{ testimonial }}"</p>
            </ion-card-content>
          </ion-card>
        </div>
      </section>

      <!-- Contact -->
      <section
        id="contact"
        class="section container contact-section"
        style="display: none"
      >
        <ion-card class="contact-card">
          <ion-card-header>
            <ion-card-title>{{ $t("Contact") }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              {{ emailLabel }}:
              <a href="mailto:gurudev@example.org">gurudev@example.org</a>
            </p>
            <p>
              {{ phoneLabel }}: <a href="tel:+919876543210">+91 98765 43210</a>
            </p>
            <p>{{ addressLabel }}: Ashram, Rishikesh, Uttarakhand</p>
            <div class="contact-actions">
              <ion-button @click="openMail()">{{ sendEmail }}</ion-button>
              <ion-button fill="outline" @click="openTel()">{{
                callLabel
              }}</ion-button>
            </div>
          </ion-card-content>
        </ion-card>
      </section>

      <!-- Footer -->
      <footer class="guru-footer">
        <div class="footer-container">
          <div class="footer-grid">
            <!-- About Column -->
            <div class="footer-col">
              <h3 class="footer-title">ॐ {{ $t("Gurudev Tiwari") }}</h3>
              <p class="footer-desc">
                {{
                  $t(
                    "Spiritual guidance for inner peace, wisdom, and self-realization through meditation and yoga."
                  )
                }}
              </p>
              <div class="footer-social">
                <a href="#" class="social-link" title="Facebook">f</a>
                <a href="#" class="social-link" title="Instagram">📷</a>
                <a href="#" class="social-link" title="YouTube">▶</a>
              </div>
            </div>

            <!-- Quick Links Column -->
            <div class="footer-col">
              <h4 class="footer-heading">{{ $t("Quick Links") }}</h4>
              <ul class="footer-links">
                <li>
                  <a href="#home" @click.prevent="scrollTo('home')">{{
                    $t("Home")
                  }}</a>
                </li>
                <li>
                  <a href="#about" @click.prevent="scrollTo('about')">{{
                    $t("About")
                  }}</a>
                </li>
                <li>
                  <a href="#services" @click.prevent="scrollTo('services')">{{
                    $t("Services")
                  }}</a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    @click.prevent="scrollTo('testimonials')"
                    >{{ $t("Testimonials") }}</a
                  >
                </li>
              </ul>
            </div>

            <!-- Contact Info Column -->
            <div class="footer-col">
              <h4 class="footer-heading">{{ $t("Contact Info") }}</h4>
              <ul class="footer-info">
                <li class="info-item">
                  <span class="info-icon">✉</span>
                  <a href="mailto:gurudev@example.org">gurudev@example.org</a>
                </li>
                <li class="info-item">
                  <span class="info-icon">📱</span>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </li>
                <li class="info-item">
                  <span class="info-icon">📍</span>
                  <span>Ashram, Rishikesh, Uttarakhand</span>
                </li>
              </ul>
            </div>

            <!-- Newsletter Column -->
            <div class="footer-col">
              <h4 class="footer-heading">{{ $t("Stay Connected") }}</h4>
              <p class="footer-desc-small">
                Subscribe to our YouTube channel for spiritual insights and
                updates.
              </p>
              <div class="youtube-subscribe">
                <a
                  href="https://www.youtube.com/watch?v=xJ3vatsNQDU&list=RDxJ3vatsNQDU&start_radio=1"
                  target="_blank"
                  class="youtube-btn"
                >
                  <span class="youtube-icon">▶</span>
                  <span>Subscribe on YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <p class="copyright">
              ©
              {{
                $t("2025 Gurudev Ashram. All rights reserved. May all be well.")
              }}
            </p>
            <div class="footer-links-bottom">
              <a href="#">{{ $t("Privacy Policy") }}</a>
              <span class="separator">•</span>
              <a href="#">{{ $t("Terms of Service") }}</a>
              <span class="separator">•</span>
              <a href="#">{{ $t("Contact Us") }}</a>
            </div>
          </div>
        </div>
      </footer>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import en from "../locales/en.json";
import hi from "../locales/hi.json";

const { locale, t } = useI18n();
const isMenuOpen = ref(false);
const currentImageIndex = ref(0);
const backgroundImages = [
  '/images/bg1.jpg',
  '/images/bg2.jpg',
  '/images/bg3.jpeg',
  '/images/bg4.jpeg',
  '/images/bg5.jpeg',
  '/images/bg6.jpeg',
  '/images/bg7.jpeg',
];
// Watch locale changes to ensure reactivity
watch(locale, (newLocale) => {
  try {
    localStorage.setItem("lang", newLocale);
  } catch (e) {
    console.error("Failed to save language preference:", e);
  }
});

onMounted(() => {
  // Ensure locale is properly set on mount
  const saved = localStorage.getItem("lang");
  if (saved === "hi" || saved === "en") {
    locale.value = saved;
  }
  setInterval(() => {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % backgroundImages.length;
  }, 3000); // Change every 3 seconds
});

const currentQuotes = computed(() => {
  const messages = locale.value === "en" ? en : hi;
  return messages.quotes || [];
});
const currentServices = computed(() => {
  const messages = locale.value === "en" ? en : hi;
  return messages.services || [];
});
const currentTestimonials = computed(() => {
  const messages = locale.value === "en" ? en : hi;
  return messages.testimonials || [];
});

// String translations
const heroTitle = computed(() => t("heroTitle"));
const heroSubtitle = computed(() => t("heroSubtitle"));
const ctaPrimary = computed(() => t("ctaPrimary"));
const ctaSecondary = computed(() => t("ctaSecondary"));

const aboutTitle = computed(() => t("aboutTitle"));
const aboutP1 = computed(() => t("aboutP1"));
const aboutP2 = computed(() => t("aboutP2"));
const quotesChip = computed(() => t("quotesChip"));
const quotesTitle = computed(() => t("quotesTitle"));
const quotesSubtitle = computed(() => t("quotesSubtitle"));
const servicesChip = computed(() => t("servicesChip"));
const servicesTitle = computed(() => t("servicesTitle"));
const servicesSubtitle = computed(() => t("servicesSubtitle"));
const testimonialsTitle = computed(() => t("testimonialsTitle"));
const emailLabel = computed(() => t("emailLabel"));
const phoneLabel = computed(() => t("phoneLabel"));
const addressLabel = computed(() => t("addressLabel"));
const sendEmail = computed(() => t("sendEmail"));
const callLabel = computed(() => t("callLabel"));

const menu = [
  { id: "home", title: t("Home"), icon: "home" },
  { id: "about", title: t("About"), icon: "information-circle" },
  { id: "services", title: t("Services"), icon: "heart" },
  { id: "testimonials", title: t("Testimonials"), icon: "people" },
  { id: "contact", title: t("Contact"), icon: "mail" },
];

function toggleLang() {
  locale.value = locale.value === "en" ? "hi" : "en";
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    isMenuOpen.value = false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function onNav(id) {
  scrollTo(id);
}

function openService(s) {
  console.log("Open service:", s);
}

function openMail() {
  window.location.href = "mailto:gurudev@example.org";
}

function openTel() {
  window.location.href = "tel:+919876543210";
}
</script>

<style scoped>
/* Basic layout */
.guru-page {
  --ion-background-color: linear-gradient(
    135deg,
    #fffbf7 0%,
    #fff9f3 50%,
    #fffdf9 100%
  );
  font-family: "Segoe UI", Trebuchet MS, Inter, system-ui, -apple-system,
    "Helvetica Neue", Arial;
}

.toolbar {
  --background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(217, 119, 6, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.logo {
  color: #92400e;
  font-weight: 800;
  letter-spacing: 0.02em;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #d97706, #ea580c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.action-btns ion-button {
  --color: #e65100;
}

.container-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
}

.left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #92400e;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.menu-btn:hover {
  background: rgba(230, 81, 0, 0.08);
  transform: rotate(90deg);
}

.action-btns.right {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.btn-link {
  background: none;
  border: none;
  color: #e65100;
  cursor: pointer;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
  position: relative;
}

.btn-link:hover {
  background: rgba(230, 81, 0, 0.1);
  transform: translateY(-2px);
}

.lang-toggle {
  font-weight: 700;
  font-size: 0.9rem;
}

.action-btns {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Mobile drawer */
.mobile-drawer {
  position: fixed;
  left: 0;
  right: 0;
  top: 56px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  z-index: 1000;
  padding: 1.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(217, 119, 6, 0.1);
  animation: slideDown 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.drawer-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(217, 119, 6, 0.1);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #e65100;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.close-btn:hover {
  background: rgba(230, 81, 0, 0.1);
  transform: rotate(90deg);
}

.mobile-drawer nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-drawer nav a {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 12px;
  color: #6b2b04;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
  font-weight: 500;
}

.mobile-drawer nav a:hover {
  background: rgba(230, 81, 0, 0.08);
  transform: translateX(8px);
}

/* Hero */
.ionic-hero {
  min-height: 400px;     /* ← Minimum height */
  max-height: 500px;     /* ← Maximum height */
  height: 35vh;          /* ← Responsive height */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  margin: 1.5rem 0 2.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}

.hero-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 0;
}
.hero-bg-image.active {
  opacity: 1;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.ionic-hero::before {
  content: "";
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 199, 71, 0.1) 0%,
    transparent 70%
  );
  animation: float 20s ease-in-out infinite;
  z-index: 2;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(-30px, -30px) rotate(180deg);
  }
}

.hero-inner {
  text-align: center;
  padding: 5rem 2rem;
  max-width: 950px;
  position: relative;
  z-index: 3;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.95);
  color: #b45309;
  padding: 8px 16px;
  border-radius: 999px;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 184, 77, 0.3);
  animation: slideInDown 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  margin: 1rem 0 0.5rem;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  animation: slideInDown 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) 0.2s both;
}

.hero-sub {
  color: #fff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  opacity: 0.95;
  margin-bottom: 2rem;
  font-size: 1.15rem;
  line-height: 1.6;
  animation: slideInDown 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) 0.3s both;
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  animation: slideInDown 0.8s cubic-bezier(0.2, 0.9, 0.2, 1) 0.4s both;
}

.hero-ctas ion-button {
  --padding-start: 28px;
  --padding-end: 28px;
  --border-radius: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.hero-ctas ion-button.primary {
  --background: linear-gradient(135deg, #fb923c, #ea580c);
  --color: #fff;
  box-shadow: 0 12px 30px rgba(251, 146, 60, 0.3);
}

.hero-ctas ion-button.primary:hover {
  --background: linear-gradient(135deg, #fb5700, #d97706);
  box-shadow: 0 16px 40px rgba(251, 146, 60, 0.4);
  transform: translateY(-4px);
}

/* Sections & cards */
.section {
  margin: 2.5rem 0 3rem;
  animation: fadeIn 0.8s cubic-bezier(0.2, 0.9, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.card-hero {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 250, 240, 0.9) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(217, 119, 6, 0.1);
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.card-hero:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  transform: translateY(-8px);
}

.section-head {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 2.5rem;
  animation: fadeIn 0.6s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.section-head .chip {
  display: inline-block;
  background: linear-gradient(
    135deg,
    rgba(255, 243, 224, 0.8) 0%,
    rgba(254, 236, 220, 0.8) 100%
  );
  color: #e65100;
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0.05em;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(230, 81, 0, 0.1);
  animation: slideInDown 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

.section-head h2 {
  margin: 1rem 0 0.5rem;
  color: #7c2d12;
  font-size: 2.2rem;
  font-weight: 800;
  animation: slideInDown 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) 0.1s both;
}

.muted {
  color: #6b2b04;
  opacity: 0.75;
  font-size: 1rem;
  animation: slideInDown 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) 0.2s both;
}

/* Quotes grid */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}

.quote-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 250, 240, 0.8) 100%
  );
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(217, 119, 6, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
  animation: popIn 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  cursor: default;
  position: relative;
  overflow: hidden;
}

.quote-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #fb923c, #ea580c);
}

.quote-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 50px rgba(251, 146, 60, 0.15);
}

.quote-mark {
  font-size: 2.8rem;
  color: #fb923c;
  margin-bottom: 12px;
  opacity: 0.3;
}

.quote-text {
  color: #4a2a0e;
  font-style: italic;
  line-height: 1.6;
  font-weight: 500;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Services */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.service-card {
  cursor: pointer;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 250, 240, 0.9) 100%
  );
  border: 1px solid rgba(217, 119, 6, 0.1);
  padding: 28px;
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  animation: popIn 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #fb923c, #ea580c);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 50px rgba(251, 146, 60, 0.15);
}

.service-emoji {
  font-size: 2.4rem;
  margin-bottom: 16px;
  transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.service-card:hover .service-emoji {
  transform: scale(1.2) rotate(10deg);
}

.service-title {
  color: #7c2d12;
  font-weight: 700;
  font-size: 1.1rem;
}

.service-underline {
  height: 4px;
  width: 48px;
  background: linear-gradient(90deg, #fb923c, #ea580c);
  border-radius: 12px;
  margin-top: 12px;
  transition: width 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.service-card:hover .service-underline {
  width: 100%;
}

/* Testimonials */
.testimonials {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.test-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 250, 240, 0.8) 100%
  );
  border-left: 5px solid #fb923c;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(217, 119, 6, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
  animation: popIn 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

.test-card:hover {
  transform: translateX(8px);
  box-shadow: 0 16px 40px rgba(251, 146, 60, 0.12);
}

.testimonial {
  color: #4a2a0e;
  font-style: italic;
  line-height: 1.7;
  font-weight: 500;
}

/* Contact */
.contact-card {
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 250, 240, 0.9) 100%
  );
  border: 1px solid rgba(217, 119, 6, 0.1);
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
  animation: popIn 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

.contact-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  transform: translateY(-8px);
}

.contact-actions {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-card ion-button {
  flex: 1;
  --border-radius: 12px;
  font-weight: 700;
  min-height: 44px;
}

/* Footer */
.guru-footer {
  background: linear-gradient(135deg, #1f1410 0%, #2d1b12 50%, #1f1410 100%);
  color: #e8d5c4;
  padding: 4rem 1rem 2rem;
  margin-top: 3rem;
  border-top: 2px solid rgba(251, 146, 60, 0.2);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

.footer-col {
  animation: fadeIn 0.8s cubic-bezier(0.2, 0.9, 0.2, 1);
  text-align: left;
}

.footer-title {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fb923c, #ea580c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-align: left;
}

.footer-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: left;
}

.footer-desc {
  color: #d4c5b9;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  text-align: left;
}

.footer-desc-small {
  color: #d4c5b9;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: left;
}

.footer-social {
  display: flex;
  gap: 12px;
  margin-top: 1rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    rgba(251, 146, 60, 0.2),
    rgba(234, 88, 12, 0.2)
  );
  border: 2px solid rgba(251, 146, 60, 0.3);
  border-radius: 50%;
  color: #fb923c;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
  cursor: pointer;
}

.social-link:hover {
  background: linear-gradient(
    135deg,
    rgba(251, 146, 60, 0.4),
    rgba(234, 88, 12, 0.4)
  );
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 8px 20px rgba(251, 146, 60, 0.2);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-links a {
  color: #d4c5b9;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
  display: inline-block;
  position: relative;
}

.footer-links a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #fb923c, #ea580c);
  transition: width 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.footer-links a:hover {
  color: #fb923c;
}

.footer-links a:hover::after {
  width: 100%;
}

.footer-info {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  color: #d4c5b9;
}

.info-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  color: #fb923c;
}

.info-item a {
  color: #d4c5b9;
  text-decoration: none;
  transition: color 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.info-item a:hover {
  color: #fb923c;
}

.footer-newsletter {
  display: flex;
  gap: 8px;
  margin-top: 1rem;
}

.newsletter-input {
  flex: 1;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(251, 146, 60, 0.3);
  border-radius: 8px;
  color: #e8d5c4;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.newsletter-input::placeholder {
  color: rgba(232, 213, 196, 0.6);
}

.newsletter-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(251, 146, 60, 0.6);
  box-shadow: 0 0 12px rgba(251, 146, 60, 0.2);
}

.newsletter-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #fb923c, #ea580c);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
  font-size: 0.9rem;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 146, 60, 0.3);
}

.newsletter-btn:active {
  transform: translateY(0);
}

.footer-bottom {
  border-top: 1px solid rgba(251, 146, 60, 0.2);
  padding-top: 2rem;
  text-align: center;
}

.copyright {
  color: #b8a89c;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.footer-links-bottom {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-links-bottom a {
  color: #d4c5b9;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.footer-links-bottom a:hover {
  color: #fb923c;
}

.separator {
  color: #b8a89c;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.2, 0.9, 0.2, 1);
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

/* Small screens tweaks */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
    line-height: 1.4;
  }

  .hero-sub {
    font-size: 1rem;
  }

  .section-head h2 {
    font-size: 1.6rem;
  }

  .hero-inner {
    padding: 3rem 1.5rem;
  }

  .hero-ctas {
    flex-direction: column;
  }

  .hero-ctas ion-button {
    width: 100%;
  }
}
</style>
