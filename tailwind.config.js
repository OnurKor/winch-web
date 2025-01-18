/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xsm: { max: "375px" },
        sm: "375px",
        md: "640px",
        lg: "768px",
        xl: "1024px",
        mxl: "1080px",
        xxl: "1536px",
      },
      fontFamily: {
        jost: ["var(--jost)"],
      },
      maxWidth: {
        850: "850px !important",
      },
      fontSize: {
        "display-large": ["60px", "86.7px"],
        "display-medium": ["40px", "57.8px"],
        "display-small": ["36px", "52px"],
        "headline-large": ["30px", "43.4px"],
        "headline-medium": ["26px", "37.6px"],
        "headline-small": ["22px", "30px"],
        "title-large": ["20px", "30px"],
        "title-medium": ["18px", "30px"],
        "title-small": ["16px", "24px"],
        "title-m-small": ["16px", "30px"],
        "label-medium": ["15px", "21.7px"],
        "label-small": ["14px", "20px"],
        "body-large": ["15px", "20px"],
        "body-medium": ["14px", "20px"],
        "body-small": ["12px", "16px"],
        "body-xsmall": ["10px", "16px"],
      },
      fontWeight: {
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      lineHeight: {
        tight: "1.1",
        normal: "1.25",
        relaxed: "1.5",
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0em",
        wide: "0.02em",
      },
      backgroundColor: {
        grey: "#DDDDDD",
        white: "#FFFFFF",
      },
      borderColor: {
        kozy: "#4A5568",
        kozyWhite: "#DDDDDD",
      },
      borderRadius: {
        xsmall: "4px",
        small: "8px", // Relatively small containers için 8px border radius
        medium:"12px",
        large: "16px", // Main containers için 16px border radius
      },
      boxShadow: {
        custom: "0px 10px 35px 0px rgba(5, 16, 54, 0.1)",
        badge: "3px 4px 4px 0 rgba(0,0,0,0.25)",
        none: "none",
        extensive: "0px 10px 60px 0px rgba(5, 16, 54, 0.05)",
      },
      colors: {
        turna:"#60A5FA",
        cosmic: "#FFF8DD",
        philippine: "#FFC700",
        lavender: "#E5F0FD",
        paradise: "#F1416C",
        snow: "#FFF5F8",
        honey: "#EBFCEA",
        raisin: "#1F2124",
        default: "#051036",
        secondary: "#697488",
        darkkozy: "#002E63",
        kozy: "#163C8C",
        lightkozy: "#00BDD4",
        whitekozy: "#FFFFFF",
        greykozy: "#F5F5F5",
        kozydarkgrey: "#DDDDDD",
        secondary: "#697488",
        cookie: "#FDFDFD",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
      },
      peer: ['checked'],
      backgroundImage: {
        'home-pattern': "url('/public/assets/card/otel3.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
}