/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-app":     "rgb(var(--rgb-neutral-50) / <alpha-value>)",
        "bg-surface": "rgb(var(--rgb-white) / <alpha-value>)",
        "bg-overlay": "rgb(var(--rgb-neutral-900) / <alpha-value>)",

        "text-primary":   "rgb(var(--rgb-neutral-900) / <alpha-value>)",
        "text-secondary": "rgb(var(--rgb-neutral-600) / <alpha-value>)",
        "text-tertiary":  "rgb(var(--rgb-neutral-500) / <alpha-value>)",
        "text-inverted":  "rgb(var(--rgb-white) / <alpha-value>)",

        "action-primary":   "rgb(var(--rgb-brand-blue) / <alpha-value>)",
        "action-secondary": "rgb(var(--rgb-brand-indigo) / <alpha-value>)",
        "action-success":   "rgb(var(--rgb-success) / <alpha-value>)",
        "action-warning":   "rgb(var(--rgb-warning) / <alpha-value>)",
        "action-error":     "rgb(var(--rgb-error) / <alpha-value>)",

        "border-subtle":  "rgb(var(--rgb-neutral-200) / <alpha-value>)",
        "border-default": "rgb(var(--rgb-neutral-300) / <alpha-value>)",
        "border-strong":  "rgb(var(--rgb-neutral-400) / <alpha-value>)",

        "status-success": "rgb(var(--rgb-success) / <alpha-value>)",
        "status-warning": "rgb(var(--rgb-warning) / <alpha-value>)",
        "status-error":   "rgb(var(--rgb-error) / <alpha-value>)",
        "status-info":    "rgb(var(--rgb-info) / <alpha-value>)",
      },
      boxShadow: {
        sm:      "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        lg:      "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
}
