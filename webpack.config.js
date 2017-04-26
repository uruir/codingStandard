'use strict';

var webpack = require('webpack')
var path = require('path');

module.exports = {
    entry: {
        app: '[name].js'
    },
    output: {
        path: path.resolve(__dirname + './build'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }), new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }), new webpack.optimize.OccurenceOrderPlugin()];
} else {
    module.exports.devtool = '#inline-eval-cheap-source-map';
}
