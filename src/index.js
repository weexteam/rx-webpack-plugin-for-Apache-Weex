'use strict';

import ConcatSource from 'webpack/lib/ConcatSource';
import ExternalModuleFactoryPlugin from 'webpack/lib/ExternalModuleFactoryPlugin';
import AmdMainTemplatePlugin from './AmdMainTemplatePlugin';

export default class WeexRxWebpackPlugin {

  constructor(options){
    this.options = Object.assign({}, {
      // set true , will add h5 loader to bundle
      addWebLoader: false
    }, options);
  }

  apply(compiler){
    compiler.plugin('this-compilation', (compilation) => {
      compilation.apply(new AmdMainTemplatePlugin(this.options));
    });

    compiler.plugin('compile', (params) => {
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

    compiler.plugin('compilation', (compilation) => {

      compilation.plugin('optimize-chunk-assets', function(chunks, callback) {
        chunks.forEach(function(chunk) {
          if(!chunk.initial) return;
          chunk.files.forEach(function(file) {
            compilation.assets[file] = new ConcatSource('// {"framework" : "Rx"}', '\n', compilation.assets[file]);
          });
        });
        callback();
      });
    });
  }
}
