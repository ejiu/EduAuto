'use strict';

//npm module
const xlsx = require('node-xlsx');
 
//custom module
const config = require('./config.js');

const sheets = xlsx.parse(config.targetExcelPath);  //获取到所有sheets
const coursesName = sheets[0]['data'][0][0];        //第一张表 第一列 第一行 为课程名称
let pageInfo = [];                                  //各页面模版信息

let readSheet = function(){
    sheets.forEach(function(sheet){
        for(let rowId in sheet['data']){                //sheet['data']是数组的父数组,其子元素是 数值索引:单行信息数组 构成的键值对
            let item = sheet['data'][rowId][1];         //故rowId为键值对中的数值索引
            if(item == undefined){
                return;
            }
            pageInfo.push(item);
        }
    });
}

readSheet();
pageInfo.shift();                                   //删除标题行和课程名行
pageInfo.shift();
// console.log(pageInfo.length);

module.exports = {
    coursesName : coursesName,
    pageInfo : pageInfo,
};