// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Deploy target outside Lovable: plain Node.js SSR server.
  // Produces .output/server/index.mjs, started with `npm run start:prod`.
  // Inside Lovable's own build the preset is forced to Cloudflare automatically.
  nitro: {
    preset: "node-server",
    // Rolldown can create a circular runtime-helper dependency across SSR chunks,
    // which crashes on Node with "__exportAll is not a function". Keeping the
    // server bundle together avoids that broken chunk boundary without disabling SSR.
    ...{ inlineDynamicImports: true },
  },
});
