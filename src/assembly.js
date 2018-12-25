'use strict';

const fs = require('fs');
const fileManager = require('./FileManager.js');
const path = require('path');

//params: 模板地址, 项目地址, 模版表格信息, 目标表格信息, 回调函数
let copyTemplate = function(templatePath, targetPath, templateInfo, targetInfo, callback){
    console.log("开始准备模版");
    //遍历targetInfo,在templateInfo中寻找,若存在则复制(*), 不存在则提示并跳过;
    for(let i = 1; i <= targetInfo.length; i++){
        if(templateInfo.has(targetInfo[i-1])){
            copyPanelSkin(templatePath, targetPath, targetInfo[i-1], i);
        }
    }

    callback();
}

//params: 资源地址, 项目地址, 模版表格信息, 目标表格信息, 回调函数
let copyResource = function(){
    console.log("开始准备资源");
}

let copyPanelSkin = function(templatePath, targetPath, name, index){
    
    let oldPageName = name + 'Panel.ts';
    let oldSkinName = name + 'Skin.exml';
    let templatePagePath = path.join(templatePath ,'src', 'Page', oldPageName);
    let templateSkinPath = path.join(templatePath ,'resource', 'page_skins', oldSkinName);
    
    let newPageName =name + 'Panel' + index + '.ts';
    let newSkinName =name + 'Skin' + index + '.exml';  
    let targetPagePath = path.join(targetPath, 'src', 'Page', newPageName);
    let targetSkinPath = path.join(targetPath, 'resource', 'page_skins', newSkinName);
    
    let panelData = fs.readFileSync(templatePagePath, 'utf8');
    let skinData = fs.readFileSync(templateSkinPath, 'utf8');

    panelData = panelData.replace(name + 'Panel', name + 'Panel' + index);
    panelData = panelData.replace(name + 'Skin', name + 'Skin' + index);
    skinData = skinData.replace(name + 'Skin', name + 'Skin' + index);

    fs.writeFile(targetPagePath, panelData, function(err){
        if(err){
            return console.log(err);
        }
    })

    fs.writeFile(targetSkinPath, skinData, function(err){
        if(err){
            return console.log(err);
        }
    })
}

let changePageMgr = function(targetPath, targetInfo, callback){
    let pageMgrPath = path.join(targetPath, 'src', 'core', 'PageMgr.ts');
    let pageMgrData = fs.readFileSync(pageMgrPath, 'utf8');
    
    let data = '';
    for(let i = 1; i <= targetInfo.length; i++){
        data += '\t\t\tcase '+ i + ':{\n';
        data += '\t\t\t\tpage = new ' + targetInfo[i-1] + 'Panel' + i + '();\n';
        data += '\t\t\t\tbreak;\n';
        data += '\t\t\t}\n';
    }
    // console.log(data);

    pageMgrData = pageMgrData.replace('// replaceContent', data);

    fs.writeFile(pageMgrPath, pageMgrData, (err)=>{
        if(err){
            return console.log(err);
        }
    });

    callback();
}

module.exports = {
    copyTemplate : copyTemplate,
    copyResource : copyResource,
    changePageMgr : changePageMgr
}