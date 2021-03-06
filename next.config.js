const withOffline = require('next-offline')

const configuration =
withOffline(
  {
    target: 'serverless',
    transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
    generateInDevMode: false,
    workboxOpts: {
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    env: {
      USER_ID: process.env.USER_ID,
      BACKEND_SERVER: process.env.BACKEND_SERVER
    },
    async headers() {
      return [{
          source: '/',
          headers: [
            {
              key: 'Link',
              value: '</css/main.css>; rel=preload; as=style'
            },
            {
              key : 'Cache-Control',
              value : 'public, max-age=31536000, immutable'
            }
          ]
      }]
    }
  }
);

module.exports = configuration;
