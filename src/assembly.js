'use strict';

//params: 模板地址, 项目地址, 模版页面信息, 目标页面信息, 回调函数
let copyTemplate = function(templatePath, targetPath, templatePageinfo, targetPageinfo, callback){
    console.log("开始准备模版");
}

//params: 资源地址, 项目地址, 模版页面信息, 目标页面信息, 回调函数
let copyResource = function(){
    console.log("开始准备资源");
}

module.exports = {
    copyTemplate : copyTemplate,
    copyResource : copyResource
}