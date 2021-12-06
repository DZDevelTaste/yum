const path = require('path');

module.exports = (env) => {
   
    return {
        mode: 'none',
        entry: path.resolve(`yum_frontend/src/index.js`),
        output: {
            path: path.resolve('public'),
            filename: 'bundle.js',
            assetModuleFilename: 'assets/images/[hash][ext]'
        },
        module: {
            rules: [{
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    configFile: path.resolve('yum_frontend/config/babel.config.json')
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
            contentBase: path.resolve('yum_frontend/public'),
            watchContentBase: true,
            host: "0.0.0.0",
            port: 9999,
            inline: true,
            liveReload: true,
            hot: false,
            compress: true,
            historyApiFallback: true
        }
    }
};