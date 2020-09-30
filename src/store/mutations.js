/*直接更新state的多个方法*/
import {RECEIVE_SWIPER,RECEVICE_TOKEN} from './mutation-types'
export default {
    [RECEIVE_SWIPER] (state,{swiper}){
      state.swiper = swiper
    },
    [RECEVICE_TOKEN] (state,{token}){
      state.token =token
    }
}
