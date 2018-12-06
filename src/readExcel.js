'use strict';

//npm module
const xlsx = require('node-xlsx');
 
//custom module
const configInfo = require('./config.js');

const sheets = xlsx.parse(configInfo.testPath);     //获取到所有sheets
const coursesName = sheets[0]['data'][0][0];        //第一张表 第一列 第一行 为课程名称
let pageInfo = [];                                  //各页面模版信息

sheets.forEach(function(sheet){
    for(let rowId in sheet['data']){
        let row=sheet['data'][rowId];
        pageInfo.push(row[1]);
    }
});

pageInfo.shift();
pageInfo.shift();

module.exports = {
    coursesName : coursesName,
    pageInfo : pageInfo,
};