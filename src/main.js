'use strict';

const excelInfo = require('./readExcel.js');
const create = require('./createFolder.js');
const configInfo = require('./config.js');
const test = require('./test.js');

//步骤一: 读取Excel表格信息
console.log(excelInfo.coursesName);
excelInfo.pageInfo.forEach((item)=>{
    console.log(item);
});
console.log(excelInfo.pageInfo.length);

//步骤二: 根据配置表创建新项目文件夹,并复制基础内容
//crate(srcPath, targetPath, coursesName, callback)
create(configInfo.basePath, configInfo.targetPath, excelInfo.coursesName, configInfo.autoCover, (err)=>{
    console.log("复制完毕!");
    if (err) {
        console.log(err);
    }
});

//步骤三: 根据配置表,复制模版内容及资源图片
