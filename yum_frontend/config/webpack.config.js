const path = require('path');

module.exports = (env) => {
    const entry = path.resolve(`yum_frontend/src/index.js`);
    return {
        mode: 'development',
        entry: entry,
        output: {
            path: path.resolve('public'),
            filename: 'bundle.js',
            assetModuleFilename: 'assets/images/[hash][ext]'
        },
        module: {
            rules: [{
                test: /\.(png|gif|jpe?g|svg|ico|tiff?|bmp)$/i,
                type: 'asset/resource'
            }, {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { modules: true } },
                    'sass-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },
        devtool: "eval-source-map",
        devServer: {
            host: '0.0.0.0',
            port: 9999,
            proxy:{ '/api': 'http://localhost:8080/yum'},
            liveReload: true,
            hot: false,
            compress: true,
            historyApiFallback: true
        }
    }
};