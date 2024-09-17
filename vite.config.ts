// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     proxy: {
// //       '/api': {
// //         target: 'http://localhost:8000',
// //         changeOrigin: true,
// //         rewrite: (path) => path.replace(/^\/api/, '')
// //       }
// //     }
// //   }
// // })

// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     plugins: [react()],
//     server: {
//       proxy: {
//         '/api': { 
//           target: process.env.VITE_API_URL || 'http://localhost:8000',
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, '')
//         }
//       }
//     },
//     define: {
//       'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
//     }
//   }
// })

// // module.exports = defineConfig;

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // }
})

