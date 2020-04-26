/*
|-------------------------------------------------------------------------------
| Tailwind – The Utility-First CSS Framework
|-------------------------------------------------------------------------------
|
| Documentation at https://tailwindcss.com
|
*/

/**
 * Global Styles Plugin
 *
 * This plugin modifies Tailwind’s base styles using values from the theme.
 * https://tailwindcss.com/docs/adding-base-styles#using-a-plugin
 */
const globalStyles = ({ addBase, config }) => {
  addBase({
    a: {
      color: config('theme.textColor.primary'),
      textDecoration: 'none',
      borderBottom: '1px solid transparent',
      transition: '0.2s ease',
    },
    'a:hover': {
      borderColor: config('theme.borderColor.primary'),
    },
    p: {
      marginBottom: config('theme.margin.3'),
      lineHeight: config('theme.lineHeight.normal'),
    },
    'h1, h2, h3, h4, h5': {
      marginBottom: config('theme.margin.2'),
      lineHeight: config('theme.lineHeight.tight'),
    },
    h1: { fontSize: config('theme.fontSize.5xl') },
    h2: { fontSize: config('theme.fontSize.4xl') },
    h3: { fontSize: config('theme.fontSize.3xl') },
    h4: { fontSize: config('theme.fontSize.2xl') },
    h5: { fontSize: config('theme.fontSize.xl') },
    'ol, ul': { paddingLeft: config('theme.padding.4') },
    ol: { listStyleType: 'decimal' },
    ul: { listStyleType: 'disc' },
  });
}

/**
 * Configuration
 */
module.exports = {
  theme: {
    colors: {
      primary: '#1a202c',
      white: '#fff',
      black: '#000',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },
      red: {
        100: '#fff5f5',
        200: '#fed7d7',
        300: '#feb2b2',
        400: '#fc8181',
        500: '#f56565',
        600: '#e53e3e',
        700: '#c53030',
        800: '#9b2c2c',
        900: '#742a2a',
      },
      transparent: 'transparent',
    },
    shadows: {
      outline: '0 0 0 3px rgba(82,93,220,0.3)',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '100': '1',
    },
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
      '100000': '100000',
      '100010': '100010',
      '100020': '100020',
      '100030': '100030',
      '100040': '100040',
      '100050': '100050',
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '2/3': '66.666',
      '3/4': '75%',
      'full': '100%',
    },
  },
  variants: {
    // Define variants
  },
  plugins: [
    globalStyles,
  ],
}
