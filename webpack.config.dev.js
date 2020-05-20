/*
 * 在这个文件配置自定义打包规则
 *    1.所有规则写在module.export={}中
 */

/* webpack基于node.js，使用Common.js模块规范 */
let path = require("path");
let webpack = require("webpack");

// todo 每一个导入进来的插件都是一个类 new HTMLWebPackPlugin()
let HTMLWebPackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
let UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // => 配置环境 production（默认值） development
  mode: "development",
  // => 入口
  entry: "./src/index-copy.js",
  // => 出口
  output: {
    // => 输出的文件名
    // filename: 'bundle.min.js',
    // => 让每一次生成的文件名都带有hash值
    filename: "bundle.min.[hash].js",
    // => 输出目录必须是绝对路径
    path: path.resolve(__dirname, "my-dist"),
    // => 给编译后引用资源地址前面设置的前缀(生产环境使用)
    // publicPath: './'
  },
  // => 关于webpack-dev-server的一些配置  安装: npm install webpack-dev-server --save-dev OR yarn add webpack-dev-server -D
  // => 执行命令 webpack-dev-server --config xxx.js （特点：修改src文件时自动热更新）
  devServer: {
    port: 8888,
    progress: true, // => 显示编译进度
    contentBase: "./my-dist", // => 指定当前服务处理资源的目录
    // open: true // => 编译完成后自动打开浏览器
  },
  // todo 使用插件(数组)
  plugins: [
    new HTMLWebPackPlugin({
      // => 需要编译的模板 (默认为'./src/index.html', 可改)
      template: "./src/index.html",
      // => 输出的文件名
      filename: "index.html",
      // => 让引入的js后面加上hash戳（清除缓存），但是真实项目中我们一般是每一次编译生成不同的js文件引入而不是加hash戳
      // hash: true,
      // => 压缩
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
      },
    }),
    // => 抽离css文件
    new MiniCssExtractPlugin({
      // => 指定输出文件名
      filename: "main.min.[hash].css",
    }),
    // => 向每一个模块中注入全局变量
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  // todo 使用加载器loader处理规则
  module: {
    rules: [
      {
        test: /\.(css|less)$/, // => 基于正则匹配处理哪些文件
        // => 控制使用的loader加载器
        // todo 顺序：从右到左执行
        use: [
          // "style-loader", // => 把编译好的css插入页面的head标签中(内嵌式样式)
          MiniCssExtractPlugin.loader, // => link方式引入html页面
          "css-loader", // => 编译@import/url()这种语法的
          // => 设置前缀
          // "postcss-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")],
            },
          },
          {
            loader: "less-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.js$/,
        // => 编译js的loader
        use: [
          {
            loader: "babel-loader",
            options: {
              // => 基于babel的语法解析（ES6 -> ES5）
              presets: ["@babel/preset-env"],
              // => 插件处理 ES6+特殊语法
              plugins: [
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    legacy: true,
                  },
                ],
                [
                  "@babel/plugin-proposal-class-properties",
                  {
                    loose: true,
                  },
                ],
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        ],
        // => 指定js编译和忽略目录
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
      {
        // => 图片处理
        test: /\.(png|jpg|jpeg|gif|ico|webp|bmp)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // => 图片小于200kb，处理时直接base64
              limit: 200 * 1024,
              // => 控制打包后图片所在目录
              outputPath: 'images'
            }
          }
        ]
      },
      {
        // => 处理html文件中导入的img文件
        test: /\.(html|htm|xml)$/i,
        use: ["html-loader"]
      }
    ],
  },
  // => 配置优化规则
  optimization: {
    // => 压缩优化
    minimizer: [
      // => 压缩css (产生问题： js压缩不在执行默认的压缩方式，也走这个插件，导致无法压缩)
      new OptimizeCssAssetsWebpackPlugin(),
      // => 压缩js
      new UglifyjsWebpackPlugin({
        cache: true, // => 开启缓存
        parallel: true, // => 并发编译
        sourceMap: true, // => 源码映射（方便调试 ）
      }),
    ],
  },
};
