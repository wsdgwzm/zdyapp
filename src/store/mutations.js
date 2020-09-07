/*直接更新state的多个方法*/
import {RECEIVE_SWIPER} from './mutation-types'
export default {
  [RECEIVE_SWIPER] (state,{swiper}){
    state.swiper = swiper
  }
}
