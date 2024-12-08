// next.config.js
const nextConfig = {
  webpack(config) {
    // Exclude SVGs from the default file loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true, // Optimize the SVG
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false, // Keep the viewBox attribute
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
