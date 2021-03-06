var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    node: {
      fs: 'empty',
      path: 'empty',
      __dirname: true
    },

    entry: [
      './src/index.jsx'
    ],

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../../public/dist')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    module: {
      rules: [
        {
          exclude: path.join(__dirname, '../../../node_modules'),
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },

        {
           test: /\.css$/,
           use: [
             {
               loader: 'style-loader'
             },
             {
               loader: 'css-loader',
               options: {
                 import: false,
                 localIdentName: "[name]--[local]--[hash:base64:8]",
                 modules: true
               }
             }
           ]
        },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          exclude: path.join(__dirname, '../../../node_modules'),
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    plugins: [
      new WebpackNotifierPlugin({ alwaysNotify: true })
    ]
};
