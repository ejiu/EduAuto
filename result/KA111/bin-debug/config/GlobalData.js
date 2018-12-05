/**
  * 全局数据存储
  * by chenhf
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var GlobalData;
(function (GlobalData) {
    //用户名字
    GlobalData.userName = "chenhf";
    GlobalData.bAuthority = true;
    function hasAuthority(tAuthority) {
        GlobalData.bAuthority = tAuthority;
        if (null != PageMgr.pageMgr().curPage) {
            PageMgr.pageMgr().curPage.setAuthority(tAuthority);
        }
    }
    GlobalData.hasAuthority = hasAuthority;
    GlobalData.userType = 2; //1：学生 2：老师
    function isTeacher() {
        if (2 == GlobalData.userType) {
            return true;
        }
        return false;
    }
    GlobalData.isTeacher = isTeacher;
})(GlobalData || (GlobalData = {}));
//# sourceMappingURL=GlobalData.js.map