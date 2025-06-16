import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/shared/constants/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        success: 'var(--success)',
        'success-foreground': 'var(--success-foreground)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        'warning-foreground': 'var(--success-foreground)',

        'ct-gradient': 'var(--ct-gradient)',
        'ct-white': 'var(--ct-white)',
        'ct-blue': 'var(--ct-blue)',
        'ct-purple': 'var(--ct-purple)',
        'ct-emerald-green': 'var(--ct-emerald-green)',
        'ct-primary': 'var(--ct-primary)',
        'ct-secondary': 'var(--ct-secondary)',
        'ct-third': 'var(--ct-third)',
        'ct-context': 'var(--ct-context)',
        'ct-border-primary': 'var(--ct-border-primary)'
      },
      backgroundColor: {
        layout: 'var(--layout)',
        'base-frame': 'var(--base-frame)',
        'circle-frame': 'var(--circle-frame)',
        'card-frame': 'var(--card-frame)',
        'selected-tab': 'var(--selected-tab)',
        'selected-frame': 'var(--selected-frame)',
        'ct-default-100': 'var(--ct-default-100)',
        'ct-default': 'var(--ct-default)',
        'ct-border': 'var(--ct-border)',
        'ct-third': 'var(--ct-third)'
      },
      borderColor: {
        'ct-border': 'var(--ct-border)'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    heroui({
      addCommonColors: true
    })
  ]
}
export default config
