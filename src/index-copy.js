import url from './assets/404.png'

// console.log($)


// // => 浏览器不能直接识别ES6Module/Common.js模块导入导出规范的代码

// // => ES6Module规范（引入必须在最开始）
// import bind from "./nav";
// bind();

// // todo css/less/scss需要在js入口导入后才可以使用
// // require('./index.css')
require("./index.less");
console.log(url)
let img = new Image()
img.src = url
document.body.appendChild(img)

// // => Common.js规范(Node)
// let { debounce } = require("./common");
// debounce();
// console.log("热更新");


// class A {
//   constructor() {}
//   sum() {
//     console.log("sum");
//   }
//   static n = 10;
//   m = 20
//   static fun() {
//     console.log("fun");
//   }
// }
// A.fun();
// new A().sum();
// console.log(A.n)
// console.log(new A().m)

// function test() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(100)
//     }, 1000)
//   })
// }
// async function fn() {
//   let n = await test()
//   console.log(n)
// }
// fn()