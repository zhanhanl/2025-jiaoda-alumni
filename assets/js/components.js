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
    injectBanner();
    injectNavigation();
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

  // Inject Navigation
  function injectNavigation() {
    const nav = document.getElementById('navbar-container');
    if (!nav) return;

    // Determine current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isInPagesFolder = window.location.pathname.includes('/pages/');

    // Build navigation items
    const navItems = siteConfig.navigation.map(item => {
      // Use href directly from config (absolute paths work from anywhere)
      const href = item.href;

      const isActive = item.href.includes(currentPage) ||
                      (currentPage === 'home.html' && item.name === 'Home');
      const activeClass = isActive ? 'is-active' : '';

      return `
        <a class="navbar-item has-text-white ${activeClass}" href="${href}">
          ${item.icon ? `<span class="icon"><i class="fas ${item.icon}"></i></span>` : ''}
          <span>${item.name}</span>
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

})();
