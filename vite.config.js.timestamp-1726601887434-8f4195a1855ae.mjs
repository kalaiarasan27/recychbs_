// vite.config.js
import { defineConfig } from "file:///D:/recycbs_heroku_app/test-folder/django-djreact-app/node_modules/vite/dist/node/index.js";
import react from "file:///D:/recycbs_heroku_app/test-folder/django-djreact-app/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1e3,
    // Set the limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Split out 'react' and 'react-dom' into separate chunks
          "react-vendors": ["react", "react-dom"]
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
      // Transform mixed ES and CJS modules
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyZWN5Y2JzX2hlcm9rdV9hcHBcXFxcdGVzdC1mb2xkZXJcXFxcZGphbmdvLWRqcmVhY3QtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyZWN5Y2JzX2hlcm9rdV9hcHBcXFxcdGVzdC1mb2xkZXJcXFxcZGphbmdvLWRqcmVhY3QtYXBwXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yZWN5Y2JzX2hlcm9rdV9hcHAvdGVzdC1mb2xkZXIvZGphbmdvLWRqcmVhY3QtYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsIC8vIFNldCB0aGUgbGltaXQgdG8gMTAwMCBrQlxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIC8vIEV4YW1wbGU6IFNwbGl0IG91dCAncmVhY3QnIGFuZCAncmVhY3QtZG9tJyBpbnRvIHNlcGFyYXRlIGNodW5rc1xyXG4gICAgICAgICAgJ3JlYWN0LXZlbmRvcnMnOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLCAvLyBUcmFuc2Zvcm0gbWl4ZWQgRVMgYW5kIENKUyBtb2R1bGVzXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1YsU0FBUyxvQkFBb0I7QUFDblgsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCx1QkFBdUI7QUFBQTtBQUFBLElBQ3ZCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQTtBQUFBLFVBRVosaUJBQWlCLENBQUMsU0FBUyxXQUFXO0FBQUEsUUFDeEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQTtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
