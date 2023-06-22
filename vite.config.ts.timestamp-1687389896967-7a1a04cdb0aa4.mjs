// vite.config.ts
import solid from "file:///C:/Users/Mario/work/timer/node_modules/solid-start/vite/plugin.js";
import { defineConfig } from "file:///C:/Users/Mario/work/timer/node_modules/vite/dist/node/index.js";
var vite_config_default = defineConfig({
  plugins: [
    solid({
      ssr: false,
      durableObjects: {
        DO_WEBSOCKET: "./src/websocket.ts"
      }
      // adapter: cloudflareWorkers({
      //   durableObjects: {
      //     DO_WEBSOCKET: "WebSocketDurableObject"
      //   },
      //   kvNamespaces: ["app"]
      // })
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNYXJpb1xcXFx3b3JrXFxcXHRpbWVyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxNYXJpb1xcXFx3b3JrXFxcXHRpbWVyXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9NYXJpby93b3JrL3RpbWVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHNvbGlkIGZyb20gXCJzb2xpZC1zdGFydC92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgc29saWQoe1xuICAgICAgc3NyOiBmYWxzZSxcbiAgICAgIGR1cmFibGVPYmplY3RzOiB7XG4gICAgICAgIERPX1dFQlNPQ0tFVDogXCIuL3NyYy93ZWJzb2NrZXQudHNcIixcbiAgICAgIH0sXG4gICAgICAvLyBhZGFwdGVyOiBjbG91ZGZsYXJlV29ya2Vycyh7XG4gICAgICAvLyAgIGR1cmFibGVPYmplY3RzOiB7XG4gICAgICAvLyAgICAgRE9fV0VCU09DS0VUOiBcIldlYlNvY2tldER1cmFibGVPYmplY3RcIlxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICBrdk5hbWVzcGFjZXM6IFtcImFwcFwiXVxuICAgICAgLy8gfSlcbiAgICB9KSxcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1USxPQUFPLFdBQVc7QUFDelIsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osS0FBSztBQUFBLE1BQ0wsZ0JBQWdCO0FBQUEsUUFDZCxjQUFjO0FBQUEsTUFDaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9GLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
