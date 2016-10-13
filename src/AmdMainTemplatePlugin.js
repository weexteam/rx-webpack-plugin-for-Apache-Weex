'use strict';

import ConcatSource from 'webpack/lib/ConcatSource';
import fs from 'fs';
import path from 'path';

export default class AmdMainTemplatePlugin {

    constructor(options){
        this.name = '[name]';
        this.options = options;
    }

    apply(compilation){

        let mainTemplate = compilation.mainTemplate;

        compilation.templatesPlugin('render-with-entry', (source, chunk, hash) => {

            let externals = chunk.modules.filter( m => {
                return m.external;
            });
            let externalsDepsArray = externals.map( m => {
                return typeof m.request === 'object' ? m.request.amd : m.request;
            });
            let externalsArguments = externals.map( m => {
                return '__WEBPACK_EXTERNAL_MODULE_' + m.id + '__';
            });
            let initHandler,
                name,
                loader = '',
                requires = '';

            externalsDepsArray.map( (mod,index) => {
                requires += 'var ' + externalsArguments[index] + ' = require("'+mod+'");';
            });

            externalsArguments = externalsArguments.join(', ');
            externalsDepsArray = JSON.stringify(externalsDepsArray);

            name = mainTemplate.applyPluginsWaterfall("asset-path", this.name, {
                hash: hash,
                chunk: chunk
            });

            initHandler = 'require('+ JSON.stringify(name) +')';

            if(this.options.addWebLoader){
                try {
                    loader = fs.readFileSync(path.join(__dirname, 'loader.js'), "utf8");
                }catch (e){
                    throw e;
                }
            }

            return new ConcatSource( loader + "define(" + JSON.stringify(name) + ", " + externalsDepsArray + ", function(require, exports, module) { return ", source, "});" + initHandler);
        });

        mainTemplate.plugin('global-hash-paths', (paths) => {
            if (this.name) paths.push(this.name);
            return paths;
        });

        mainTemplate.plugin("hash", (hash) => {
            hash.update("exports amd");
            hash.update(this.name + "");
        });
    }

}
