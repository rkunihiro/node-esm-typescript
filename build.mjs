import { analyzeMetafile, build } from "esbuild";

const { metafile } = await build({
    entryPoints: {
        main: "src/main.ts",
    },
    outdir: "dist",
    outExtension: {
        ".js": ".mjs",
    },

    metafile: true,
    bundle: true,
    // splitting: true,
    minify: true,
    keepNames: true,
    sourcemap: true,
    sourcesContent: false,

    format: "esm",
    platform: "node",
    target: "node20",

    define: {
        "process.env.NODE_ENV": '"production"',
    },
    external: [],

    banner: {
        js: `
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
`,
    },
});

if (metafile) {
    const output = await analyzeMetafile(metafile);
    console.log(output);
}
