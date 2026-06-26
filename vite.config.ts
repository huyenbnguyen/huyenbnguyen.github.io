import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      // Skip non-HTML links (e.g. /resume.pdf) so the crawler doesn't abort.
      filter: (page) => !page.path.endsWith(".pdf"),
    },
  },
});
