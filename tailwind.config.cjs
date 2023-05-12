module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Kristi: ["Kristi", "sans-serif"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      colors: {
        "primary-contrast": "#FFCB77",
        "primary-text": "#FFFFFF",
        "secondary-text": "#FFCB77",
        "primary-background": "#0D171E",
        "secondary-background": "#091014",
        "button-text": "#FFFFFF",
        "button-background": "#3E321E",
        "button-border": "#DCAA64",
        disabled: "#FFCB77",
      },
    },
  },
  plugins: [],
};
