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

    // Determine current page and if we're in a subdirectory
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const pathPrefix = isInPagesFolder ? '' : 'pages/';

    // Build navigation items
    const navItems = siteConfig.navigation.map(item => {
      // Adjust href based on current location
      let href = item.href;
      if (item.name === 'Home') {
        href = isInPagesFolder ? '../home.html' : 'home.html';
      } else {
        // Clean the href first (remove any ../ or pages/ prefix)
        const cleanHref = item.href.replace('../', '').replace('pages/', '').replace('home.html', '');
        // Then add the appropriate prefix
        href = cleanHref ? pathPrefix + cleanHref : (isInPagesFolder ? '../home.html' : 'home.html');
      }

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

    const logoHref = isInPagesFolder ? '../home.html' : 'home.html';

    nav.innerHTML = `
      <nav class="navbar is-fixed-top is-royal-blue" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" href="${logoHref}">
              <strong class="has-text-white is-size-5">${siteConfig.siteName}</strong>
            </a>
            <a role="button" class="navbar-burger has-text-white" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
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

    const socialLinks = siteConfig.footer.socialLinks.map(link => `
      <a href="${link.url}" class="has-text-white mx-2" aria-label="${link.name}">
        <span class="icon is-large">
          <i class="${link.icon} fa-2x"></i>
        </span>
      </a>
    `).join('');

    footer.innerHTML = `
      <footer class="footer has-background-royal-blue">
        <div class="content has-text-centered has-text-white">
          <p class="is-size-5">
            <strong class="has-text-white">${siteConfig.siteName}</strong>
          </p>
          <p>
            ${siteConfig.footer.tagline}<br>
            © ${siteConfig.footer.copyrightYear} ${siteConfig.footer.organizationName}. All Rights Reserved.
          </p>
          <div class="mt-4">
            ${socialLinks}
          </div>
          ${siteConfig.footer.contactInfo ? `
            <div class="mt-4">
              <p class="is-size-7">
                ${siteConfig.footer.contactInfo.email ? `Email: ${siteConfig.footer.contactInfo.email}` : ''}
                ${siteConfig.footer.contactInfo.email && siteConfig.footer.contactInfo.phone ? ' | ' : ''}
                ${siteConfig.footer.contactInfo.phone ? `Phone: ${siteConfig.footer.contactInfo.phone}` : ''}
              </p>
            </div>
          ` : ''}
        </div>
      </footer>
    `;
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
