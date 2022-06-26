const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '0.0.0.0',
    hot: true,
    proxy: {
      "/api": {
        target:
          "https://store-api-open-store-management.apps.hiybv6c8.eastus.aroapp.io",
        logLevel: "debug",
        changeOrigin: true,
        secure: true,
      },
    },
  }
})
