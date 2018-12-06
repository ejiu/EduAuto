'use strict';

const targetInfo = require('./readTargetExcel.js');
const templateInfo = require('./readTemplateExcel.js');
const create = require('./createFolder.js');
const config = require('./config.js');
const assembly = require('./assembly.js');

const test = require('./test.js');

////step1: 读取Excel表格信息
// console.log(targetInfo.coursesName);
// targetInfo.pageInfo.forEach((item)=>{
//     console.log(item);
// });
// console.log(targetInfo.pageInfo.length);

// //step2: 根据配置表创建新项目文件夹,并复制基础内容
// create(config.basePath, config.targetPath, targetInfo.coursesName, config.autoCover, (err)=>{
//     console.log("项目创建完毕!");
//     if (err) {
//         console.log(err);
//     }
// });

//step3: 根据配置表,复制模版内容及资源图片
assembly.copyTemplate();
assembly.copyResource();
