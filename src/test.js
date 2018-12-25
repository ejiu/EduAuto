// 'use strict';

let testFun1 = function(num, callback){
    console.log(num);
    callback(123);
};

let callbackTest = function(param1){
    console.log("callback" + param1);
}

testFun1(2, callbackTest);