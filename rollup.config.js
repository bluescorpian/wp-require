import { terser } from "rollup-plugin-terser";

export default {
	input: "lib/index.js",
	output: [
		{
			file: "dist/wprequire.js",
			format: "umd",
			name: "WpRequire",
		},
		{
			file: "dist/wprequire.esm.js",
			format: "es",
		},
	],
	plugins: [terser()],
};
