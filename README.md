# Weex Webpack Plugin for Rx

build rx project to weex.

## Installation
 
 ```
 npm i --save-dev weex-rx-webpack-plugin
 ```
 

## Usage

Include the following in your Webpack config.

```javascript
var WeexRxWebpackPlugin = require("weex-rx-webpack-plugin");

...

plugins: [
  new WeexRxWebpackPlugin()
]
```

## Options

| option       | description           | type               | Default       |
|-------------|----------------|--------------------|--------------|
| addWebLoader      | set true , will add web loader to bundle   | boolean | false        |


### Example

```javascript

new WeexRxWebpackPlugin({
    addWebLoader : true
})

```


## License

GPL-3.0


