module.exports = {
  content: ["./views/**/*.ejs", "./*.js"], // Update this line to match the file extensions used in your project
  theme: {
    extend: {
      backgroundColor: {
        'gray-900': '#1F1F1F', // Add your desired grayish-black color
      },
      textColor: {
        'red-accent': '#ff3b30', // Add your desired red accent color
      },
      fontFamily: {
        // Add custom fonts, if needed
      },
      // Add any other customizations you need
    },
  },
  variants: {},
  plugins: [],
};
