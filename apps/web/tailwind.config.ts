import { type Config } from 'tailwindcss';
import sharedConfig from '@file-platform/ui/tailwind.config';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
};

export default config;
