import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: { extend: {} },
	plugins: [require('@catppuccin/tailwindcss')({ defaultFlavour: 'mocha' })]
} satisfies Config;
