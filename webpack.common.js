/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
/* eslint-enable @typescript-eslint/no-var-requires */

const browserConfig = {
  entry: './src/client/index.tsx',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/static/',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx|mjs)$/,
        use: 'babel-loader',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: rxPaths(),
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        material: {
          test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
          name: 'material',
          priority: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    function ({ request }, callback) {
      if (/^@?firebase/.test(request)) {
        return callback(null, 'firebase');
      }

      callback();
    },
  ],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],
};

const serverConfig = {
  entry: './src/server/index.tsx',
  target: 'node',
  externals: [
    nodeExternals({
      // we still want imported css from external files to be bundled otherwise 3rd party packages
      // which require us to include their own css would not work properly
      allowlist: /\.css$/,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/',
    globalObject: "(typeof self !== 'undefined' ? self : this)",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};

module.exports = [browserConfig, serverConfig];
