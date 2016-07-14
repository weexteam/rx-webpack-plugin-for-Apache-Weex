
var path = require('path');


module.exports = {

    entry: {
        a: path.resolve(__dirname, 'a.js')
    },

    //输出的文件配置
    output: {
        path: path.resolve(__dirname, 'actual'),
        filename: '[name].js'
    },

    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loaders: ['babel']
        }]
    },

    plugins: [

        new RxPlugin({
            addLoader : true
        })

    ]
};

