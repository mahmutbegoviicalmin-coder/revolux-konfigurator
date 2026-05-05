/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        /* ── Headline font — Satoshi (self-hosted via Fontshare @import) ── */
        'heading': ['var(--font-heading)', 'Satoshi', 'system-ui', 'sans-serif'],
        /* ── Body / UI font — Inter (self-hosted via next/font) ─────────── */
        'body':    ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'revolux': {
          'navy':     '#0a1628',
          'blue':     '#1e40af',
          'accent':   '#3b82f6',
          'electric': '#60a5fa',
          'silver':   '#e2e8f0',
          'glass':    'rgba(255, 255, 255, 0.05)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient':   'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0a1628 100%)',
      },
      animation: {
        // Existing
        'float':        'float 6s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'slide-up':     'slideUp 0.8s ease-out forwards',
        // Entry animations (opacity-0 + these = staggered reveal)
        'fade-in':              'fadeIn 0.8s ease-out both',
        'fade-in-up':           'fadeInUp 0.8s ease-out both',
        'fade-in-up-delay-1':   'fadeInUp 0.8s ease-out 0.15s both',
        'fade-in-up-delay-2':   'fadeInUp 0.8s ease-out 0.3s both',
        'fade-in-up-delay-3':   'fadeInUp 0.8s ease-out 0.45s both',
        'fade-in-up-delay-4':   'fadeInUp 0.8s ease-out 0.6s both',
        'fade-in-up-delay-5':   'fadeInUp 0.8s ease-out 0.75s both',
        // Spec chip float
        'float-soft':    'floatSoft 5s ease-in-out infinite',
        'float-soft-d1': 'floatSoft 5s ease-in-out 1.6s infinite',
        'float-soft-d2': 'floatSoft 5s ease-in-out 3.2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-7px)' },
        },
      },
    },
  },
  plugins: [],
}
