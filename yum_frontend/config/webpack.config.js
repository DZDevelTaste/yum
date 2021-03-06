const path = require('path');

module.exports = (env) => {
    return {
        mode: 'none',
        entry: path.resolve(`src/index.js`),
        output: {
            path: path.resolve('../yum_backend/src/main/webapp/assets'),
            filename: 'js/bundle.js',
            assetModuleFilename: 'images/[hash][ext]'
        },
        module: {
            rules: [{
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('config/babel.config.json')
                }
            }, {
                test: /\.(sa|sc|c)ss$/i,
                use:[
                    'style-loader', 
                    {loader: 'css-loader', options: {modules: true} }, 
                    'sass-loader'
                ]
            }, {
                test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
                type: 'asset/resource'
            }]
        },
        devtool: "eval-source-map",
        devServer: {
            contentBase: path.resolve('public'),
            watchContentBase: true,
            host: "0.0.0.0",
            port: 9999,
            proxy: {
                '/api': 'http://localhost:8080',
                '/message': 'http://localhost:8080'
            },
            inline: true,
            liveReload: true,
            hot: false,
            compress: true,
            historyApiFallback: true
        }
    }
};