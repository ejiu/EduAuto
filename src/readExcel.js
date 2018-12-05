'use strict';

//npm module
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require("path");
const child = require("child_process");
 
//custom module
const configInfo = require('./config.js');

const sheets = xlsx.parse(configInfo.testPath);     //获取到所有sheets
const coursesName = sheets[0]['data'][0][0];        //第一张表 第一列 第一行 为课程名称
const pageNum = sheets[0]['data'][0][1];            //第一列 第二行 为课程页码
let pageInfo = [];                                  //各页面模版信息


sheets.forEach(function(sheet){
    for(let rowId in sheet['data']){
        let row=sheet['data'][rowId];
        pageInfo.push(row[1]);
    }
});

pageInfo.shift();
pageInfo.shift();

// pageInfo.forEach(function(item){
//     console.log(item);
// });
// console.log(pageNum);

////复制文件
let copyFile = function(srcPath, tarPath, callbackFunc) {
    let rs = fs.createReadStream(srcPath);
    rs.on('error', function(err) {
        if (err) {
            console.log('read error', srcPath);
        }
        callbackFunc && callbackFunc(err);
    });
  
    let ws = fs.createWriteStream(tarPath);
    ws.on('error', function(err) {
        if (err) {
            console.log('write error', tarPath);
        }
        callbackFunc && callbackFunc(err);
    });
    ws.on('close', function(ex) {
        callbackFunc && callbackFunc(ex);
    });
  
    rs.pipe(ws);
}

////复制文件夹及文件
let copyContent = function(srcDir, tarDir, cb){
    //读取源地址中的目录及文件
    fs.readdir(srcDir, function(err, files) {
        let count = 0;
        let checkEnd = function() {
            ++count == files.length && cb && cb();
        }
    
        if (err) {
            checkEnd();
            return;
        }

        files.forEach(function(file) {
            let srcPath = path.join(srcDir, file);
            let tarPath = path.join(tarDir, file);
    
            fs.stat(srcPath, function(err, stats) {
                if (stats.isDirectory()) {
                    fs.mkdir(tarPath, function(err) {
                        if (err) {
                            console.log(err+"        "+tarPath);
                            return;
                        }
                        //遍历该文件夹下所有文件
                        copyContent(srcPath, tarPath, checkEnd);
                    });
                } else {
                    copyFile(srcPath, tarPath, checkEnd);
                }
            });
        });
  
        //为空时直接回调
        files.length === 0 && cb && cb();
    });
}

////创建目录
let createDir = function(srcDir, tarDir, cb) {
    tarDir = path.join(tarDir, coursesName);
    
    //检测tarDir是否存在文件夹
    //存在则删除或跳过
    if(fs.existsSync(tarDir)){
        if(configInfo.autoCover){
            //删除原文件夹,占用线程
            console.log(coursesName+"已存在,开始删除...");
            child.execSync("rmdir /s/q " + tarDir);
            console.log("删除完成!");
        }else{
            console.log(coursesName+"已存在,自动退出")
            return;
            //提示已存在,请用户输入 Y跳过/N删除 进行后续流程;
            //TODO
        }
    }

    //创建文件夹,开始复制
    fs.mkdir(tarDir, ()=>{
        console.log(tarDir+"目录已创建\n开始复制内容...");
        copyContent(srcDir, tarDir, cb);
    });
}

module.exports = createDir;