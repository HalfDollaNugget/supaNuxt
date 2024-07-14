import type { Config } from 'tailwindcss'
export default <Partial<Config>> {
  theme: {
    extend: {
      animation: {
        'slide-up': 'slide-up .2s ease-in-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }, 
        },
      }
    }
  }
}