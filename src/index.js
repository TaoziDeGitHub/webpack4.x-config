// => 浏览器不能直接识别ES6Module/Common.js模块导入导出规范的代码

// => ES6Module规范（引入必须在最开始）
import bind from './nav'
bind()

// => Common.js规范(Node)
const { debounce } = require('./common')
debounce()