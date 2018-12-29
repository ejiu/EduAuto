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

    pageMgrData = pageMgrData.replace('// replaceContent', data);

    fs.writeFile(pageMgrPath, pageMgrData, (err)=>{
        if(err){
            return console.log(err);
        }
    });

    callback();
}

let changePageInfo = function(templatePath ,targetPath, targetInfo, callback){

    let pageinfoAdd = "";
    let pageAdd = "";

    let targetPageInfoPath = path.join(targetPath, 'resource', 'data', 'page_info.json');
    let templatePageInfoPath = path.join(templatePath, 'resource', 'data', 'page_info.json');
    let templatePageInfo = fs.readFileSync(templatePageInfoPath);
    let pageInfo = JSON.parse(templatePageInfo);

    for(let i = 1; i <= targetInfo.length; i++){

        //1. 补充page_info中每页的信息
        if(i>1){
            let tempPage = ',\
                \n\t\"page' + i + '\":\
                \n\t{\
                \n\t\t\"mainTitle\":\"Summary\",\
                \n\t\t\"time\":\"2 min\",\
                \n\t\t\"secTitle\":\"\",\
                \n\t\t\"tips\":\"\",\
                \n\t\t\"resources\": \
                \n\t\t[\
                \n\t\t\t\"bg_1_jpg\"\
                \n\t\t]\
                \n\t}\n';
            
            pageAdd += tempPage;
        }

        //2. 替换各panel中xxx_info
        let newPageName = targetInfo[i-1] + 'Panel' + i + '.ts';
        let targetPagePath = path.join(targetPath, 'src', 'Page', newPageName);
        
        let panelData = fs.readFileSync(targetPagePath, 'utf8');
        
        //!!!!  xxx_info需用 '' 单引号对包裹,不可 "" 双引号对包裹
        let matchStr = panelData.match(/\'.{1,30}_info\'/);
        if(matchStr == null){
            continue;
        }
        let tempInfo = matchStr[0];
        
        //替换规则: puzzlePanel1.ts中的"puzzle_info"改名为"puzzle_info_1"
        panelData = panelData.replace(/\'(.{1,30}_info)\'/g, '\''+'$1' + '_' + i + '\'');
        fs.writeFileSync(targetPagePath, panelData);

        //3. 添加xxx_info到page_info.json
        tempInfo = tempInfo.slice(1, tempInfo.length-1);
        let tempStr = ',\n\t\"' + tempInfo + "_" + i + "\":\n\t" + JSON.stringify(pageInfo[tempInfo]) + '\n';

        pageinfoAdd += tempStr;
    }

    let targetPageInfo = fs.readFileSync(targetPageInfoPath, 'utf8');
    targetPageInfo = targetPageInfo.replace('pageNum', targetInfo.length);
    fs.writeFileSync(targetPageInfoPath, targetPageInfo);//TODO更换方式
    fs.appendFileSync(targetPageInfoPath, pageAdd);
    fs.appendFileSync(targetPageInfoPath, pageinfoAdd + '}');
}

module.exports = {
    copyTemplate : copyTemplate,
    copyResource : copyResource,
    changePageMgr : changePageMgr,
    changePageInfo : changePageInfo
}