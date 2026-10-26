# VedicPanditji — Authentic Vedic Pujas & Temple Services (Frontend)

> A modern, devotional web application for booking verified Vedic Pandits, Purohits, and Temple Services across major cities in India, guided by Acharya Jitendra Chaubey.

---

## 🌟 Key Features & Architecture

### 1. Visual Design & Typography
- **Primary Font:** **Poppins** across the entire application for clean, modern readability.
- **Brand Colors:** Deep Terracotta (`#BD4B23`, `#D95B2D`), Warm Ivory surfaces (`#FBF9F5`, `#FAF6EF`), Gold Accents (`#C59A3F`), and Dark Slate typography (`#2C2724`).
- **Responsive Navigation:** Seamless navigation bar featuring direct links: **Home → About Us → Pooja Services → Temple Services → Contact**, with mobile slide-out drawer.

### 2. Smooth GSAP Animations
- **Page Entrance & Scroll Triggers:** Staggered card reveals and subtle upward fade-ins across sections.
- **Micro-Interactions:** Interactive booking buttons, category cards, and temple seva cards.

### 3. Core Business & Ritual Workflows
- **Multi-City Coverage:** Tailored Vedic services for Mumbai, Pune, Bangalore, Delhi-NCR, Hyderabad, Chennai, Kolkata, Ahmedabad, and more.
- **Category Directory:** Hawan & Homas, Jaap & Mantra chanting, Vivah & Wedding sanskars, Shanti Pujas, Pitru Shradh, Path & Katha, Festival Pujas, and Bhajan Chowki.
- **Temple Services:** Holy pilgrimage rituals and temple sevas across Kashi, Ayodhya, Ujjain, Trimbakeshwar, Haridwar, and Rameswaram.
- **Transparent Booking Flow:** Step-by-step modal for package selection (Package A ritual only vs Package B complete samagri), date/muhurat picking, gotra/sankalp details, and direct helpline confirmation.

---

## 📁 Project Structure

```text
Vedicpanditji/
├── backend/                  # Backend directory
└── frontend/
    ├── public/
    │   ├── images/           # Authentic Vedic ritual imagery & logos
    │   ├── robots.txt        # Search engine directives
    │   └── sitemap.xml       # SEO sitemap
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx           # Sticky responsive header & drawer
    │   │   │   ├── Footer.jsx           # Devotional footer with city & pooja links
    │   │   │   ├── BookingModal.jsx     # 3-step puja booking flow
    │   │   │   ├── CartDrawer.jsx       # Booking & advance drawer
    │   │   │   └── Toast.jsx            # Notification toast
    │   │   └── home/
    │   │       ├── HeroSection.jsx      # Cinematic hero with quick booking
    │   │       ├── CounterSection.jsx   # Trust metrics & counter statistics
    │   │       ├── ServiceCategories.jsx# 8 core ritual categories
    │   │       ├── FeaturedPujas.jsx    # Verified packages, samagri & pricing
    │   │       ├── MultiCitySection.jsx # City-specific puja options
    │   │       ├── TempleServicesSection.jsx # Kshetras & Teerth Yatra rituals
    │   │       ├── HowItWorksSection.jsx# 4-step ritual journey
    │   │       ├── ReviewsSection.jsx   # Devotee reviews and testimonials
    │   │       ├── TrustCredentials.jsx # Guarantees & authentic credentials
    │   │       └── MediaCoverage.jsx    # Press & recognition
    │   ├── context/
    │   │   └── AppContext.jsx           # Global state (Route, City, Bookings)
    │   ├── data/
    │   │   ├── allPoojaServices.js      # Complete catalog of pujas & vidhis
    │   │   ├── multiCitySeoData.js      # City-specific SEO pages & custom content
    │   │   ├── pujaPackagesData.js      # Verified packages & samagri pricing
    │   │   └── vedicPanditData.js       # Core ritual data & traditions
    │   ├── pages/
    │   │   ├── HomePage.jsx             # Flagship home experience
    │   │   ├── AboutUsPage.jsx          # Acharya Jitendra Chaubey & Vedic lineage
    │   │   ├── CataloguePage.jsx        # Complete puja catalog with search & filters
    │   │   ├── TempleServicesPage.jsx   # Pilgrimage & temple rituals
    │   │   ├── ServiceDetailPage.jsx    # Muhurtham, package comparison & vidhi
    │   │   ├── SeoLandingPage.jsx       # Dedicated city-specific landing pages
    │   │   ├── ContactEnquiryPage.jsx   # Custom ceremony & muhurat consultations
    │   │   ├── HowWeWorkPage.jsx        # Pandit vetting & ceremony procedure
    │   │   ├── FaqsPage.jsx             # Frequently asked questions
    │   │   ├── MyAccountPage.jsx        # Devotee bookings & profile
    │   │   ├── SitemapPage.jsx          # Complete HTML sitemap
    │   │   └── LegalPage.jsx            # Terms, privacy & cancellation policies
    │   ├── services/
    │   │   └── enquiryApi.js            # Enquiry API communication layer
    │   ├── utils/
    │   │   └── gsapAnimations.js        # GSAP transitions & animations
    │   ├── App.jsx                      # App root & client-side route manager
    │   ├── index.css                    # Design tokens & typography
    │   └── main.jsx                     # Application entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Development Server
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
cd frontend
npm run build
```
Generates an optimized production bundle in `frontend/dist/`.
