import type { Config } from 'tailwindcss';
import sharedConfig from '@file-platform/ui/tailwind.config';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        'muted-foreground': '#6b7280',
      },
    },
  },
  plugins: [],
};

export default config;
