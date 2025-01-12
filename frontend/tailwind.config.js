import containerQueriesPlugin from '@tailwindcss/container-queries'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  prefix: 'tw-',
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        mono: ['"Cascadia Mono"', '"SF Mono"', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        primary: colors.teal,
        secondary: colors.slate
      },
      boxShadow: {
        around: 'rgba(100, 100, 115, 0.25) 0px 7.5px 30px 0px'
      },
      animation: {
        up: 'up 250ms ease-in-out'
      }
    },
    screens: {
      sm: '576px', // Bootstrap: <576px
      md: '768px', // Bootstrap: ≥576px
      lg: '992px', // Bootstrap: ≥768px
      xl: '1200px', // Bootstrap: ≥992px
      xxl: '1400px' // Bootstrap: ≥1200px
    }
  },
  plugins: [containerQueriesPlugin]
}
