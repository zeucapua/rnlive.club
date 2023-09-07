/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        slice: ["Slice"],
        jakarta: ["Plus-Jakarta-Sans"]
      }
    }
  },
  plugins: []
};
