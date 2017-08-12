# mito
## antd样式按需加载
* npm i --save babel-plugin-import --dev
* 打开react-scripts/config/webpack.config.dev.js
* 加入+号中的内容
```
// Process JS with Babel.
{
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
+   plugins: [
+     ['import', { libraryName: 'antd', style: 'css' }],
+   ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true
  }
},
```