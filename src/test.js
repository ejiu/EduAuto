'use strict';

let testFunc1 = function(str){
    console.log(1+str);
}

let testFunc2 = function(str){
    console.log(2+str);
}

let num = 1;

module.exports = {
    n : num,
    fun1 : testFunc1,
    fun2 : testFunc2
}