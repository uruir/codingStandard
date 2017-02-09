/**
 * Created by wcc on 15/11/19.
 */
var vue = require('vue-loader'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack'),path = require('path');

var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name:'vendor',
    minChunks: 2
});

module.exports = {
    resolve:{
        root:['./node_modules']
    },
    entry:{
        app:'./src/app.js',
    },
    output: {
        path: './static',
        publicPath:'./static/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
          'vue': 'vue/dist/vue'
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader:'vue'
            },
            {
                test: /\.js$/,
                publicPath: "./static/",
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test: /\.(png|jpg)$/,
                
                loader: 'file-loader?name=images/[name].[ext]',
            }
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            sass: ExtractTextPlugin.extract("css!sass")
        }
    },
    plugins: [
        new ExtractTextPlugin("../[name].css"),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('./manifest.json'),
        // }),
        commonsChunkPlugin
    ],
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#inline-eval-cheap-source-map'
}
