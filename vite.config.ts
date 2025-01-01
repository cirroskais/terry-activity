import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {},
		https: {
			key: await Bun.file('./discordsays.key').text(),
			cert: await Bun.file('./discordsays.crt').text()
		}
	}
});
