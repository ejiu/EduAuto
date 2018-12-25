'use strict';

let baseCoursesPath         = "./config/baseCourses";       //基础项目
let targetCoursesPath       = "./result";                   //目标项目根目录
let templateCoursesPath     = "./config/templateCourses";   //模版项目
let templateExcelPath       = "./config/template.xlsx";     //模版配置表
let targetExcelPath         = "./config/target.xlsx";       //目标配置表
let autoCover               = true;                         //自动覆盖

module.exports = {
    basePath : baseCoursesPath,
    targetPath : targetCoursesPath,
    templatePath : templateCoursesPath,
    templateExcelPath : templateExcelPath,
    targetExcelPath : targetExcelPath,
    autoCover : autoCover
};