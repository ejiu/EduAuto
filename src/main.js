'use strict';

const readExcel = require('./readExcel.js');
const configInfo = require('./config.js');

// 步骤一: 根据配置表创建新项目文件夹,并复制基础内容
readExcel(configInfo.basePath, configInfo.targetPath, (err)=>{
    console.log("复制完毕!");
    if (err) {
        console.log(err);
    }
});


//步骤二: 根据配置表,复制模版内容及资源图片