/*通过mutation间接更新state的多个方法*/
import {RECEIVE_SWIPER} from './mutation-types'
import {reqSwiper} from "../api";

export default {
  //异步获取swiper
  async getIndexswper({commit,state}) {

    const result = await reqSwiper(state.token)
    if(result.code==1){
      const swiper = result.data
      commit(RECEIVE_SWIPER,{swiper})
    }
  }
}
