import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import remarkHighlight from './src/lib/remarkHighlight.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),
		paths: {
			// Replace 'your-repo-name' with your actual GitHub repo name
			base: process.env.NODE_ENV === 'production' ? '/business-revision' : ''
		},
		prerender: {
			handleHttpError: (e) => {
				if (e.message.includes('404')) return; // ignore missing pages
				throw new Error(e.message);
			}
		}
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [remarkHighlight]
		})
	]
};

export default config;
