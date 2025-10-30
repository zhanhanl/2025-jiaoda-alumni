// Site Configuration
// Edit this file to update navigation, banner, and site-wide settings

const siteConfig = {
  // Site Information
  siteName: "2025 交通大学南加州校友会年会",
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
  navigation: [
    {
      name: "Home",
      href: "../home.html",
    },
    {
      name: "贺函",
      href: "letters.html",
    },
    {
      name: "致辞",
      href: "president.html",
    },
    {
      name: "团队",
      href: "team.html",
    },
    {
      name: "2025年度奖项",
      href: "awards.html",
    },
    {
      name: "年会安排",
      href: "program.html",
    },
    {
      name: "演出节目单",
      href: "performers.html",
    },
    {
      name: "校友会活动",
      href: "events/index.html",
    },
    {
      name: "俱乐部活动",
      href: "club-activity.html",
    },
    {
      name: "校友来稿",
      href: "articles/index.html",
    },
    {
      name: "校友会历史",
      href: "association-history.html",
    },
    {
      name: "致谢",
      href: "sponsors.html",
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
