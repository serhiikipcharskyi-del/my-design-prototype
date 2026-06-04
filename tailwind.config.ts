// Reference / IDE-autocomplete only.
// Tailwind v4 with @tailwindcss/postcss reads tokens from the @theme block
// in globals.css — this JS config is NOT loaded at build time.
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        grey: {
          1000: '#1f2030',
          900: '#626369',
          800: '#a5a6ac',
          600: '#d2d3d5',
          400: '#e0e0e2',
          200: '#ebebee',
          100: '#f5f5f7',
          50: '#fafafb',
        },
        orchid: {
          1000: '#c95bc1',
          900: '#dc93d7',
          600: '#eabee7',
          400: '#eecdec',
          200: '#f5e1f4',
          100: '#f9eef9',
          50: '#fcf7fc',
        },
        green: '#e8fde3',
        lavender: '#e3e9fd',
        tag: {
          teal: { 300: '#065d76', 100: '#e3f7f7' },
          yellow: { 900: '#5f4b00', 600: '#d9a516', 100: '#f9eec9' },
          red: { 900: '#760e05', 600: '#feedec' },
          green: { 900: '#095a41', 600: '#dcf7e9' },
          pink: { 900: '#9a1b4f', 600: '#fae8f3' },
        },
        variant: {
          blue: '#0000ff',
          verdigris: '#06a192',
          'indigo-bloom': '#6d18b9',
          'wild-strawberry': '#f74980',
          'jungle-green': '#21a366',
          'cool-sky': '#3da5fa',
          'amber-glow': '#ffa02e',
          'vibrant-coral': '#f86d60',
          'bubblegum-pink': '#fb6382',
          'royal-orchid': '#9800b6',
          'autumn-ember': '#b75f17',
          indigo: '#650680',
          'dark-emerald': '#0e5f21',
          'sapphire-sky': '#176ada',
          'fiery-terracotta': '#f74b3b',
          goldenrod: '#d9a516',
        },
      },

      fontFamily: {
        serif: ['Hedvig Letters Serif', 'serif'],
        display: ['DM Sans', 'sans-serif'],
      },

      fontSize: {
        // Headlines / Inter
        h1: ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h3: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        h4: ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        h5: ['0.875rem', { lineHeight: '1rem', fontWeight: '600' }],
        h6: ['0.8125rem', { lineHeight: '1rem', fontWeight: '600' }],
        // Headlines / Hedvig Letters Serif
        'serif-h1': ['1.25rem', { lineHeight: '2rem' }],
        'serif-h2': ['1rem', { lineHeight: '1.5rem' }],
        // Headlines / DM Sans (onboarding / display)
        'display-h1': ['2.25rem', { lineHeight: '2.9125rem', fontWeight: '500', letterSpacing: '-0.02em' }],
        'display-h2': ['1.75rem', { lineHeight: '2.5rem', fontWeight: '500', letterSpacing: '-0.02em' }],
        'display-h3': ['1.25rem', { lineHeight: '1.6rem', fontWeight: '700', letterSpacing: '-0.01em' }],
        // Body / Inter
        'body-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'body-l': ['0.875rem', { lineHeight: '1.5rem' }],
        'body-l-semibold': ['0.875rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        'body-m': ['0.8125rem', { lineHeight: '1.125rem', fontWeight: '500' }],
        'body-s': ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
        'body-xs': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
      },

      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },

      boxShadow: {
        s: '2px 4px 16px 0px rgba(0, 0, 0, 0.08)',
      },

      spacing: {
        // Figma spacing tokens — map 1-to-1 to Tailwind's default px scale
        px0: '0px',
        px2: '2px',
        px4: '4px',
        px6: '6px',
        px8: '8px',
        px10: '10px',
        px12: '12px',
        px16: '16px',
        px20: '20px',
        px24: '24px',
        px32: '32px',
        px40: '40px',
        px48: '48px',
        px56: '56px',
        px64: '64px',
        px72: '72px',
        px80: '80px',
      },
    },
  },
}

export default config
