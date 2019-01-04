'use strict';

const targetInfo = require('./readTargetExcel.js');
const templateInfo = require('./readTemplateExcel.js');
const fileManager = require('./FileManager.js');
const config = require('./config.js');
const assembly = require('./assembly.js');
const path = require('path');

// // step1: 读取Excel表格信息
// console.log(targetInfo.coursesName);
// targetInfo.pageInfo.forEach((item)=>{
//     console.log(item);
// });
// console.log(targetInfo.pageInfo.length);

//  templateInfo.pageMap.forEach((item)=>{
//     console.log(item);
//  });

// step2: 根据配置表创建新项目文件夹,并复制基础内容
fileManager.createDir(config.basePath, config.targetPath, targetInfo.coursesName, config.autoCover, (err)=>{
    console.log("项目创建完毕!");
    if (err) {
        console.log(err);
        
    }
    config.targetPath = path.join(config.targetPath, targetInfo.coursesName);
    
    //step3: 根据配置表,复制模版内容及资源图片
    assembly.copyTemplate(config.templatePath, config.targetPath, templateInfo.pageMap, targetInfo.pageInfo,(err)=>{
        console.log("模版复制完毕!");
        if (err) {
            return console.log(err);
        }

        assembly.changePageInfo(config.templatePath, config.targetPath, targetInfo.pageInfo, (err)=>{
            console.log("PageInfo修改完毕!");
            if (err) {
                return console.log(err);
            }
        });
    });
    
    assembly.changePageMgr(config.targetPath, targetInfo.pageInfo, (err)=>{
        console.log("PageMgr修改完毕!");
        if (err) {
            return console.log(err);
        }
    });
    
    // assembly.copyResource();
});
