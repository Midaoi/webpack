var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/dist/",
    headers: {"Access-Control-Allow-Origin": "*"},
    stats: { colors: true }
});

server.listen(8080, "127.0.0.1", function() {});