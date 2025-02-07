const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
      theme: {
        themes: {
          light: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
            background: '#FFFFFF', // Light background
            surface: '#F5F5F5', // Light surface color
          },
        },
        options: { customProperties: true }, // Allows the use of theme colors in CSS
      },
    },
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    allowedHosts: 'all'
  }
})

// module.exports = {
//   publicPath: '/',
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://backend', // Target the backend service directly
//         changeOrigin: true,
//         pathRewrite: { '^/api': '' }, // Ensure '/api' works in production
//       },
//     },
//   },
// };
