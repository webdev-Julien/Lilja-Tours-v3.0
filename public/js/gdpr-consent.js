/**
 * GDPR Cookie Consent Manager
 * Manages user cookie preferences and conditionally loads tracking scripts
 */

(function() {
  'use strict';

  const CONSENT_KEY = 'lilja-tours-cookie-consent';
  const CONSENT_VERSION = '1.0';

  // Cookie Consent Manager
  const CookieConsent = {
    // Check if user has already given consent
    hasConsent: function() {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) return null;

      try {
        const data = JSON.parse(consent);
        return data.version === CONSENT_VERSION ? data : null;
      } catch (e) {
        return null;
      }
    },

    // Save user consent preferences
    saveConsent: function(analytics, marketing) {
      const consent = {
        version: CONSENT_VERSION,
        analytics: analytics,
        marketing: marketing,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
      return consent;
    },

    // Remove consent (for testing or user request)
    removeConsent: function() {
      localStorage.removeItem(CONSENT_KEY);
    },

    // Load Google Analytics
    loadGoogleAnalytics: function() {
      // Check if already loaded
      if (window.gtag) return;

      // Create and append gtag script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-48C94854K2';
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-48C94854K2', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });

      console.log('Google Analytics loaded with user consent');
    },

    // Create and show cookie banner
    showBanner: function() {
      // Check if banner already exists
      if (document.getElementById('gdpr-cookie-banner')) return;

      const banner = document.createElement('div');
      banner.id = 'gdpr-cookie-banner';
      banner.innerHTML = `
        <div class="gdpr-overlay"></div>
        <div class="gdpr-banner">
          <div class="gdpr-content">
            <h3 class="gdpr-title">We Value Your Privacy</h3>
            <p class="gdpr-text">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
              By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our
              <a href="/privacy-policy/" class="gdpr-link">Privacy Policy</a>.
            </p>
            <div class="gdpr-buttons">
              <button id="gdpr-accept-all" class="gdpr-btn gdpr-btn-primary">Accept All</button>
              <button id="gdpr-accept-essential" class="gdpr-btn gdpr-btn-secondary">Essential Only</button>
              <button id="gdpr-customize" class="gdpr-btn gdpr-btn-text">Customize</button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(banner);

      // Add event listeners
      document.getElementById('gdpr-accept-all').addEventListener('click', () => {
        this.acceptAll();
      });

      document.getElementById('gdpr-accept-essential').addEventListener('click', () => {
        this.acceptEssential();
      });

      document.getElementById('gdpr-customize').addEventListener('click', () => {
        this.showCustomizeModal();
      });

      // Prevent scrolling when banner is open
      document.body.style.overflow = 'hidden';
    },

    // Hide banner
    hideBanner: function() {
      const banner = document.getElementById('gdpr-cookie-banner');
      if (banner) {
        banner.remove();
        document.body.style.overflow = '';
      }
    },

    // Accept all cookies
    acceptAll: function() {
      this.saveConsent(true, true);
      this.loadGoogleAnalytics();
      this.hideBanner();
      this.hideCustomizeModal();
    },

    // Accept only essential cookies
    acceptEssential: function() {
      this.saveConsent(false, false);
      this.hideBanner();
      this.hideCustomizeModal();
    },

    // Show customize modal
    showCustomizeModal: function() {
      // Check if modal already exists
      if (document.getElementById('gdpr-customize-modal')) return;

      const modal = document.createElement('div');
      modal.id = 'gdpr-customize-modal';
      modal.innerHTML = `
        <div class="gdpr-modal-overlay"></div>
        <div class="gdpr-modal">
          <div class="gdpr-modal-header">
            <h3 class="gdpr-modal-title">Cookie Preferences</h3>
            <button id="gdpr-modal-close" class="gdpr-modal-close">&times;</button>
          </div>
          <div class="gdpr-modal-content">
            <div class="gdpr-cookie-category">
              <div class="gdpr-category-header">
                <div>
                  <h4 class="gdpr-category-title">Essential Cookies</h4>
                  <p class="gdpr-category-desc">Required for the website to function properly. Cannot be disabled.</p>
                </div>
                <label class="gdpr-toggle">
                  <input type="checkbox" checked disabled>
                  <span class="gdpr-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="gdpr-cookie-category">
              <div class="gdpr-category-header">
                <div>
                  <h4 class="gdpr-category-title">Analytics Cookies</h4>
                  <p class="gdpr-category-desc">Help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                </div>
                <label class="gdpr-toggle">
                  <input type="checkbox" id="gdpr-analytics-toggle">
                  <span class="gdpr-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div class="gdpr-cookie-category">
              <div class="gdpr-category-header">
                <div>
                  <h4 class="gdpr-category-title">Marketing Cookies</h4>
                  <p class="gdpr-category-desc">Used to track visitors across websites to display relevant advertisements.</p>
                </div>
                <label class="gdpr-toggle">
                  <input type="checkbox" id="gdpr-marketing-toggle">
                  <span class="gdpr-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="gdpr-modal-footer">
            <button id="gdpr-save-preferences" class="gdpr-btn gdpr-btn-primary">Save Preferences</button>
            <button id="gdpr-accept-all-modal" class="gdpr-btn gdpr-btn-secondary">Accept All</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Add event listeners
      document.getElementById('gdpr-modal-close').addEventListener('click', () => {
        this.hideCustomizeModal();
      });

      document.getElementById('gdpr-save-preferences').addEventListener('click', () => {
        const analytics = document.getElementById('gdpr-analytics-toggle').checked;
        const marketing = document.getElementById('gdpr-marketing-toggle').checked;
        this.saveConsent(analytics, marketing);

        if (analytics) {
          this.loadGoogleAnalytics();
        }

        this.hideBanner();
        this.hideCustomizeModal();
      });

      document.getElementById('gdpr-accept-all-modal').addEventListener('click', () => {
        this.acceptAll();
      });

      // Close on overlay click
      modal.querySelector('.gdpr-modal-overlay').addEventListener('click', () => {
        this.hideCustomizeModal();
      });
    },

    // Hide customize modal
    hideCustomizeModal: function() {
      const modal = document.getElementById('gdpr-customize-modal');
      if (modal) {
        modal.remove();
      }
    },

    // Initialize
    init: function() {
      const consent = this.hasConsent();

      if (consent === null) {
        // No consent yet, show banner
        this.showBanner();
      } else {
        // Has consent, load appropriate scripts
        if (consent.analytics) {
          this.loadGoogleAnalytics();
        }
      }

      // Expose global function to manage cookies
      window.manageCookiePreferences = () => {
        this.showCustomizeModal();
      };
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
  } else {
    CookieConsent.init();
  }

})();
