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
      name: "2025年度奖项",
      href: `${basePath}/pages/awards/index.html`,
    },
    {
      name: "年会安排",
      href: `${basePath}/pages/program/index.html`,
    },
    {
      name: "演出节目单",
      href: `${basePath}/pages/performers/index.html`,
    },
    {
      name: "校友会活动",
      href: `${basePath}/pages/events/index.html`,
    },
    {
      name: "俱乐部活动",
      href: `${basePath}/pages/club-activity/index.html`,
    },
    {
      name: "校友来稿",
      href: `${basePath}/pages/articles/index.html`,
    },
    {
      name: "校友会历史",
      href: `${basePath}/pages/history/index.html`,
    },
    {
      name: "致谢",
      href: `${basePath}/pages/sponsors/index.html`,
    }

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

  // Color Theme
  theme: {
    primaryColor: "#113F67",      // Deep Navy
    primaryColorDark: "#0a2a45",  // Darker Navy
    primaryColorLight: "#34699A", // Medium Blue
    secondaryColor: "#58A0C8",    // Light Blue
    accentColor: "#FDF5AA"        // Cream Yellow
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}
