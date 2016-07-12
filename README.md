# Weex Webpack Plugin for Rx

build rx project to weex.

 ## Installation
 
 ```
 npm i -D weex-rx-webpack-plugin
 ```
 
 ## How to Use
 
 只需在webpack配置的plugin属性中初始化插件即可。
 
```
//webpack.config.js
var WebpackRxPlugin = require("@alife/webpack-rx-plugin");

plugins: [
	new WebpackRxPlugin()	        
]

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

## License

GPL-3.0


