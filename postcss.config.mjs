import daisyui from "daisyui";

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      plugins: [daisyui],
      daisyui: {
        themes: ["light", "dark"],
      },
    },
  },
};

export default config;
