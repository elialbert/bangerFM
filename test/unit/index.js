// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
//testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
//const srcContext = require.context('src', true, /^\.\/(?!main(\.js)?$)/)
//srcContext.keys().forEach(srcContext)

// test/test_index.js 
 
// This gets replaced by karma webpack with the updated files on rebuild 
var __karmaWebpackManifest__ = [];
 
// require all modules ending in "_test" from the 
// current directory and all subdirectories 
//var testsContext = require.context(".", true, /_test$/);
 
function inManifest(path) {
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}
 
var runnable = testsContext.keys().filter(inManifest);
 
// Run all tests if we didn't find any changes 
if (!runnable.length) {
  runnable = testsContext.keys();
}
 
runnable.forEach(testsContext);
