// Site Configuration
// Edit this file to update navigation, banner, and site-wide settings

const siteConfig = {
  // Site Information
  siteName: "2025 交大校友会",
  siteTitle: "Alumni Association Annual Event",

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
      icon: "fa-home"
    },
    {
      name: "President Message",
      href: "president.html",
      icon: "fa-user-tie"
    },
    {
      name: "Program",
      href: "program.html",
      icon: "fa-calendar-alt"
    },
    {
      name: "Performers",
      href: "performers.html",
      icon: "fa-music"
    },
    {
      name: "Gallery",
      href: "gallery.html",
      icon: "fa-images"
    },
    {
      name: "Articles",
      href: "articles.html",
      icon: "fa-newspaper"
    },
    {
      name: "Sponsors",
      href: "sponsors.html",
      icon: "fa-handshake"
    },
    {
      name: "Congratulations",
      href: "letters.html",
      icon: "fa-envelope"
    },
    {
      name: "Team",
      href: "team.html",
      icon: "fa-users"
    },
    {
      name: "Awards",
      href: "awards.html",
      icon: "fa-trophy"
    }
  ],

  // Footer Configuration
  footer: {
    copyrightYear: 2025,
    organizationName: "交大校友会",
    tagline: "Alumni Association Annual Event",
    socialLinks: [
      {
        name: "Facebook",
        icon: "fab fa-facebook",
        url: "#"
      },
      {
        name: "Twitter",
        icon: "fab fa-twitter",
        url: "#"
      },
      {
        name: "Instagram",
        icon: "fab fa-instagram",
        url: "#"
      },
      {
        name: "LinkedIn",
        icon: "fab fa-linkedin",
        url: "#"
      }
    ],
    contactInfo: {
      email: "alumni@example.com",
      phone: "+1 (555) 123-4567"
    }
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
