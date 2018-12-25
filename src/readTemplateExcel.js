'use strict';

//npm module
const xlsx = require('node-xlsx');
 
//custom module
const config = require('./config.js');

const sheets = xlsx.parse(config.templateExcelPath);        //获取到所有sheets
let pageMap = new Map();                                    //各页面模版信息

sheets.forEach(function(sheet){
    for(let rowId in sheet['data']){
        let row=sheet['data'][rowId];
        pageMap.set(row[0], row[1]);                        //模版英文名 : 模版名
    }
});


module.exports = {
    pageMap : pageMap,
};