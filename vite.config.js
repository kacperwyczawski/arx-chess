import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				1: resolve(__dirname, "index.html"),
				2: resolve(__dirname, "play.html"),
				3: resolve(__dirname, "pieces.html"),
				4: resolve(__dirname, "select-map.html"),
				5: resolve(__dirname, "multiplayer.html"),
			},
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
	},
});
