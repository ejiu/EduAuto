/**
  * 全局数据存储
  * by chenhf
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module GlobalData {

    //用户名字
    export var userName: string = "chenhf";

    export var bAuthority : boolean = true;
    export function hasAuthority(tAuthority : boolean): void {
        bAuthority = tAuthority;
        if(null != PageMgr.pageMgr().curPage)
        {
            PageMgr.pageMgr().curPage.setAuthority(tAuthority);
        }
     }
    
    export var userType :number = 2;//1：学生 2：老师

    export function isTeacher():boolean
    {
        if(2 == userType)
        {
            return true;
        }
        return false;
    }
}