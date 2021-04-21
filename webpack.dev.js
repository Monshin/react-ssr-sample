/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const merge = require('webpack-merge').default;
const common = require('./webpack.common.js');
const config = require('./src/config/config').default;
/* eslint-enable @typescript-eslint/no-var-requires */

module.exports = [
  merge(common[0], {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          DEBUG: JSON.stringify(process.env.DEBUG),
          REACT_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        _CONFIG_: JSON.stringify(config),
      }),
    ],
  }),
  merge(common[1], {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          DEBUG: JSON.stringify(process.env.DEBUG),
          REACT_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        _CONFIG_: JSON.stringify(config),
      }),
    ],
  }),
];
