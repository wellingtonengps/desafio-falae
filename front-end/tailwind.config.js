/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
                red: "#FC8D8B",
                blue: "#8B90FC",
                green: "#8BFCB0",
                yellow: "#FCE68B",
                gray: "#A7A494",
                white: "#f3f3f3",
                orange: "#FCC98B"
            }
    	}
    },
    plugins: [require("tailwindcss-animate")],
}