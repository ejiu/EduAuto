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
            copyPanelSkin(templatePath, targetPath, targetInfo[i-1], i, targetInfo.length, callback);
        }
    }
}

//params: 资源地址, 项目地址, 模版表格信息, 目标表格信息, 回调函数
let copyResource = function(){
    console.log("开始准备资源");
}

//params: 模版地址, 目标项目地址, 模板名称, 当前索引值
let copyPanelSkin = function(templatePath, targetPath, name, index, count, callback){
    
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
        //复制完所有panel文件
        if(count == index){
            callback();
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

let changePageInfo = function(targetPath, targetInfo, callback){
    for(let i = 1; i <= targetInfo.length; i++){
        //targetInfo[i-1];
        //遍历TargetInfo对应的文件,若存在_info,且字符串不为page_info,则在Base_page_info中找到该info,
        //将该info追加后缀_index写入新项目page_info,并修改该脚本;

        let newPageName = targetInfo[i-1] + 'Panel' + i + '.ts';
        let targetPagePath = path.join(targetPath, 'src', 'Page', newPageName);

        let panelData = fs.readFileSync(targetPagePath, 'utf8');

        let tempInfo = panelData.match(/\'\D{1,30}_info\'/)[0];
        // let result = panelData.replace(/\'\(\D{1,30}_info\)\'/g, 'abc');
        panelData = panelData.replace('jsonData', 'abc');
        // let result = panelData.replace(/\'\(\D{1,30}_info\)\'/g, '\''+'$1' + '_123\'');
        console.log(tempInfo);
        console.log(panelData);
        //正则匹配规则:

        // 类似 "xxxxxx_info" 的字符串, 统一替换为 "xxxxxx_info_index"的字符串,并复制到page_info中;
        // 可能的干扰项"page_info_json";
    }
}

module.exports = {
    copyTemplate : copyTemplate,
    copyResource : copyResource,
    changePageMgr : changePageMgr,
    changePageInfo : changePageInfo
}