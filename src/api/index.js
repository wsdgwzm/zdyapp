import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
//const BASE_URL = 'http://qijios.xinlande.com.cn/app/apph5/'
const BASE_URL = '/api'

/*登录*/
export const reqKey = () => ajax(BASE_URL+'/getkey')
export const reqLogin = (param1,param2) => ajax(BASE_URL+'/getlogin',{param1,param2},'POST')

/*个人中心*/
export const reqUserInfo = (token) => ajax(BASE_URL+'/GetMyInfo',{token})

/*首页*/
export const reqSwiper = () => ajax(BASE_URL+'/GetHomeBanner') //轮播图
export const reqLijian = () => ajax(BASE_URL+'/GetLiJian') //力荐
export const reqStudio = () => ajax(BASE_URL+'/GetStudio') //工作室
export const reqDaKaWenStock = () => ajax(BASE_URL+'/GetDaKaWenStock') //大咖问股
export const reqAppInfoMsg = (token,pageindex) => ajax(BASE_URL+'/GetAppInfoMsg',{token,pageindex}) //最新情报


/*特训*/
export  const reqTeaFilterList = () => ajax(BASE_URL+'/GetFxgTeacher') //特训老师列表
export  const reqTxList = (Teaid,pageindex) => ajax(BASE_URL+'/GetFxgCollegeList',{Teaid,pageindex}) //特训视频列表


/*圈子*/
export const reqGetTeaNote = (token,type,pageindex) => ajax(BASE_URL+'/GetTeaNote',{token,type,pageindex}) //笔记
export const reqGetJpk = () =>ajax(BASE_URL+'/GetMyPrivLesson') //精品课
