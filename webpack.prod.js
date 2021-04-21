/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const merge = require('webpack-merge').default;
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common.js');
const config = require('./src/config/config').default;
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = [
  merge(common[0], {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          DEBUG: JSON.stringify(process.env.DEBUG),
          REACT_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          NODE_ENV: JSON.stringify('production'),
        },
        _CONFIG_: JSON.stringify(config),
      }),
      new CompressionPlugin({
        test: /\.js$/,
      }),
    ],
  }),
  merge(common[1], {
    mode: 'production',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          DEBUG: JSON.stringify(process.env.DEBUG),
          REACT_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          NODE_ENV: JSON.stringify('production'),
        },
        _CONFIG_: JSON.stringify(config),
      }),
    ],
  }),
];
