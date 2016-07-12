/**
 * Created by hugo on 16/7/5.
 */

var ExternalModuleFactoryPlugin = require("webpack/lib/ExternalModuleFactoryPlugin");
var AmdMainTemplatePlugin = require("./KMDMainTemplatePlugin");

function WebpackRxPlugin(){

}

WebpackRxPlugin.prototype.apply = function(compiler) {

    compiler.plugin("this-compilation", function(compilation) {
        compilation.apply(new AmdMainTemplatePlugin());
    }.bind(this));

    compiler.plugin("compile", function(params) {
        params.normalModuleFactory.apply(new ExternalModuleFactoryPlugin('amd', [
            function(context, request, callback) {
                // 把@weex-module/event模块排除掉
                if (/^@weex\-module\//.test(request)) {
                    // weexRequire(request)
                    return callback(null, request); // eslint-disable-line
                }

                callback();

            }
        ]));
    }.bind(this));

};

module.exports = WebpackRxPlugin;