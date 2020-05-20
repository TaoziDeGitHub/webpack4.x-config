/* 
 * 在这个文件配置自定义打包规则
 *    1.所有规则写在module.export={}中
 */

/* webpack基于node.js，使用Common.js模块规范 */
let path = require('path')

module.exports = {
  // => 配置环境 production（默认值） development
  mode: 'production',
  // => 入口
  entry: './src/index-copy.js',
  // => 出口
  output: {
    // => 输出的文件名
    filename: 'bundle.min.js',
    // => 输出目录必须是绝对路径
    path: path.resolve(__dirname, 'my-dist')
  }
}