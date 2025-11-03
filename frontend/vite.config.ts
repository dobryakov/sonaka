import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const publicHost = env.PUBLIC_FRONTEND_HOST || process.env.PUBLIC_FRONTEND_HOST;

	return {
		server: {
			host: '0.0.0.0',
			port: 3000,
			allowedHosts: publicHost ? [publicHost] : ['n8n.dobryakov.net'],
			proxy: {
				'/api': {
					target: 'http://backend:3000',
					changeOrigin: true,
				},
			},
		},
	};
});


