import { type Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        gray: colors.gray,
      },
    },
  },
  plugins: [],
};

export default config;
