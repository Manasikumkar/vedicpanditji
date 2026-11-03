/**
 * VedicPanditji - Production Static Pre-Rendering (SSG) & Technical SEO Generator
 * 
 * Generates:
 * 1. Pre-rendered, 100% crawlable static HTML files for all indexable routes with:
 *    - Accurate <title>, <meta description>, <link rel="canonical">
 *    - Open Graph & Twitter Card tags
 *    - Complete Schema.org JSON-LD structured data (@graph)
 *    - Semantic H1, visible breadcrumbs, article/service content, and crawlable links
 * 2. Production XML Sitemap (sitemap.xml) with verified HTTPS canonical URLs
 * 3. Crawl-optimized robots.txt protecting private endpoints and allowing public routes
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

const DOMAIN = 'https://vedicpanditji.com';
const TODAY = new Date().toISOString().split('T')[0];

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function sanitizeForMeta(str) {
  if (!str) return '';
  return String(str).replace(/"/g, '&quot;').replace(/\n+/g, ' ').trim();
}

/**
 * Builds the static pre-rendered HTML for search engine crawlers and instant first paint
 */
function buildSemanticBody(route, params, data, meta, lang = 'en') {
  const { BRAND_INFO, SERVICES, ALL_LOCATIONS, PUJA_GUIDES_DATA, getPricingDisplay } = data;
  const t = (key, vars) => data.translate(lang, key, vars);
  const lp = (p) => data.localizePath(p, lang);

  const headerHtml = `
    <header class="navbar" style="background:#FFFFFF;border-bottom:1px solid #EAE5D9;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;">
      <a href="${lp('/')}" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:#1A1613;">
        <span style="font-size:24px;">🕉️</span>
        <span style="font-weight:700;font-size:20px;color:#BD4B23;">Vedic<span style="color:#C98A2C;">Panditji</span></span>
      </a>
      <nav style="display:flex;gap:20px;font-size:14px;font-weight:500;">
        <a href="${lp('/')}" style="text-decoration:none;color:#1A1613;">${escapeHtml(t('nav.home'))}</a>
        <a href="${lp('/about-us')}" style="text-decoration:none;color:#1A1613;">${escapeHtml(t('nav.about-us'))}</a>
        <a href="${lp('/services')}" style="text-decoration:none;color:#1A1613;">${escapeHtml(t('nav.ceremonies'))}</a>
        <a href="${lp('/locations/pandit-in-pune')}" style="text-decoration:none;color:#1A1613;">${escapeHtml(t('nav.locations'))}</a>
        <a href="${lp('/contact')}" style="text-decoration:none;color:#1A1613;">${escapeHtml(t('nav.contact'))}</a>
      </nav>
      <div>
        <a href="tel:+919766880979" style="background:#BD4B23;color:#FFFFFF;padding:8px 16px;border-radius:20px;text-decoration:none;font-size:13px;font-weight:600;">📞 +91 97668 80979</a>
      </div>
    </header>
  `;

  const footerHtml = `
    <footer style="background:#181A17;color:#E0DDD5;padding:60px 24px 32px;margin-top:60px;border-top:1px solid #2D302C;font-size:14px;">
      <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:36px;padding-bottom:48px;border-bottom:1px solid rgba(255, 255, 255, 0.08);">
        <div>
          <div style="background:#FFFFFF;padding:6px 14px;border-radius:10px;display:inline-block;margin-bottom:14px;">
            <span style="font-weight:700;font-size:18px;color:#BD4B23;">Vedic<span style="color:#C98A2C;">Panditji</span></span>
          </div>
          <p style="font-size:13px;color:#A09D94;line-height:1.65;margin-bottom:14px;">${escapeHtml(t('footer.about-blurb'))}</p>
          <p style="font-size:12px;color:#E5C06E;font-weight:700;margin-bottom:12px;">${escapeHtml(t('footer.languages'))}</p>
          <p style="font-size:13px;color:#A09D94;margin:4px 0;"><strong>${escapeHtml(t('ssr.helpline'))}</strong> <a href="tel:+919766880979" style="color:#FFFFFF;text-decoration:none;font-weight:600;">+91 97668 80979</a></p>
          <p style="font-size:13px;color:#A09D94;margin:4px 0;"><strong>${escapeHtml(t('enquiry.email'))}</strong> <a href="mailto:info@vedicpanditji.com" style="color:#A09D94;text-decoration:none;">info@vedicpanditji.com</a></p>
          <p style="font-size:13px;color:#A09D94;margin:4px 0;">${escapeHtml(t('footer.serving-families-across-india'))}</p>
        </div>
        <div>
          <h4 style="color:#FFFFFF;font-size:15px;font-weight:700;margin-bottom:16px;letter-spacing:0.04em;">${escapeHtml(t('footer.pooja-services'))}</h4>
          <ul style="list-style:none;padding:0;margin:0;font-size:13px;line-height:2.2;">
            <li><a href="${lp('/services/griha-pravesh')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.griha-pravesh-puja'))}</a></li>
            <li><a href="${lp('/services/satyanarayan-puja')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.satyanarayan-puja-katha'))}</a></li>
            <li><a href="${lp('/services/vastu-shanti-puja')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.vastu-shanti-puja'))}</a></li>
            <li><a href="${lp('/services/rudrabhishek-puja')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.rudrabhishek-puja'))}</a></li>
            <li><a href="${lp('/services/navagraha-havan')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.navgraha-shanti-havan'))}</a></li>
            <li><a href="${lp('/services/vivah-marriage')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.hindu-wedding'))}</a></li>
            <li><a href="${lp('/services')}" style="color:var(--accent-gold, #C98A2C);text-decoration:none;font-weight:700;">${escapeHtml(t('footer.browse-all-ceremonies'))} &rarr;</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#FFFFFF;font-size:15px;font-weight:700;margin-bottom:16px;letter-spacing:0.04em;">${escapeHtml(t('footer.pune-pcmc-locations'))}</h4>
          <ul style="list-style:none;padding:0;margin:0;font-size:13px;line-height:2.2;">
            <li><a href="${lp('/locations/pandit-in-pune')}" style="color:#FFFFFF;text-decoration:none;font-weight:600;">${escapeHtml(t('footer.pandit-in-pune'))} &rarr;</a></li>
            <li><a href="${lp('/locations/pandit-in-pcmc')}" style="color:#FFFFFF;text-decoration:none;font-weight:600;">${escapeHtml(t('footer.pandit-in-pcmc'))} &rarr;</a></li>
            <li><a href="${lp('/locations/pandit-in-kothrud')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.pandit-in-kothrud'))}</a></li>
            <li><a href="${lp('/locations/pandit-in-baner')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.pandit-in-baner'))}</a></li>
            <li><a href="${lp('/locations/pandit-in-hinjawadi')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.pandit-in-hinjawadi'))}</a></li>
            <li><a href="${lp('/locations/pandit-in-kharadi')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.pandit-in-kharadi'))}</a></li>
            <li><a href="${lp('/locations/pandit-in-wakad')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.pandit-in-wakad'))}</a></li>
            <li><a href="${lp('/locations/pandit-in-pimple-saudagar')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.pandit-in-pimple-saudagar'))}</a></li>
            <li><a href="${lp('/locations/pandit-in-ravet')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.pandit-in-ravet'))}</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:#FFFFFF;font-size:15px;font-weight:700;margin-bottom:16px;letter-spacing:0.04em;">${escapeHtml(t('footer.city-specific-services'))}</h4>
          <ul style="list-style:none;padding:0;margin:0;font-size:13px;line-height:2.2;">
            <li><a href="${lp('/services/north-indian-pandit-in-pune')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-pune'))}</a></li>
            <li><a href="${lp('/services/north-indian-pandit-in-mumbai')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-mumbai'))}</a></li>
            <li><a href="${lp('/services/north-indian-pandit-in-bangalore')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-bangalore'))}</a></li>
            <li><a href="${lp('/services/north-indian-pandit-in-hyderabad')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-hyderabad'))}</a></li>
            <li><a href="${lp('/services/north-indian-pandit-in-delhi')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-delhi-ncr'))}</a></li>
            <li><a href="${lp('/services/north-indian-pandit-in-chennai')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-chennai'))}</a></li>
            <li><a href="${lp('/services/north-indian-pandit-in-ahmedabad')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-ahmedabad'))}</a></li>
            <li><a href="${lp('/services/north-indian-pandit-in-kolkata')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.north-indian-pandit-kolkata'))}</a></li>
            <li><a href="${lp('/services/trimbakeshwar-kalsarp-puja-nashik')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.trimbakeshwar-nashik'))}</a></li>
            <li><a href="${lp('/services/online-e-puja-services')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.live-e-puja-worldwide'))}</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Horizontal Navigation & Copyright -->
      <div style="max-width:1200px;margin:28px auto 0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-size:12px;color:#7E7A72;gap:12px;">
        <nav aria-label="${escapeHtml(t('footer.navigation'))}" style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:center;text-align:center;">
          <a href="${lp('/about-us')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.about-us'))}</a>
          <span>•</span>
          <a href="${lp('/how-it-works')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.how-we-work'))}</a>
          <span>•</span>
          <a href="${lp('/faqs')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.faqs'))}</a>
          <span>•</span>
          <a href="${lp('/contact')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.contact-us'))}</a>
          <span>•</span>
          <a href="${lp('/legal')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.privacy-policy'))}</a>
          <span>•</span>
          <a href="${lp('/legal')}" style="color:#A09D94;text-decoration:none;">${escapeHtml(t('footer.terms'))}</a>
          <span>•</span>
          <a href="${lp('/sitemap')}" style="color:var(--accent-gold, #C98A2C);text-decoration:none;font-weight:600;">${escapeHtml(t('footer.html-sitemap'))}</a>
        </nav>
        <div style="text-align:center;color:#7E7A72;">
          &copy; ${new Date().getFullYear()} ${escapeHtml(t('footer.copyright'))}
        </div>
      </div>
    </footer>
  `;

  // 1. Location Landing Pages
  if (route === 'location-detail') {
    const loc = ALL_LOCATIONS.find(l => l.slug === params.slug) || ALL_LOCATIONS[0];
    const parentCityName = loc.parentCity === 'PCMC' || loc.parentCity === 'pcmc' ? 'Pimpri-Chinchwad (PCMC)' : 'Pune';
    const zoneBadge = loc.badge || (loc.isParentHub ? 'PRIMARY CITY HUB' : `${loc.zone || 'LOCALITY'} HUB`);
    const servicesList = loc.topServices || loc.primaryServices || [];

    return `
      ${headerHtml}
      <main style="max-width:1200px;margin:0 auto;padding:40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size:13px;color:#6B6355;margin-bottom:24px;">
          <a href="/" style="color:#6B6355;text-decoration:none;">Home</a> &gt;
          <a href="/locations/${loc.parentCity === 'PCMC' || loc.parentCity === 'pcmc' ? 'pandit-in-pcmc' : 'pandit-in-pune'}" style="color:#6B6355;text-decoration:none;">${parentCityName}</a> &gt;
          <span style="color:#BD4B23;font-weight:600;">${loc.name}</span>
        </nav>

        <section style="margin-bottom:40px;">
          <span style="background:#FFF3E0;color:#BD4B23;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;display:inline-block;margin-bottom:12px;">
            ${escapeHtml(zoneBadge)}
          </span>
          <h1 style="font-size:32px;font-weight:700;color:#1A1613;margin-bottom:16px;line-height:1.2;">
            ${escapeHtml(loc.h1 || loc.title)}
          </h1>
          <p style="font-size:16px;color:#4A4438;line-height:1.7;max-width:900px;margin-bottom:24px;">
            ${escapeHtml(loc.intro)}
          </p>
          <div style="background:#FBF9F5;border:1px solid #EAE5D9;border-radius:12px;padding:20px;display:flex;flex-wrap:wrap;gap:24px;font-size:13px;">
            <div><strong>Ritual Languages:</strong> Hindi &amp; Sanskrit</div>
            <div><strong>Coverage Area:</strong> ${escapeHtml(loc.coverageDescription || 'Doorstep visits across residential societies')}</div>
            <div><strong>Direct Shubh Muhurat Consultation:</strong> <a href="tel:+919766880979" style="color:#BD4B23;font-weight:600;">+91 97668 80979</a></div>
          </div>
        </section>

        <section style="margin-bottom:48px;">
          <h2 style="font-size:24px;font-weight:700;color:#1A1613;margin-bottom:20px;">
            Doorstep Vedic Puja Services Available in ${escapeHtml(loc.name)}
          </h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:20px;">
            ${servicesList.map(ps => `
              <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:12px;padding:20px;">
                <h3 style="font-size:17px;font-weight:700;color:#BD4B23;margin-bottom:8px;">
                  <a href="/services/${ps.id}" style="color:#BD4B23;text-decoration:none;">${escapeHtml(ps.name)}</a>
                </h3>
                <p style="font-size:13px;color:#6B6355;line-height:1.6;margin-bottom:12px;">${escapeHtml(ps.desc || ps.description || '')}</p>
                <a href="/services/${ps.id}" style="font-size:13px;font-weight:600;color:#C98A2C;text-decoration:none;">View Vidhi &amp; Samagri &rarr;</a>
              </div>
            `).join('')}
          </div>
        </section>

        ${loc.serviceHighlights && loc.serviceHighlights.length > 0 ? `
          <section style="background:#FDFBF7;border:1px solid #EAE5D9;border-radius:16px;padding:32px;margin-bottom:48px;">
            <h2 style="font-size:22px;font-weight:700;color:#1A1613;margin-bottom:16px;">
              Why Families in ${escapeHtml(loc.name)} Choose VedicPanditji
            </h2>
            <ul style="font-size:14px;color:#4A4438;line-height:1.8;padding-left:20px;">
              ${loc.serviceHighlights.map(sh => `
                <li style="margin-bottom:8px;">${escapeHtml(sh)}</li>
              `).join('')}
            </ul>
          </section>
        ` : ''}

        <section style="margin-bottom:48px;">
          <h2 style="font-size:22px;font-weight:700;color:#1A1613;margin-bottom:20px;">
            Frequently Asked Questions for ${escapeHtml(loc.name)}
          </h2>
          <div style="display:flex;flex-direction:column;gap:16px;">
            ${(loc.localFaqs || []).map(f => `
              <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:12px;padding:20px;">
                <h3 style="font-size:16px;font-weight:700;color:#1A1613;margin-bottom:8px;">${escapeHtml(f.q)}</h3>
                <p style="font-size:14px;color:#4A4438;line-height:1.6;margin:0;">${escapeHtml(f.a)}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <section style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:16px;padding:28px;margin-bottom:32px;">
          <h2 style="font-size:18px;font-weight:700;color:#1A1613;margin-bottom:14px;">
            Explore Nearby Localities in ${parentCityName}
          </h2>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${(loc.nearbyLocalitySlugs || ALL_LOCATIONS.filter(l => l.slug !== loc.slug && l.parentCity === loc.parentCity).map(l => l.slug).slice(0, 5)).map(ns => {
              const nearbyLoc = ALL_LOCATIONS.find(l => l.slug === ns);
              if (!nearbyLoc) return '';
              return `<a href="/locations/${nearbyLoc.slug}" style="background:#FBF9F5;border:1px solid #EAE5D9;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;color:#1A1613;text-decoration:none;">📍 Pandit in ${escapeHtml(nearbyLoc.name)}</a>`;
            }).join('')}
          </div>
        </section>
      </main>
      ${footerHtml}
    `;
  }

  // 1b. Multi-City Landing Pages (/services/:slug)
  if (route === 'seo-landing') {
    const { MULTI_CITY_SEO_PAGES } = data;
    const pageData = (MULTI_CITY_SEO_PAGES || []).find(p => p.slug === params.slug) || (MULTI_CITY_SEO_PAGES && MULTI_CITY_SEO_PAGES[0]) || {};
    const relatedCityPages = (MULTI_CITY_SEO_PAGES || []).filter(p => p.city === pageData.city && p.slug !== pageData.slug);

    return `
      ${headerHtml}
      <main style="max-width:1200px;margin:0 auto;padding:40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size:13px;color:#6B6355;margin-bottom:24px;">
          <a href="/" style="color:#6B6355;text-decoration:none;">Home</a> &gt;
          <a href="/services" style="color:#6B6355;text-decoration:none;">Ceremonies</a> &gt;
          <span style="color:#BD4B23;font-weight:600;">${escapeHtml(pageData.title || pageData.h1)}</span>
        </nav>

        <section style="margin-bottom:40px;">
          <span style="background:#FFF3E0;color:#BD4B23;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;display:inline-block;margin-bottom:12px;">
            ${escapeHtml(pageData.heroBadge || `${pageData.city?.toUpperCase() || 'VEDIC'} SERVICES`)}
          </span>
          <h1 style="font-size:32px;font-weight:700;color:#1A1613;margin-bottom:16px;line-height:1.2;">
            ${escapeHtml(pageData.h1 || pageData.title)}
          </h1>
          <p style="font-size:16px;color:#4A4438;line-height:1.7;max-width:900px;margin-bottom:24px;">
            ${escapeHtml(pageData.sections?.[0]?.content || pageData.metaDescription || '')}
          </p>
          <div style="background:#FBF9F5;border:1px solid #EAE5D9;border-radius:12px;padding:20px;display:flex;flex-wrap:wrap;gap:24px;font-size:13px;">
            <div><strong>Location:</strong> ${escapeHtml(pageData.city || 'India')}, ${escapeHtml(pageData.state || '')}</div>
            <div><strong>Ritual Languages:</strong> Hindi &amp; Sanskrit</div>
            <div><strong>Verification:</strong> ${escapeHtml(pageData.verificationBadge || 'Confirmed Service Coverage')}</div>
            <div><strong>Direct Consultation:</strong> <a href="tel:+919766880979" style="color:#BD4B23;font-weight:600;">+91 97668 80979</a></div>
          </div>
        </section>

        ${pageData.sections && pageData.sections.length > 1 ? `
          <section style="margin-bottom:48px;">
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:24px;">
              ${pageData.sections.slice(1).map(sec => `
                <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:14px;padding:24px;">
                  <h2 style="font-size:18px;font-weight:700;color:#BD4B23;margin-bottom:12px;">${escapeHtml(sec.heading)}</h2>
                  <div style="font-size:14px;color:#4A4438;line-height:1.7;white-space:pre-line;">${escapeHtml(sec.content)}</div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${pageData.vidhiSteps && pageData.vidhiSteps.length > 0 ? `
          <section style="background:#FDFBF7;border:1px solid #EAE5D9;border-radius:16px;padding:32px;margin-bottom:48px;">
            <h2 style="font-size:22px;font-weight:700;color:#1A1613;margin-bottom:20px;">
              Vedic Ceremony Steps &amp; Ritual Conduction
            </h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;">
              ${pageData.vidhiSteps.map(step => `
                <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:12px;padding:18px;">
                  <span style="font-size:12px;font-weight:700;color:#BD4B23;background:#FFF3E0;padding:2px 8px;border-radius:6px;">Step ${escapeHtml(step.step)}</span>
                  <h3 style="font-size:15px;font-weight:700;color:#1A1613;margin:8px 0 6px;">${escapeHtml(step.title)}</h3>
                  <p style="font-size:13px;color:#6B6355;line-height:1.6;margin:0;">${escapeHtml(step.desc)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${pageData.faqs && pageData.faqs.length > 0 ? `
          <section style="margin-bottom:48px;">
            <h2 style="font-size:22px;font-weight:700;color:#1A1613;margin-bottom:20px;">
              Frequently Asked Questions in ${escapeHtml(pageData.city || '')}
            </h2>
            <div style="display:flex;flex-direction:column;gap:14px;">
              ${pageData.faqs.map(f => `
                <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:12px;padding:20px;">
                  <h3 style="font-size:16px;font-weight:700;color:#1A1613;margin-bottom:8px;">${escapeHtml(f.q)}</h3>
                  <p style="font-size:14px;color:#4A4438;line-height:1.6;margin:0;">${escapeHtml(f.a)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${pageData.keyLocalities && pageData.keyLocalities.length > 0 ? `
          <section style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:16px;padding:28px;margin-bottom:32px;">
            <h2 style="font-size:18px;font-weight:700;color:#1A1613;margin-bottom:14px;">
              Key Localities Served in ${escapeHtml(pageData.city || '')}
            </h2>
            <div style="display:flex;flex-wrap:wrap;gap:10px;">
              ${pageData.keyLocalities.map(kl => `
                <span style="background:#FBF9F5;border:1px solid #EAE5D9;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;color:#1A1613;">📍 ${escapeHtml(kl)}</span>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${relatedCityPages.length > 0 ? `
          <section style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:16px;padding:28px;margin-bottom:32px;">
            <div style="margin-bottom:18px;">
              <span style="font-size:12px;font-weight:700;color:#BD4B23;text-transform:uppercase;letter-spacing:0.04em;">Specific Ceremonies in ${escapeHtml(pageData.city || '')}</span>
              <h2 style="font-size:20px;font-weight:700;color:#1A1613;margin:6px 0 8px;">
                Dedicated Puja Ceremonies &amp; Vidhis in ${escapeHtml(pageData.city || '')}
              </h2>
              <p style="font-size:14px;color:#6B6355;margin:0;">
                Detailed vidhi guidelines, samagri arrangements, and verified North Indian purohit booking for specific rituals in ${escapeHtml(pageData.city || '')}:
              </p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
              ${relatedCityPages.map(cp => `
                <a href="/services/${cp.slug}" style="display:block;background:#FDFBF7;border:1px solid #EAE5D9;border-radius:12px;padding:18px;text-decoration:none;">
                  <h3 style="font-size:15px;font-weight:700;color:#BD4B23;margin:0 0 6px;">
                    ${escapeHtml(cp.primaryService || cp.service)} in ${escapeHtml(pageData.city || '')} &rarr;
                  </h3>
                  <p style="font-size:13px;color:#6B6355;margin:0;line-height:1.5;">
                    ${escapeHtml(cp.tagline || cp.metaDescription || '')}
                  </p>
                </a>
              `).join('')}
            </div>
          </section>
        ` : ''}

      </main>
      ${footerHtml}
    `;
  }

  // 2. Individual Puja Guide Detail
  if (route === 'puja-guide-detail') {
    const guide = PUJA_GUIDES_DATA.find(g => g.slug === params.slug) || PUJA_GUIDES_DATA[0];

    return `
      ${headerHtml}
      <main style="max-width:960px;margin:0 auto;padding:40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size:13px;color:#6B6355;margin-bottom:24px;">
          <a href="/" style="color:#6B6355;text-decoration:none;">Home</a> &gt;
          <a href="/puja-guides" style="color:#6B6355;text-decoration:none;">Puja Guides</a> &gt;
          <span style="color:#BD4B23;font-weight:600;">${guide.title}</span>
        </nav>

        <article>
          <header style="margin-bottom:32px;">
            <span style="background:#FFF3E0;color:#BD4B23;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;display:inline-block;margin-bottom:12px;">
              ${escapeHtml((guide.category || "vedic").toUpperCase())} GUIDE &bull; ${escapeHtml(guide.readTime || guide.readingTime || "8 min read")}
            </span>
            <h1 style="font-size:32px;font-weight:700;color:#1A1613;margin-bottom:16px;line-height:1.2;">
              ${escapeHtml(guide.title)}
            </h1>
            <p style="font-size:16px;color:#4A4438;line-height:1.7;margin-bottom:16px;">
              ${escapeHtml(guide.summary)}
            </p>
            <div style="font-size:13px;color:#6B6355;border-bottom:1px solid #EAE5D9;padding-bottom:16px;">
              By <strong>${escapeHtml(guide.author || "VedicPanditji Editorial Desk")}</strong> &bull; Published: ${escapeHtml(guide.publishedDate ? guide.publishedDate.split("T")[0] : "2026-10-31")}
            </div>
          </header>

          <nav style="background:#FBF9F5;border:1px solid #EAE5D9;border-radius:12px;padding:20px;margin-bottom:36px;">
            <h2 style="font-size:16px;font-weight:700;margin-bottom:12px;">Table of Contents</h2>
            <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8;">
              ${(guide.sections || []).map(sec => `
                <li><a href="#${sec.id}" style="color:#BD4B23;text-decoration:none;">${escapeHtml(sec.heading || sec.title)}</a></li>
              `).join('')}
            </ul>
          </nav>

          <div style="font-size:15px;color:#2B261F;line-height:1.8;">
            ${(guide.sections || []).map(sec => `
              <section id="${sec.id}" style="margin-bottom:36px;">
                <h2 style="font-size:22px;font-weight:700;color:#1A1613;margin-bottom:14px;">${escapeHtml(sec.heading || sec.title)}</h2>
                <div style="white-space:pre-line;">${escapeHtml(sec.content)}</div>
              </section>
            `).join('')}

            ${guide.samagriItems && guide.samagriItems.length > 0 ? `
              <section style="background:#FDFBF7;border:1px solid #EAE5D9;border-radius:12px;padding:24px;margin-bottom:36px;">
                <h2 style="font-size:20px;font-weight:700;color:#1A1613;margin-bottom:14px;">Essential Samagri Checklist</h2>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;font-size:13px;">
                  ${guide.samagriItems.map(item => `
                    <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:8px;padding:10px 14px;">
                      <strong>${escapeHtml(item.name)}:</strong> ${escapeHtml(item.qty)}
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            ${guide.faqs && guide.faqs.length > 0 ? `
              <section style="margin-bottom:36px;">
                <h2 style="font-size:20px;font-weight:700;color:#1A1613;margin-bottom:16px;">Frequently Asked Questions</h2>
                <div style="display:flex;flex-direction:column;gap:14px;">
                  ${guide.faqs.map(f => `
                    <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:10px;padding:16px 20px;">
                      <h3 style="font-size:15px;font-weight:700;color:#1A1613;margin-bottom:6px;">${escapeHtml(f.q || f.question)}</h3>
                      <p style="font-size:13px;color:#4A4438;line-height:1.6;margin:0;">${escapeHtml(f.a || f.answer)}</p>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </div>

          <div style="background:#FFF8F0;border:1px solid #F5D5B3;border-radius:16px;padding:28px;text-align:center;margin-top:40px;">
            <h3 style="font-size:20px;font-weight:700;color:#BD4B23;margin-bottom:10px;">Planning this Ceremony in Pune or PCMC?</h3>
            <p style="font-size:14px;color:#4A4438;margin-bottom:18px;">Book verified Gurukul-trained North Indian &amp; Bihari Pandits with authentic Sanskrit mantras, Hindi Katha, and pure samagri.</p>
            <a href="tel:+919766880979" style="background:#BD4B23;color:#FFFFFF;padding:12px 24px;border-radius:24px;text-decoration:none;font-weight:600;display:inline-block;">📞 Consult Acharya on +91 97668 80979</a>
          </div>
        </article>
      </main>
      ${footerHtml}
    `;
  }

  // 3. Puja Guides Hub Page (/puja-guides)
  if (route === 'puja-guides-hub' || route === 'puja-guides') {
    return `
      ${headerHtml}
      <main style="max-width:1200px;margin:0 auto;padding:40px 24px;">
        <nav aria-label="Breadcrumb" style="font-size:13px;color:#6B6355;margin-bottom:24px;">
          <a href="/" style="color:#6B6355;text-decoration:none;">Home</a> &gt;
          <span style="color:#BD4B23;font-weight:600;">Puja Guides Hub</span>
        </nav>

        <section style="margin-bottom:40px;">
          <h1 style="font-size:32px;font-weight:700;color:#1A1613;margin-bottom:14px;">
            Hindu Puja &amp; Vedic Ritual Guides
          </h1>
          <p style="font-size:16px;color:#4A4438;line-height:1.7;max-width:850px;">
            Authoritative, scripturally grounded educational guides on Hindu ceremonies, Griha Pravesh vidhi, Satyanarayan Katha, Vastu Shanti procedures, havan mantras, and samagri requirements. Written for devotees seeking authentic ritual clarity.
          </p>
        </section>

        <section style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:24px;">
          ${PUJA_GUIDES_DATA.map(g => `
            <article style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span style="background:#FFF3E0;color:#BD4B23;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:600;display:inline-block;margin-bottom:12px;">
                  ${escapeHtml(g.category.toUpperCase())} &bull; ${escapeHtml(g.readTime)}
                </span>
                <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;line-height:1.3;">
                  <a href="/puja-guides/${g.slug}" style="color:#1A1613;text-decoration:none;">${escapeHtml(g.title)}</a>
                </h2>
                <p style="font-size:13px;color:#6B6355;line-height:1.6;margin-bottom:16px;">
                  ${escapeHtml(g.summary)}
                </p>
              </div>
              <a href="/puja-guides/${g.slug}" style="font-size:13px;font-weight:600;color:#BD4B23;text-decoration:none;">Read Full Guide &rarr;</a>
            </article>
          `).join('')}
        </section>
      </main>
      ${footerHtml}
    `;
  }

  // 4. Individual Service Detail (/services/:id)
  if (route === 'service-detail') {
    const service = SERVICES.find(s => s.id === params.serviceId) || SERVICES[0];
    const pricing = getPricingDisplay ? getPricingDisplay(service.id) : null;

    return `
      ${headerHtml}
      <main style="max-width:1200px;margin:0 auto;padding:40px 24px;">
        <nav aria-label="${escapeHtml(t('service.breadcrumb.label'))}" style="font-size:13px;color:#6B6355;margin-bottom:24px;">
          <a href="${lp('/')}" style="color:#6B6355;text-decoration:none;">${escapeHtml(t('service.breadcrumb.home'))}</a> &gt;
          <a href="${lp('/services')}" style="color:#6B6355;text-decoration:none;">${escapeHtml(t('service.breadcrumb.ceremonies'))}</a> &gt;
          <span style="color:#BD4B23;font-weight:600;">${service.name}</span>
        </nav>

        <section style="display:grid;grid-template-columns:1fr 340px;gap:36px;margin-bottom:48px;">
          <div>
            <span style="background:#FFF3E0;color:#BD4B23;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:600;display:inline-block;margin-bottom:12px;">
              ${escapeHtml(service.category?.toUpperCase() || t('ssr.vedic-ceremony'))} &bull; ${escapeHtml(service.duration || t('ssr.default-duration'))}
            </span>
            <h1 style="font-size:32px;font-weight:700;color:#1A1613;margin-bottom:16px;">
              ${escapeHtml(service.name)}
            </h1>
            <p style="font-size:16px;color:#4A4438;line-height:1.7;margin-bottom:24px;">
              ${escapeHtml(service.shortDescription || service.description || '')}
            </p>

            <div style="background:#FBF9F5;border:1px solid #EAE5D9;border-radius:12px;padding:24px;margin-bottom:32px;">
              <h2 style="font-size:18px;font-weight:700;color:#1A1613;margin-bottom:12px;">${escapeHtml(t('ssr.vidhi-ritual-procedure'))}</h2>
              <p style="font-size:14px;color:#4A4438;line-height:1.7;">
                ${escapeHtml(service.description || t('ssr.service-description-fallback'))}
              </p>
            </div>

            <h2 style="font-size:20px;font-weight:700;color:#1A1613;margin-bottom:16px;">${escapeHtml(t('ssr.doorstep-availability'))}</h2>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              ${ALL_LOCATIONS.slice(0, 12).map(l => `
                <a href="${lp(`/locations/${l.slug}`)}" style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:600;color:#1A1613;text-decoration:none;">📍 ${escapeHtml(t('ssr.pandit-in', { name: l.name }))}</a>
              `).join('')}
            </div>
          </div>

          <aside style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:16px;padding:24px;height:fit-content;">
            <h3 style="font-size:18px;font-weight:700;margin-bottom:12px;">${escapeHtml(t('ssr.book-pandit-for', { name: service.name }))}</h3>
            <p style="font-size:13px;color:#6B6355;margin-bottom:18px;line-height:1.6;">
              ${escapeHtml(t('ssr.connect-acharya'))}
            </p>
            <div style="background:#FFF3E0;border-radius:10px;padding:14px;margin-bottom:18px;">
              <div style="font-size:12px;color:#6B6355;">${escapeHtml(t('catalogue.dakshina'))}</div>
              <div style="font-size:16px;font-weight:700;color:#BD4B23;">${escapeHtml(pricing?.displayPrice || t('pricing.custom.quote'))}</div>
              ${pricing?.badgeText ? `<div style="font-size:11px;color:#047857;margin-top:4px;">✓ ${escapeHtml(pricing.badgeText)}</div>` : ''}
            </div>
            <div style="background:#FFF3E0;border-radius:10px;padding:14px;margin-bottom:18px;">
              <div style="font-size:12px;color:#6B6355;">${escapeHtml(t('home.counter.languages-label'))}</div>
              <div style="font-size:14px;font-weight:700;color:#BD4B23;">${escapeHtml(t('ssr.hindi-sanskrit'))}</div>
            </div>
            <a href="tel:+919766880979" style="background:#BD4B23;color:#FFFFFF;display:block;text-align:center;padding:12px;border-radius:10px;text-decoration:none;font-weight:600;margin-bottom:10px;">
              📞 ${escapeHtml(t('nav.call-phone', { phone: '+91 97668 80979' }))}
            </a>
            <a href="https://wa.me/919766880979?text=Namaste%2C+I+would+like+to+inquire+about+${encodeURIComponent(service.name)}" target="_blank" rel="noopener noreferrer" style="background:#25D366;color:#FFFFFF;display:block;text-align:center;padding:12px;border-radius:10px;text-decoration:none;font-weight:600;">
              💬 ${escapeHtml(t('ssr.whatsapp-enquiry'))}
            </a>
          </aside>
        </section>
      </main>
      ${footerHtml}
    `;
  }

  // 5. Services Catalogue (/services)
  if (route === 'catalogue' || route === 'services') {
    return `
      ${headerHtml}
      <main style="max-width:1200px;margin:0 auto;padding:40px 24px;">
        <nav aria-label="${escapeHtml(t('service.breadcrumb.label'))}" style="font-size:13px;color:#6B6355;margin-bottom:24px;">
          <a href="${lp('/')}" style="color:#6B6355;text-decoration:none;">${escapeHtml(t('catalogue.breadcrumb.home'))}</a> &gt;
          <span style="color:#BD4B23;font-weight:600;">${escapeHtml(t('ssr.ceremonies-catalogue'))}</span>
        </nav>

        <section style="margin-bottom:40px;">
          <h1 style="font-size:32px;font-weight:700;color:#1A1613;margin-bottom:14px;">
            ${escapeHtml(t('ssr.catalogue-title'))}
          </h1>
          <p style="font-size:16px;color:#4A4438;line-height:1.7;max-width:850px;">
            ${escapeHtml(t('ssr.catalogue-intro'))}
          </p>
        </section>

        <section style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:24px;">
          ${SERVICES.map(s => {
            const pricing = getPricingDisplay ? getPricingDisplay(s.id) : null;
            return `
            <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:16px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <span style="background:#FFF3E0;color:#BD4B23;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:600;display:inline-block;margin-bottom:10px;">
                  ${escapeHtml(s.category?.toUpperCase() || t('ssr.vedic'))} &bull; ${escapeHtml(s.duration || t('ssr.default-duration'))}
                </span>
                <h2 style="font-size:18px;font-weight:700;margin-bottom:10px;">
                  <a href="${lp(`/services/${s.id}`)}" style="color:#1A1613;text-decoration:none;">${escapeHtml(s.name)}</a>
                </h2>
                <p style="font-size:13px;color:#6B6355;line-height:1.6;margin-bottom:12px;">
                  ${escapeHtml(s.shortDescription || '')}
                </p>
                ${pricing ? `<div style="font-size:13px;font-weight:700;color:#BD4B23;margin-bottom:14px;">${escapeHtml(t('service.dakshina.label'))} ${escapeHtml(pricing.displayPrice)}</div>` : ''}
              </div>
              <a href="${lp(`/services/${s.id}`)}" style="font-size:13px;font-weight:600;color:#BD4B23;text-decoration:none;">${escapeHtml(t('ssr.view-vidhi-samagri'))} &rarr;</a>
            </div>
          `;}).join('')}
        </section>
      </main>
      ${footerHtml}
    `;
  }

  // 6. Homepage (/)
  if (route === 'home' || route === '/') {
    return `
      ${headerHtml}
      <main style="max-width:1200px;margin:0 auto;padding:40px 24px;">
        <section style="text-align:center;padding:40px 0 60px;">
          <span style="background:#FFF3E0;color:#BD4B23;padding:6px 16px;border-radius:20px;font-size:13px;font-weight:600;display:inline-block;margin-bottom:16px;">
            🕉️ ${escapeHtml(t('ssr.home-badge-traditions'))} &bull; ${escapeHtml(t('ssr.home-badge-purohits'))}
          </span>
          <h1 style="font-size:38px;font-weight:700;color:#1A1613;margin-bottom:20px;line-height:1.2;">
            ${escapeHtml(t('ssr.home-title'))}
          </h1>
          <p style="font-size:17px;color:#4A4438;line-height:1.7;max-width:800px;margin:0 auto 32px;">
            ${escapeHtml(t('ssr.home-intro'))}
          </p>
          <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;">
            <a href="tel:+919766880979" style="background:#BD4B23;color:#FFFFFF;padding:14px 28px;border-radius:30px;font-size:15px;font-weight:600;text-decoration:none;">
              📞 ${escapeHtml(t('ssr.call-senior-acharya', { phone: '+91 97668 80979' }))}
            </a>
            <a href="${lp('/locations/pandit-in-pune')}" style="background:#FFFFFF;border:1px solid #BD4B23;color:#BD4B23;padding:14px 28px;border-radius:30px;font-size:15px;font-weight:600;text-decoration:none;">
              📍 ${escapeHtml(t('ssr.view-pune-pcmc-localities'))}
            </a>
          </div>
        </section>

        <section style="margin-bottom:60px;">
          <h2 style="font-size:26px;font-weight:700;text-align:center;margin-bottom:32px;">${escapeHtml(t('ssr.key-puja-services'))}</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:20px;">
            ${SERVICES.slice(0, 8).map(s => `
              <div style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:12px;padding:20px;">
                <h3 style="font-size:16px;font-weight:700;color:#BD4B23;margin-bottom:8px;">
                  <a href="${lp(`/services/${s.id}`)}" style="color:#BD4B23;text-decoration:none;">${escapeHtml(s.name)}</a>
                </h3>
                <p style="font-size:13px;color:#6B6355;line-height:1.6;margin-bottom:12px;">${escapeHtml(s.shortDescription || '')}</p>
                <a href="${lp(`/services/${s.id}`)}" style="font-size:13px;font-weight:600;color:#C98A2C;text-decoration:none;">${escapeHtml(t('ssr.vidhi-samagri'))} &rarr;</a>
              </div>
            `).join('')}
          </div>
          <div style="text-align:center;margin-top:24px;">
            <a href="${lp('/services')}" style="font-size:14px;font-weight:600;color:#BD4B23;text-decoration:none;">${escapeHtml(t('ssr.explore-all-ceremonies'))} &rarr;</a>
          </div>
        </section>

        <section style="background:#FDFBF7;border:1px solid #EAE5D9;border-radius:16px;padding:36px;margin-bottom:60px;">
          <h2 style="font-size:24px;font-weight:700;margin-bottom:16px;">${escapeHtml(t('ssr.locality-network'))}</h2>
          <p style="font-size:14px;color:#4A4438;line-height:1.7;margin-bottom:20px;">
            ${escapeHtml(t('ssr.locality-network-intro'))}
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${ALL_LOCATIONS.map(l => `
              <a href="${lp(`/locations/${l.slug}`)}" style="background:#FFFFFF;border:1px solid #EAE5D9;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;color:#1A1613;text-decoration:none;">📍 ${escapeHtml(t('ssr.pandit-in', { name: l.name }))}</a>
            `).join('')}
          </div>
        </section>
      </main>
      ${footerHtml}
    `;
  }

  // 7. General Core Pages (About, Contact, FAQs, etc.)
  return `
    ${headerHtml}
    <main style="max-width:960px;margin:0 auto;padding:40px 24px;">
      <nav aria-label="Breadcrumb" style="font-size:13px;color:#6B6355;margin-bottom:24px;">
        <a href="/" style="color:#6B6355;text-decoration:none;">Home</a> &gt;
        <span style="color:#BD4B23;font-weight:600;">${escapeHtml(meta.title.split('|')[0].trim())}</span>
      </nav>
      <h1 style="font-size:32px;font-weight:700;color:#1A1613;margin-bottom:16px;">
        ${escapeHtml(meta.title.split('|')[0].trim())}
      </h1>
      <p style="font-size:16px;color:#4A4438;line-height:1.7;margin-bottom:24px;">
        ${escapeHtml(meta.description)}
      </p>
      <div style="background:#FBF9F5;border:1px solid #EAE5D9;border-radius:12px;padding:24px;font-size:14px;line-height:1.8;color:#2B261F;">
        <p><strong>Official Business:</strong> VedicPanditji</p>
        <p><strong>Ritual Focus:</strong> Vedic pujas, havans, sanskars, and Shubh Muhurat consultation.</p>
        <p><strong>Languages Supported:</strong> Hindi &amp; Sanskrit</p>
        <p><strong>Direct Inquiries:</strong> Phone: <a href="tel:+919766880979" style="color:#BD4B23;">+91 97668 80979</a> | Email: <a href="mailto:info@vedicpanditji.com" style="color:#BD4B23;">info@vedicpanditji.com</a></p>
      </div>
    </main>
    ${footerHtml}
  `;
}

/**
 * Main execution script
 */
async function run() {
  console.log('🚀 Starting VedicPanditji Static Pre-rendering & SEO Engine...');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found. Please run "vite build" first.');
    process.exit(1);
  }

  const baseHtmlPath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('❌ dist/index.html not found.');
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(baseHtmlPath, 'utf8');

  // Boot Vite SSR server to safely import all project data
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const { BRAND_INFO, SERVICES } = await vite.ssrLoadModule('./src/data/vedicPanditData.js');
  const { MULTI_CITY_SEO_PAGES } = await vite.ssrLoadModule('./src/data/multiCitySeoData.js');
  const { ALL_LOCATIONS } = await vite.ssrLoadModule('./src/data/locations/index.js');
  const { PUJA_GUIDES_DATA } = await vite.ssrLoadModule('./src/data/guides/pujaGuidesData.js');
  const { getSeoMetadata } = await vite.ssrLoadModule('./src/utils/seoMetadata.js');
  const { getPricingDisplay } = await vite.ssrLoadModule('./src/data/pujaPricing.js');
  const { translate, LANGUAGES, localizePath, isTranslatedRoute } = await vite.ssrLoadModule('./src/i18n/index.js');

  const sharedData = { BRAND_INFO, SERVICES, MULTI_CITY_SEO_PAGES, ALL_LOCATIONS, PUJA_GUIDES_DATA, getPricingDisplay, translate, localizePath };

  // Define full public route inventory
  const pages = [
    // Core Static Pages
    { route: 'home', params: {}, path: '' },
    { route: 'about-us', params: {}, path: 'about-us' },
    { route: 'services', params: {}, path: 'services' },
    { route: 'contact', params: {}, path: 'contact' },
    { route: 'faqs', params: {}, path: 'faqs' },
    { route: 'how-it-works', params: {}, path: 'how-it-works' },
    { route: 'puja-materials', params: {}, path: 'puja-materials' },
    { route: 'temple-services', params: {}, path: 'temple-services' },
    { route: 'legal', params: {}, path: 'legal' },
    { route: 'sitemap', params: {}, path: 'sitemap' },
    { route: 'puja-guides-hub', params: {}, path: 'puja-guides' },
    { route: 'not-found', params: {}, path: '404' }
  ];

  // All 20 Location Pages
  for (const loc of ALL_LOCATIONS) {
    pages.push({
      route: 'location-detail',
      params: { slug: loc.slug },
      path: `locations/${loc.slug}`
    });
  }

  // All 24 Multi-City Landing Pages (/services/:slug)
  for (const cityPage of MULTI_CITY_SEO_PAGES) {
    pages.push({
      route: 'seo-landing',
      params: { slug: cityPage.slug },
      path: `services/${cityPage.slug}`
    });
  }

  // All 10 Puja Guides
  for (const guide of PUJA_GUIDES_DATA) {
    pages.push({
      route: 'puja-guide-detail',
      params: { slug: guide.slug },
      path: `puja-guides/${guide.slug}`
    });
  }

  // All 59 Puja Services
  for (const service of SERVICES) {
    pages.push({
      route: 'service-detail',
      params: { serviceId: service.id },
      path: `services/${service.id}`
    });
  }

  console.log(`📦 Generating pre-rendered HTML for ${pages.length} public static routes...`);

  const sitemapUrls = [];
  const renderLangs = Object.values(LANGUAGES).filter((l) => l.enabled).map((l) => l.code);
  const indexableLangs = Object.values(LANGUAGES).filter((l) => l.indexable).map((l) => l.code);
  let written = 0;

  // One pass per (language, page); a flat loop keeps the template literals below at their original indentation.
  for (const { lang, page } of renderLangs.flatMap((lang) => pages.map((page) => ({ lang, page })))) {
    if (lang !== 'en' && !isTranslatedRoute(page.route)) continue;
    const meta = getSeoMetadata(page.route, page.params, lang);

    const enPath = `/${page.path}`.replace(/\/$/, '') || '/';
    const alternates = indexableLangs.length > 1 && isTranslatedRoute(page.route)
      ? [
          ...indexableLangs.map((l) => ({ hreflang: l, href: `${DOMAIN}${localizePath(enPath, l)}` })),
          { hreflang: 'x-default', href: `${DOMAIN}${enPath}` }
        ]
      : [];
    const alternateTags = alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n    ');
    const fontLink = lang !== 'en'
      ? '<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap" rel="stylesheet" />\n'
      : '';

    // Build complete Head tags
    const titleTag = `<title>${escapeHtml(meta.title)}</title>`;
    const metaTags = `
    <meta name="description" content="${sanitizeForMeta(meta.description)}" />
    <link rel="canonical" href="${meta.canonical}" />${alternateTags ? `\n    ${alternateTags}` : ''}
    <meta property="og:title" content="${sanitizeForMeta(meta.ogTitle || meta.title)}" />
    <meta property="og:description" content="${sanitizeForMeta(meta.ogDescription || meta.description)}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:type" content="${meta.ogType || 'website'}" />
    <meta property="og:image" content="${meta.ogImage || `${DOMAIN}/images/vedicpanditji-logo.png`}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${sanitizeForMeta(meta.ogTitle || meta.title)}" />
    <meta name="twitter:description" content="${sanitizeForMeta(meta.ogDescription || meta.description)}" />
    <meta name="twitter:image" content="${meta.ogImage || `${DOMAIN}/images/vedicpanditji-logo.png`}" />
    <meta name="robots" content="${meta.robots || 'index, follow'}" />
    ${meta.schema ? `<script type="application/ld+json">\n${JSON.stringify(meta.schema, null, 2)}\n    </script>` : ''}
    `;

    // Generate crawlable semantic body
    const bodyHtml = buildSemanticBody(page.route, page.params, sharedData, meta, lang);

    // Inject into template
    let html = baseTemplate;
    html = html.replace('<html lang="en">', `<html lang="${lang}">`);
    
    // Replace <title>
    html = html.replace(/<title>.*?<\/title>/is, titleTag);

    // Remove existing generic meta description/canonical/og if present
    html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
    html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
    html = html.replace(/<meta\s+property="og:[^>]*>/gi, '');
    html = html.replace(/<meta\s+name="twitter:[^>]*>/gi, '');

    // Inject head tags before </head>
    html = html.replace('</head>', `${metaTags}${fontLink}\n  </head>`);

    // Inject semantic body into <div id="root"></div>
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    // Target file path
    const langDir = lang === 'en' ? distDir : path.resolve(distDir, lang);
    let targetFilePath;
    if (page.path === '') {
      fs.mkdirSync(langDir, { recursive: true });
      targetFilePath = path.resolve(langDir, 'index.html');
    } else if (page.path === '404') {
      targetFilePath = path.resolve(distDir, '404.html');
    } else {
      const pageDir = path.resolve(langDir, page.path);
      fs.mkdirSync(pageDir, { recursive: true });
      targetFilePath = path.resolve(pageDir, 'index.html');
    }

    fs.writeFileSync(targetFilePath, html, 'utf8');
    written += 1;

    // Add to sitemap if indexable (exclude 404, legal)
    if (meta.robots && !meta.robots.includes('noindex') && page.path !== '404' && page.path !== 'legal') {
      let priority = '0.8';
      let changefreq = 'weekly';

      if (page.path === '') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (page.path.startsWith('locations/')) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (page.path.startsWith('puja-guides/')) {
        priority = '0.85';
        changefreq = 'monthly';
      } else if (page.path.startsWith('services/')) {
        priority = '0.85';
        changefreq = 'weekly';
      }

      sitemapUrls.push({
        loc: meta.canonical,
        lastmod: TODAY,
        changefreq,
        priority,
        alternates
      });
    }
  }

  await vite.close();
  console.log(`✅ Pre-rendered ${written} HTML static files successfully.`);

  // 2. Generate XML Sitemap
  console.log(`🗺️ Generating sitemap.xml with ${sitemapUrls.length} sitemap URLs...`);
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${sitemapUrls.some(u => u.alternates.length) ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : ''}>
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.alternates.length ? `\n${u.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')}` : ''}
  </url>`).join('\n')}
</urlset>
`;

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('✅ sitemap.xml written to dist/ and public/.');

  // 3. Generate robots.txt
  console.log('🤖 Generating robots.txt...');
  const robotsTxt = `# Robots.txt for VedicPanditji (Static Lead-Generation Site)
# Official Domain: https://vedicpanditji.com

User-agent: *
Allow: /
Allow: /assets/
Allow: /images/

# Disallow Private & Development Utility Endpoints
Disallow: /admin
Disallow: /auth/
Disallow: /login
Disallow: /account
Disallow: /404

# Canonical XML Sitemap
Sitemap: ${DOMAIN}/sitemap.xml
`;

  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf8');
  console.log('✅ robots.txt written to dist/ and public/.');

  console.log('🎉 Static pre-rendering and SEO asset generation complete!');
}

run().catch(err => {
  console.error('❌ Pre-rendering failed:', err);
  process.exit(1);
});
