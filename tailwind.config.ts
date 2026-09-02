import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2.5rem', '2xl': '3rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        ink: {
          /* Core surfaces */
          base: '#08090B',
          surface: '#101216',
          raised: '#15181D',
          line: '#1E222A',
          lineSoft: '#171A20',
        },
        text: {
          primary: '#F5F5F5',
          muted: '#858993',
          faint: '#7C808B',
        },
        accent: {
          DEFAULT: '#38E1FF',
          soft: '#7DEBFF',
          deep: '#0EA5C6',
          glow: 'rgba(56, 225, 255, 0.14)',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-sm': ['clamp(2.5rem, 11vw, 4rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        display: ['clamp(3.2rem, 13vw, 9.5rem)', { lineHeight: '0.86', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        overline: '0.24em',
        wider2: '0.14em',
      },
      maxWidth: {
        prose: '62ch',
      },
      borderRadius: {
        xs: '0.25rem',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
        'fade-b': 'linear-gradient(180deg, transparent, #08090B)',
      },
      backgroundSize: {
        grid: '64px 64px',
        'grid-sm': '32px 32px',
      },
      keyframes: {
        'caret-blink': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'sweep-x': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(300%)' } },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
        'sweep-x': 'sweep-x 3.2s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
      transitionTimingFunction: {
        precise: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
