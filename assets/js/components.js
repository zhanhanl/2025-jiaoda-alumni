// Shared Components - Injects navigation, banner, and footer into all pages
// This file loads automatically and builds the page structure from config.js

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
  } else {
    initComponents();
  }

  function initComponents() {
    injectThemeVariables();  // MUST BE FIRST - injects CSS variables from config
    injectBanner();
    injectNavigation();
    injectSponsorBanner();
    injectFooter();
    initMobileMenu();
  }

  // Inject Banner (if enabled in config)
  function injectBanner() {
    if (!siteConfig.banner.enabled) return;

    const banner = document.createElement('div');
    banner.className = 'notification is-banner';
    banner.style.cssText = `
      background-color: ${siteConfig.banner.backgroundColor};
      color: ${siteConfig.banner.textColor};
      text-align: center;
      padding: 1rem;
      margin: 0;
      border-radius: 0;
    `;

    if (siteConfig.banner.link) {
      banner.innerHTML = `
        <a href="${siteConfig.banner.link}" style="color: ${siteConfig.banner.textColor}; text-decoration: underline;">
          ${siteConfig.banner.text}
        </a>
      `;
    } else {
      banner.textContent = siteConfig.banner.text;
    }

    document.body.insertBefore(banner, document.body.firstChild);
  }

  // Inject Sponsor Banner (for article pages)
  function injectSponsorBanner() {
    if (!siteConfig.sponsorBanner || !siteConfig.sponsorBanner.enabled) return;

    // Get current page filename and path
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentPath = window.location.pathname;
    const showOnPages = siteConfig.sponsorBanner.showOnPages || [];

    // Check if current page matches any pattern
    const shouldShow = showOnPages.some(pattern => {
      if (pattern === 'all') return true;
      // Check if pattern includes path (has /)
      if (pattern.includes('/')) {
        return currentPath.includes(pattern);
      }
      // Convert glob pattern to regex (simple version) for filename matching
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
      return regex.test(currentPage);
    });

    if (!shouldShow) return;

    // Check for page-specific overrides
    const overrides = siteConfig.sponsorBanner.pageOverrides || {};
    let pageConfig = { ...siteConfig.sponsorBanner };

    // Find matching override
    for (const [path, override] of Object.entries(overrides)) {
      if (currentPath.includes(path)) {
        pageConfig = { ...pageConfig, ...override };
        break;
      }
    }

    // Find navbar container to insert after it
    const navContainer = document.getElementById('navbar-container');
    if (!navContainer) return;

    // Create sponsor banner section
    const sponsorBanner = document.createElement('section');
    sponsorBanner.className = 'sponsor-banner';

    // Create inner HTML based on whether link is provided
    if (pageConfig.linkTo) {
      sponsorBanner.innerHTML = `
        <div class="container">
          <a href="${pageConfig.linkTo}">
            <img src="${pageConfig.logo}" alt="${pageConfig.altText}" class="sponsor-logo">
          </a>
        </div>
      `;
    } else {
      sponsorBanner.innerHTML = `
        <div class="container">
          <img src="${pageConfig.logo}" alt="${pageConfig.altText}" class="sponsor-logo">
        </div>
      `;
    }

    // Insert after navbar
    navContainer.parentNode.insertBefore(sponsorBanner, navContainer.nextSibling);

    // Add margin to hero section if it exists
    const heroSection = document.querySelector('.hero.is-small');
    if (heroSection) {
      heroSection.style.marginTop = '80px';
    }
  }

  // Inject Navigation
  function injectNavigation() {
    const nav = document.getElementById('navbar-container');
    if (!nav) return;

    // Determine current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isInPagesFolder = window.location.pathname.includes('/pages/');

    // Derive a stable page key for active-state detection
    const pathParts = window.location.pathname.split('/');
    let pageKey = '';
    if (isInPagesFolder) {
      const pagesIndex = pathParts.indexOf('pages');
      if (pagesIndex !== -1 && pagesIndex + 1 < pathParts.length) {
        pageKey = pathParts[pagesIndex + 1] || '';
      }
    }
    if (!pageKey) {
      pageKey = (currentPage || 'home.html').replace('.html', '') || 'home';
    }
    if (pageKey === '' || pageKey === 'index') {
      // If we're at .../pages/<section>/index.html, use the folder name
      const pagesIndex = pathParts.indexOf('pages');
      if (pagesIndex !== -1 && pagesIndex + 1 < pathParts.length) {
        pageKey = pathParts[pagesIndex + 1] || 'home';
      } else {
        pageKey = 'home';
      }
    }

    // Build navigation items
    const navItems = siteConfig.navigation.map(item => {
      // Handle separator items (non-clickable)
      if (item.separator || !item.href) {
        if (item.divider) {
          // Check if name is empty or just dashes/whitespace
          const isEmpty = !item.name || item.name.trim() === '' || /^[—\-_\s]+$/.test(item.name);

          if (isEmpty) {
            // Just show the golden line without text
            return `
              <div class="navbar-item" style="cursor: default; pointer-events: none; padding: 0.5rem 1rem;">
                <div style="
                  border-top: 2px solid rgba(255, 215, 0, 0.5);
                  width: 100%;
                "></div>
              </div>
            `;
          } else {
            // Divider style with horizontal line and text
            return `
              <div class="navbar-item" style="cursor: default; pointer-events: none; padding: 0.5rem 1rem;">
                <div style="
                  border-top: 2px solid rgba(255, 215, 0, 0.5);
                  padding-top: 0.5rem;
                  color: #ffd700;
                  font-size: 0.85rem;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                ">
                  ${item.name}
                </div>
              </div>
            `;
          }
        } else {
          // Simple text separator
          return `
            <div class="navbar-item has-text-white" style="cursor: default; pointer-events: none; opacity: 0.7;">
              <span>${item.name}</span>
            </div>
          `;
        }
      }

      // Use href directly from config (absolute paths work from anywhere)
      const href = item.href;

      // Compute item key comparable to pageKey (strip folders/extensions)
      let itemHref = item.href.replace('../', '').replace('pages/', '');
      if (!itemHref) itemHref = 'home.html';
      const itemKey = itemHref.replace('/index.html', '').replace('.html', '') || 'home';
      const isActive = (itemKey === pageKey) || (pageKey === 'home' && item.name === 'Home');
      const activeClass = isActive ? 'is-active' : '';

      // Preserve whitespace in the name
      return `
        <a class="navbar-item has-text-white ${activeClass}" href="${href}">
          ${item.icon ? `<span class="icon"><i class="fas ${item.icon}"></i></span>` : ''}
          <span style="white-space: pre;">${item.name}</span>
        </a>
      `;
    }).join('');

    // Logo always links to home (uses basePath for local/GitHub Pages compatibility)
    const logoHref = `${siteConfig.basePath}/home.html`;

    nav.innerHTML = `
      <nav class="navbar is-fixed-top is-royal-blue" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu" >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>

            <a class="navbar-item" href="${logoHref}">
              <strong class="has-text-white is-size-4">${siteConfig.siteName}</strong>
            </a>

          </div>

          <div id="navbarMenu" class="navbar-menu">
            <div class="navbar-end">
              ${navItems}
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  // Inject Footer
  function injectFooter() {
    const footer = document.getElementById('footer-container');
    if (!footer) return;

    // Build sponsors section
    const sponsorsHTML = buildSponsorsSection();

    footer.innerHTML = `
      <footer class="footer has-background-white" style="border-top: 2px solid var(--primary);">

        <div class="content has-text-centered">
          <!-- Sponsors Section -->
          ${sponsorsHTML}

 
          <p class="has-text-primary">
            ${siteConfig.footer.tagline}<br>
            © ${siteConfig.footer.copyrightYear} ${siteConfig.footer.organizationName}. All Rights Reserved.
          </p>
        </div>
      </footer>
    `;
  }

  // Build Sponsors Section for Footer
  // This function injects a single sponsor image
  // All styling is controlled by footer.css
  function buildSponsorsSection() {
    if (!siteConfig.sponsors || !siteConfig.sponsors.image) return '';

    let html = '<div class="footer-sponsors">';

    // Add main thank you message if it exists
    if (siteConfig.sponsors.thankYouMessage) {
      html += `<div class="sponsor-thank-you">${siteConfig.sponsors.thankYouMessage}</div>`;
    }

    // Add single sponsor image using basePath for local/GitHub Pages compatibility
    const imgPath = `${siteConfig.basePath}/assets/images/${siteConfig.sponsors.image}`;
    html += `<div class="sponsor-image-container">`;
    html += `<img src="${imgPath}" alt="Sponsors" class="sponsor-image">`;
    html += `</div>`;

    html += '</div>';
    return html;
  }

  // Initialize Mobile Menu
  function initMobileMenu() {
    // Mobile navbar burger toggle
    const burgers = document.querySelectorAll('.navbar-burger');

    burgers.forEach(burger => {
      burger.addEventListener('click', () => {
        const target = burger.dataset.target;
        const menu = document.getElementById(target);

        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      });
    });

    // Close mobile menu when clicking on a link
    const navbarLinks = document.querySelectorAll('.navbar-item');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarBurger = document.querySelector('.navbar-burger');

    navbarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarMenu && navbarMenu.classList.contains('is-active')) {
          navbarMenu.classList.remove('is-active');
          if (navbarBurger) {
            navbarBurger.classList.remove('is-active');
          }
        }
      });
    });
  }

  // Inject CSS Custom Properties from config.js theme
  function injectThemeVariables() {
    if (!siteConfig.theme) return;

    const root = document.documentElement;
    const theme = siteConfig.theme;

    // Primary colors
    root.style.setProperty('--primary', theme.primary || '#113F67');
    root.style.setProperty('--primary-dark', theme.primaryDark || '#0a2a45');
    root.style.setProperty('--primary-light', theme.primaryLight || '#34699A');

    // Aliases for backwards compatibility
    root.style.setProperty('--royal-blue', theme.primary || '#113F67');
    root.style.setProperty('--royal-blue-dark', theme.primaryDark || '#0a2a45');
    root.style.setProperty('--royal-blue-light', theme.primaryLight || '#34699A');

    // Secondary colors
    root.style.setProperty('--secondary', theme.secondary || '#58A0C8');
    root.style.setProperty('--secondary-dark', theme.secondaryDark || '#4088b0');
    root.style.setProperty('--secondary-light', theme.secondaryLight || '#7ab8d9');

    // Accent colors
    root.style.setProperty('--accent', theme.accent || '#FDF5AA');
    root.style.setProperty('--gold', theme.gold || '#FFD700');

    // Text colors
    root.style.setProperty('--text-dark', theme.textDark || '#2c3e50');
    root.style.setProperty('--text-medium', theme.textMedium || '#5a5a5a');
    root.style.setProperty('--text-light', theme.textLight || '#7f8c8d');
    root.style.setProperty('--text-lighter', theme.textLighter || '#95a5a6');

    // Background colors
    root.style.setProperty('--bg-white', theme.bgWhite || '#ffffff');
    root.style.setProperty('--bg-light', theme.bgLight || '#f9fafb');
    root.style.setProperty('--bg-lighter', theme.bgLighter || '#f8f9fa');
    root.style.setProperty('--bg-gray', theme.bgGray || '#e9ecef');

    // Border colors
    root.style.setProperty('--border', theme.border || '#e0e0e0');
    root.style.setProperty('--border-light', theme.borderLight || '#f0f0f0');

    // Status colors
    root.style.setProperty('--success', theme.success || '#50C878');
    root.style.setProperty('--warning', theme.warning || '#FFA500');
    root.style.setProperty('--danger', theme.danger || '#FF6B6B');
    root.style.setProperty('--info', theme.info || '#20B2AA');

    // Sponsor tier colors
    root.style.setProperty('--tier-diamond', theme.tierDiamond || '#b9f2ff');
    root.style.setProperty('--tier-platinum', theme.tierPlatinum || '#E5E4E2');
    root.style.setProperty('--tier-gold', theme.tierGold || '#FFD700');
    root.style.setProperty('--tier-silver', theme.tierSilver || '#C0C0C0');

    // Layout
    root.style.setProperty('--navbar-height', theme.navbarHeight || '60px');
    root.style.setProperty('--sponsor-banner-height', theme.sponsorBannerHeight || '80px');

    // Typography
    if (theme.fontFamily) {
      root.style.setProperty('--font-family', theme.fontFamily);
    }
    if (theme.fontSizeBase) {
      root.style.setProperty('--font-size-base', theme.fontSizeBase);
    }

    // Shadows
    if (theme.shadowSmall) root.style.setProperty('--shadow-sm', theme.shadowSmall);
    if (theme.shadowMedium) root.style.setProperty('--shadow-md', theme.shadowMedium);
    if (theme.shadowLarge) root.style.setProperty('--shadow-lg', theme.shadowLarge);

    // Border radius
    if (theme.radiusSmall) root.style.setProperty('--radius-sm', theme.radiusSmall);
    if (theme.radiusMedium) root.style.setProperty('--radius-md', theme.radiusMedium);
    if (theme.radiusLarge) root.style.setProperty('--radius-lg', theme.radiusLarge);

    console.log('✅ Theme variables injected from config.js:', Object.keys(theme).length + ' properties');
  }


})();
