/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      // primary: '#2dd4bf',
      primary: '#8CD630',
      primaryLight: '#76B627',
      secondary: '#171717',
      gray: '#2E2E2E',
      grayLight: '#E4E4E4',
      white: '#ffffff',
      shadow: '#F8F8F8',
      black: '#000000',
      'role-1': '#e0dbfb',
      'role-2': '#7446bf',
      'role-3': '#fce0ad',
      'role-4': '#df8e43',
      'role-5': '#DBFBE7',
      'role-6': '#46BF64',
      'role-7': '#FCADAD',
      'role-8': '#DF4343'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
      large: '12px',
      extra: '36px'
    },
    screens: {
      xs: '375px',
      sm: '640px',
      md: '1024px',
      lg: '1070px',
      xl: '1280px',
      xxl: '1500px'
    },
    fontSize: {
      xxs: '0.6rem',
      xs: '0.7rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    }
  },
  plugins: []
};
