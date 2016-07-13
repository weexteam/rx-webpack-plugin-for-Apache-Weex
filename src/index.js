
import ExternalModuleFactoryPlugin from 'webpack/lib/ExternalModuleFactoryPlugin';
import AmdMainTemplatePlugin from './AmdMainTemplatePlugin';

class WeexRxWebpackPlugin {

    constructor(options){
        this.options = Object.assign({},{
            // set true , will add h5 loader to bundle
            addLoader : false
        },options);
    }

    apply(compiler){
        compiler.plugin("this-compilation", (compilation) => {

            compilation.apply(new AmdMainTemplatePlugin(this.options));
        });

        compiler.plugin("compile", (params) => {
            params.normalModuleFactory.apply(new ExternalModuleFactoryPlugin('amd', [
                (context, request, callback) => {
                    // @weex-module/event ignore
                    if (/^@weex\-module\//.test(request)) {

                        return callback(null, request); // eslint-disable-line
                    }

                    callback();

                }
            ]));
        });
    }

}

module.exports = WeexRxWebpackPlugin;