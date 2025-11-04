// Site Configuration
// Edit this file to update navigation, banner, and site-wide settings

// Auto-detect base path for GitHub Pages vs local development
const getBasePath = () => {
  const hostname = window.location.hostname;
  // If on GitHub Pages, use repository name; otherwise use empty string for local
  if (hostname.includes('github.io')) {
    return '/2025-jiaoda-alumni';
  }
  return '';
};

const basePath = getBasePath();

const siteConfig = {
  // Base path for URLs (auto-detected)
  basePath: basePath,

  // Site Information
  siteName: "交通大学南加州校友会年会",
  siteTitle: "2025 八十二周年年会",

  // Banner Configuration (set enabled to true to show banner on all pages)
  banner: {
    enabled: false,
    text: "Join us for the 2025 Annual Alumni Event! Register now →",
    link: "#",
    backgroundColor: "#4169E1",
    textColor: "#ffffff"
  },

  // Navigation Items
  // To add a page: Add a new object to this array
  // To reorder: Rearrange the objects
  // To remove: Delete or comment out the object
  // NOTE: Uses basePath which auto-detects GitHub Pages vs local
  navigation: [
    {
      name: "首页",
      href: `${basePath}/home.html`,
    },
    {
      name: "贺函",
      href: `${basePath}/pages/letters/index.html`,
    },
    {
      name: "工作团队",
      href: `${basePath}/pages/team/index.html`,
    },
    {
      name: "优秀校友",
      href: `${basePath}/pages/awards/index.html`,
    },
    {
      name: "年会安排      (SCEPTRE 赞助）",
      href: `${basePath}/pages/program/index.html`,
    },

    {
      name: "科技论坛      (Zoooom 赞助)",
      href: `${basePath}/pages/forum/index.html`,
    },
    {
      name: "演出节目单   (Longfri 赞助)",
      href: `${basePath}/pages/performers/index.html`,
    },
    {
      name: "校友会活动   (GMCC 赞助)",
      href: `${basePath}/pages/events/index.html`,
    },
    {
      name: "俱乐部活动   (硅谷净洁室设计院 赞助)",
      href: `${basePath}/pages/club-activity/index.html`,
    },
    {
      name: "校友来稿      (止观会馆 赞助)",
      href: `${basePath}/pages/articles/index.html`,
    },
    {
      name: "校友会历史   (Bytemelodies 赞助)",
      href: `${basePath}/pages/history/index.html`,
    },

    // {
    //   name: "GMCC万通贷款 赞助页",
    //   href: `${basePath}/pages/sponsor-ad-gmcc/index.html`,
    // },
    {
      name: "致谢",
      href: `${basePath}/pages/sponsors/index.html`,
    },
    {
      name: "",
      href: null,
      separator: true,
      divider: true  // Visual divider style
    },

    {
      name: "AQX Engineering",
      href: `${basePath}/pages/sponsor-ad-aqx/index.html`,
    },
    {
      name: "GCW舞蹈工作室",
      href: `${basePath}/pages/sponsor-ad-gcw/index.html`,
    },
    {
      name: "ResAI",
      href: `${basePath}/pages/sponsor-ad-resai/index.html`,
    },
    {
      name: "GSM 群星传媒",
      href: `${basePath}/pages/sponsor-ad-gsm/index.html`,
    },
    {
      name: "秋金川味小炒",
      href: `${basePath}/pages/sponsor-ad-qjkitchen/index.html`,
    },

    {
      name: "Powered by Bytemelodies",
      href: null,
      separator: false,
      divider: false  // Visual divider style
    },

  ],

  // Footer Configuration
  footer: {
    copyrightYear: 2025,
    organizationName: "交通大学南加州校友会",
    tagline: "2025 八十二周年年会",
    contactInfo: {
      email: "alumni@example.com",
      phone: "+1 (555) 123-4567"
    }
  },

  // Sponsors Configuration - SIMPLIFIED
  // =====================================
  // Single sponsor image containing all sponsors
  // Located at: assets/images/sponsor.png
  // All styling is in footer.css
  // =====================================
  sponsors: {
    // Main thank you message (optional - set to null or empty to hide)
    thankYouMessage: "感谢赞助",

    // Single sponsor image file (in assets/images/)
    image: "sponsor.png"
  },

  // Sponsor Banner Configuration (for article pages)
  // =====================================
  // Floating banner that appears below navbar on specific pages
  // =====================================
  sponsorBanner: {
    // Enable/disable sponsor banner on article detail pages
    enabled: true,

    // Logo image (relative to page location) - can be overridden per page
    logo: "sponsor/logo.png",

    // Link when clicking the logo (optional, set to null for no link)
    linkTo: "../sponsor-ad-gsm/index.html",

    // Alt text for logo
    altText: "Sponsor",

    // Position settings
    height: "80px",           // Desktop height
    heightMobile: "60px",     // Mobile height
    logoHeight: "50px",       // Desktop logo height
    logoHeightMobile: "70px", // Mobile logo height

    // Pages where banner should appear (can be 'all' or array of page patterns)
    showOnPages: ['article-*.html', 'event-*.html', 'program/index.html'],

    // Page-specific overrides (optional)
    pageOverrides: {
      'program/index.html': {
        logo: 'sp1_logo.png',
        linkTo: null,  // No link for program page
        altText: '赞助商'
      }
    }
  },

  // Color Theme - Complete Design System
  // ======================================
  // These colors are injected as CSS variables via components.js
  // Change here to update the entire site theme
  // ======================================
  theme: {
    // Primary Brand Colors (updated to user's palette)
    // Dark → Light: #03254c, #1167b1, #187bcd, #2a9df4, #d0efff
    primary: "#1167b1",           // Main brand blue
    primaryDark: "#03254c",       // Darker shade for hover states
    primaryLight: "#187bcd",      // Lighter shade for accents

    // Secondary/Supporting Colors
    secondary: "#2a9df4",         // Bright supporting blue
    secondaryDark: "#187bcd",     // Slightly darker for contrast
    secondaryLight: "#d0efff",    // Very light tint

    // Accent Colors
    accent: "#d0efff",            // Light accent from palette
    gold: "#FFD700",              // Gold accent

    // Text Colors
    textDark: "#2c3e50",          // Primary text
    textMedium: "#5a5a5a",        // Secondary text
    textLight: "#7f8c8d",         // Tertiary text
    textLighter: "#95a5a6",       // Disabled/placeholder

    // Background Colors
    bgWhite: "#ffffff",           // Pure white
    bgLight: "#f9fafb",           // Light gray
    bgLighter: "#f8f9fa",         // Lighter gray
    bgGray: "#e9ecef",            // Medium gray

    // Border Colors
    border: "#e0e0e0",            // Default border
    borderLight: "#f0f0f0",       // Light border

    // Status Colors
    success: "#50C878",           // Success green
    warning: "#FFA500",           // Warning orange
    danger: "#FF6B6B",            // Error red
    info: "#20B2AA",              // Info blue

    // Sponsor Tier Colors
    tierDiamond: "#b9f2ff",
    tierPlatinum: "#E5E4E2",
    tierGold: "#FFD700",
    tierSilver: "#C0C0C0",

    // Layout & Spacing
    navbarHeight: "60px",
    sponsorBannerHeight: "80px",

    // Typography
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSizeBase: "16px",

    // Shadows
    shadowSmall: "0 2px 4px rgba(0, 0, 0, 0.08)",
    shadowMedium: "0 4px 12px rgba(17, 63, 103, 0.15)",
    shadowLarge: "0 8px 24px rgba(17, 63, 103, 0.2)",

    // Border Radius
    radiusSmall: "4px",
    radiusMedium: "8px",
    radiusLarge: "12px",

    // Legacy keys for backward compatibility (used by main.js)
    primaryColor: "#1167b1",
    primaryColorDark: "#03254c",
    primaryColorLight: "#187bcd",
    secondaryColor: "#2a9df4",
    accentColor: "#d0efff"
  }
  
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}
