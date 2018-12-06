'use strict';

//npm module
const fs = require('fs');
const path = require("path");

//复制文件
let copyFile = function(srcPath, tarPath, callback) {
    let rs = fs.createReadStream(srcPath);
    rs.on('error', function(err) {
        if (err) {
            console.log('read error', srcPath);
        }
        callback && callback(err);
    });
  
    let ws = fs.createWriteStream(tarPath);
    ws.on('error', function(err) {
        if (err) {
            console.log('write error', tarPath);
        }
        callback && callback(err);
    });
    ws.on('close', function(ex) {
        callback && callback(ex);
    });
  
    rs.pipe(ws);
}

//复制文件夹及文件
let copyContent = function(srcDir, tarDir, callback){
    //读取源地址中的目录及文件
    fs.readdir(srcDir, function(err, files) {
        let count = 0;
        let checkEnd = function() {
            ++count == files.length && callback && callback();
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
        files.length === 0 && callback && callback();
    });
}

//创建目录
let createDir = function(srcDir, tarDir, coursesName, autoCover = false, callback) {
    tarDir = path.join(tarDir, coursesName);
    
    //检测tarDir是否存在文件夹
    //存在则删除或跳过
    if(fs.existsSync(tarDir)){
        if(autoCover){
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
        copyContent(srcDir, tarDir, callback);
    });
}

module.exports = createDir;