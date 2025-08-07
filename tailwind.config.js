/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			orange: {
  				DEFAULT: '#FF6B35',
  				light: '#FF8555',
  				dark: '#E55125'
  			},
  			teal: {
  				DEFAULT: '#2C5F5F',
  				light: '#3C6F6F',
  				dark: '#1C4F4F'
  			},
  			cream: {
  				DEFAULT: '#FFF5EB',
  				light: '#FFFBF5',
  				dark: '#FFF0E0'
  			},
  			charcoal: {
  				DEFAULT: '#2D2D2D',
  				light: '#3D3D3D',
  				dark: '#1D1D1D'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		backgroundImage: {
  			'gradient-stripe': 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
  		},
  		typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.charcoal.DEFAULT'),
            h1: {
              color: theme('colors.charcoal.DEFAULT'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.charcoal.DEFAULT'),
              fontWeight: '600',
            },
            h3: {
              color: theme('colors.charcoal.DEFAULT'),
              fontWeight: '600',
            },
            h4: {
              color: theme('colors.charcoal.DEFAULT'),
              fontWeight: '600',
            },
            strong: {
              color: theme('colors.charcoal.DEFAULT'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.orange.DEFAULT'),
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: theme('colors.orange.dark'),
                textDecorationThickness: '2px',
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.orange.DEFAULT'),
              fontStyle: 'italic',
            },
            code: {
              color: theme('colors.orange.DEFAULT'),
              backgroundColor: theme('colors.cream.DEFAULT'),
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.charcoal.DEFAULT'),
              color: theme('colors.cream.DEFAULT'),
            },
            ul: {
              'li::marker': {
                color: theme('colors.orange.DEFAULT'),
              },
            },
            ol: {
              'li::marker': {
                color: theme('colors.orange.DEFAULT'),
              },
            },
          },
        },
      }),
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('@tailwindcss/typography')],
}