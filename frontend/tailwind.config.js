/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ink: { DEFAULT: '#1B1523', 2: '#241B2E', 3: '#2E2438' },
                paper: '#F5EFE6',
                paperdim: '#C9BFCE',
                amber: { DEFAULT: '#E8A33D', dim: '#B87F2B' },
                mint: { DEFAULT: '#7FD8BE', dim: '#5AA890' },
                coral: { DEFAULT: '#E8604C', dim: '#B3492D' },
                line: '#3E3348'
            },
            fontFamily: {
                display: ['"Fraunces"', 'serif'],
                body: ['"Space Grotesk"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace']
            },
            borderRadius: {
                deck: '18px'
            },
            boxShadow: {
                deck: '0 12px 40px -12px rgba(0,0,0,0.55)',
                knob: 'inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -6px 10px rgba(0,0,0,0.35), 0 6px 14px rgba(0,0,0,0.45)'
            },
            keyframes: {
                reel: { to: { transform: 'rotate(360deg)' } },
                vu: {
                    '0%, 100%': { transform: 'scaleY(0.3)' },
                    '50%': { transform: 'scaleY(1)' }
                },
                blinker: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.25 }
                }
            },
            animation: {
                reel: 'reel 3.2s linear infinite',
                blink: 'blinker 1.4s ease-in-out infinite'
            }
        }
    },
    plugins: []
}
