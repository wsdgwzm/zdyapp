<template>
    <div>
        <mt-navbar v-model="selected" fixed id="nav">
            <mt-tab-item :id="index" v-for="(item,index) in menus" :key="index" :class="selected==index ? 'is-selected':''" @click.native="tabChange(item.path)">{{item.name}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="active" id="page" swipeable>
            <!--笔记-->
            <mt-tab-container-item id="0" >
                <div v-if="active =='0'" v-infinite-scroll="noteMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
                    <div class="qz-title noborder">
                        <div class="title-bd"><img src="./images/qz/icon_tj.png" />推荐笔记</div>
                    </div>
                    <div class="section">
                        <div class="tjbj-list">
                            <a href="javascript:;" class="tjbj-item" v-for="item in tjNote"  @click="post('https://qijiapp.xinlande.com.cn/cctv/AppPost/NoteDetail',{PostID:item.PostID,token:token})">
                                <span class="tjbj-title">{{item.PostTitle}}</span>
                                <span class="time">{{item.TrueName}} {{item.RegTime}}</span>
                            </a>
                        </div>
                    </div>
                    <!-- 最新笔记 -->
                    <div class="qz-title noborder">
                        <div class="title-bd"><img src="./images/qz/icon_zx.png" />最新笔记</div>
                    </div>
                    <div class="section">
                        <ul class="bj-nav">
                            <li :class="noteCur==-1 ? 'active':''" @click="noteMore(-1)">全部</li>
                            <li :class="noteCur==0 ? 'active':''" @click="noteMore(0)">我的关注</li>
                        </ul>
                        <div class="zxbj-list">
                            <div class="zxbj-item" v-for="(item,index) in noteList" @click="post('https://qijiapp.xinlande.com.cn/cctv/AppPost/NoteDetail',{PostID:item.PostID,token:token})">
                                <div class="zxbj-hd">
                                    <div class="tec-box">
                                        <img :src="item.UserImage" class="tec-avator" />
                                        <div class="tec-box-bd">
                                            <div class="tec-name">{{item.TrueName}}</div>
                                            <div class="time">{{item.RegTime}}</div>
                                        </div>
                                    </div>
                                    <span class="jb" @click.stop="clickJb(item.PostID)">举报</span>
                                </div>
                                <div class="zxbj-title">{{item.PostTitle}}</div>
                                <div class="zxbj-info">{{item.PostContent}}</div>
                                <div class="zxbj-bot">
                                    <span class="view">{{item.ReadCount}}</span>
                                    <span class="comment">{{item.ReplyCount}}</span>
                                    <span class="like" :class="item.IsClick !=0 ? 'on':''" @click.stop="bjClickLike(item.PostID,item.IsClick,index)">{{item.ClickCount}}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <!--精品课-->
            <mt-tab-container-item id="1"  >
                <div v-if="active =='1'" v-infinite-scroll="znxyMore" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
                    <div class="qz-title" style="margin-top: 0;">
                        <div class="title-bd"><img src="./images/qz/icon_yb_jpk_rm.png" />热门精品课</div>
                    </div>
                    <div class="jpk-list">
                        <div class="jpk-item" v-for="(item,index) in studio" :key="index" @click="goJpkPage('/classIntro',item)">
                            <div class="jpk-hd">
                                <div class="jpk-title"  :class="item.IsPay==1? 'rm':'mf'">{{item.Title}}</div>
                                <a href="javascript:;"  @click.stop="jpkPop(item)" class="jpk-jj">课程简介</a>
                            </div>
                            <img :src="item.ImageUrl" class="jpk-img" />
                            <div class="jpk-bot">
                                <div class="jpk-tec">
                                    <img :src="item.UserImage" class="tec-avator" >
                                    <span class="tec-name">{{item.TrueName}}</span>
                                </div>
                                <div class="jpk-btn" v-if="item.IsPay==0">
                                    <span @click.stop="yytkPop(item.PLID)" class="yytk"></span>
                                    <span @click.stop="pswPop(item.LessonPwd)" class="jrgk"></span>
                                </div>
                                <div class="jpk-btn" v-else-if="item.IsPay==1&&item.PurID==0"><span class="ffgk"></span></div>
                                <div class="jpk-btn" v-else><span class="ygm"></span></div>
                            </div>
                        </div>
                    </div>
                    <div class="qz-title" >
                        <div class="title-bd"><img src="../live/images/live/icon_tx.png" />涨牛学院</div>
                        <a href="tx.html" class="more" ></a>
                    </div>
                    <VideoList :id="vid" ref="mychild"></VideoList>
                </div>
            </mt-tab-container-item>


            <mt-tab-container-item id="2" >
                <div v-if="active =='2'" v-infinite-scroll="qaList" infinite-scroll-disabled="loading" infinite-scroll-distance="30">
                    <div class="qz-title">
                        <div class="title-bd"><img src="./images/qz/icon_zxdk.png" />在线大咖</div>
                        <a href="dkwg.html" class="more"></a>
                    </div>
                    <div class="zxdk-list">
                        <div class="zxdk-item" v-for="item in dklist" @click="askPop(item.QuesExpend,item.UserID)">
                            <div class="dk-info">
                                <img class="dk-avator" :src="item.UserImage" />
                                <div class="dk-info-bd">
                                    <div class="dk-name">{{item.TrueName}}</div>
                                    <div class="dk-text">共解答<span>{{item.AnswerCount}}</span>条问股</div>
                                </div>
                            </div>
                            <div class="dk-ask">向TA提问</div>
                        </div>
                    </div>
                    <div class="qz-title">
                        <div class="title-bd"><img src="./images/qz/icon_jcwd.png" />精彩回答</div>
                    </div>
                    <ul class="askStock">
                        <li v-for="(item,index) in askStock" @click="goAskPage('askInfo.html?tuid='+item.AnsUserID,item)" >
                            <div class="user-box">
                                <img :src="item.QueUserImage" class="user-avator" />
                                <span class="user-name">{{item.QueTrueName? item.QueTrueName:item.QueUserID}}</span>
                            </div>
                            <div class="ask-info">
                                {{item.QuestionContent}}
                            </div>
                            <div class="answer-box">
                                <div class="tec-box">
                                    <img :src="item.UserImage" class="tec-avator" />
                                    <span class="tec-name">{{item.TrueName}}</span>
                                </div>
                                <div :class="['audio',!item.IsListen || 'off',playId==item.AnswerID ? 'active':'']"  @click.stop="playAudio(item.AnswerID,item.IsListen,item.AnsUserID,item.AnswerID,index,item.ListenExpend)"  v-if="item.AnswerRecord">
                                    <audio :id="item.AnswerID">
                                        <source :src="item.AnswerRecord" type="audio/ogg"></source>
                                    </audio>
                                </div>
                                <span class="duration" v-if="item.AnswerRecord">{{item.RecordTime}}</span>
                                <div class="answer-info" v-if="item.AnswerDesc">{{item.AnswerDesc}}</div>
                            </div>
                            <div class="bot">
                                <span class="icon-zan " :class="item.IsClick!=0 ? 'on':''" @click.stop="askLike(item.AnswerID,item.IsClick,index)">{{item.ClickCount}}</span>
                                <span class="time">{{item.RegTime}}</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </mt-tab-container-item>


            <mt-tab-container-item id="3">
                <div v-if="active =='3'">
                    444
                </div>
            </mt-tab-container-item>


            <mt-tab-container-item id="4">
                <div v-if="active =='4'">
                    555
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <mt-popup v-model="jpkInfoPop" popup-transition="popup-fade" id="jpkPop" >
            <div class="jpkInfoPop">
                <span class="close" @click="closePop()"></span>
                <div class="intro-hd">
                    <img :src="jpkinfo.UserImage">
                    <div class="class-name">{{jpkinfo.TrueName}}</div>
                </div>
                <div class="main">
                    <div class="title name"><span>课程名称</span></div>
                    <div class="info">{{jpkinfo.LessonDesc}}</div>
                    <div class="title time"><span>课程时间</span></div>
                    <div class="info">{{jpkinfo.TeachingHours}}</div>
                    <div class="title style"><span>老师风格</span></div>
                    <div class="info">{{jpkinfo.UserDesc}}</div>
                    <div class="title result"><span>老师成就</span></div>
                    <div class="info">{{jpkinfo.UserIntro}}</div>
                </div>
            </div>
        </mt-popup>
        <!--密码弹窗-->
        <div class="popBox layui-layer-wrap" style="display: none;">
            <span class="close"></span>
            <img src="../../common/images/jpk/lock.jpg">
            <input type="text" class="psw" v-model="jpkPwd" placeholder="请输入密码">
            <p>如有疑问请致电客服热线：010-87417588</p>
            <div class="popBtn" @click="viewJpk()">点击进入</div>
        </div>

        <!--预约成功-->
        <div class="popSuccess layui-layer-wrap" style="display: none;">
            <img src="../../common/images/jpk/icon-success.png">
            <p>预约成功</p>
            <div>客服将在24小时内与你联系 010-87417777</div>
        </div>

        <!-- 提问消耗钻石弹窗 -->
        <div class="tw-pop" id="askPop">
            <img src="./images/qz/tw.png" class="tw-img">
            <div class="tw-text1">本次提问需消耗：<span>{{askDiamond}}</span>钻石</div>
            <div class="tw-text2">当前可用余额：<span>{{Diamond}}</span>钻石</div>
            <div class="tw-btn" @click="goPage('ask.html?teaid='+tid)">确定</div>
        </div>
        <div class="tw-pop" id="listen">
            <img src="./images/qz/tw.png" class="tw-img">
            <div class="tw-text1">本次偷听需消耗：<span>{{needDiamond}}</span>钻石</div>
            <div class="tw-text2">当前可用余额：<span>{{Diamond}}</span>钻石</div>
            <div class="tw-btn" @click="listenConfrim()">确定</div>
        </div>
    </div>
</template>

<script>
    import {Navbar, TabItem,TabContainer,TabContainerItem,Popup} from 'mint-ui'
    import Vue from 'vue'
    Vue.component(Navbar.name, Navbar)
    Vue.component(TabItem.name, TabItem)
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    Vue.component(Popup.name, Popup)
    import {
                reqGetTeaNote,reqGetClickLike,
                reqGetJpk,reqOrderRecord,
                reqZxdk,reqQuestionList,reqQuesClickLike,reqQuesListen
    } from "../../api";
    import  VideoList  from "../../components/videoList/videoList"

    export default {
        data(){
            return{
                menus: [
                    {
                        name: "笔记",
                        path: '0'
                    },
                    {
                        name: "精品课",
                        path: '1'
                    },
                    {
                        name: "问答",
                        path: '2'
                    },
                    {
                        name: "锦囊",
                        path: '3'
                    },
                    {
                        name: "VIP圈",
                        path: '4'
                    }
                ],
                selected:'0',
                active:'0',
                token:'',
                loading:false,
                noteCur:-1,
                tjNote:'',
                noteList:[],
                notePage:0,
                znxyPage:0,
                askStock:[],
                studio:'',
                jpkPwd:'',
                LessonPwd:'',
                LessonID:'',
                jpkinfo:'',
                playState:false,
                playId:'',
                isplay:false,
                znxyList:'',
                vid:'',
                jpkInfoPop:false,
                Diamond:'',
                needDiamond:'',
                param:'',
                jnList:'',
                teacherList:'',
                vipCircle:'',
                dklist:'',
                tid:'',
                askDiamond:'',
                qaPage:0
            }
        },
        mounted(){
            this.token=this.untils.getCookie('token')
            reqGetTeaNote(this.token,1,1).then(res =>{
                if(res.code==1){
                    this.tjNote=res.data
                }
            })
            console.log(this.$route.params)
            if(this.untils.getQueryString("v")){
                this.active=this.$route.query.v
            }


        },
        methods:{
            tabChange(p){
                this.active=p
            },
            noteMore(t){
                if(t!=undefined){
                    this.noteCur=t
                    this.notePage=1
                    this.noteList=[]
                }else{
                    this.notePage++
                }
                this.loading=true
                reqGetTeaNote(this.token,this.noteCur,this.notePage).then(res =>{
                    console.log(res)
                    if(res.code==1){
                        this.noteList=this.noteList.concat(res.data)
                    }
                })
                this.loading=false
            },
            bjClickLike(i,c,index){//笔记点赞
                var that =this,t;
                if(this.token){
                    if(c==0){//点赞
                        reqGetClickLike(this.token,i,1).then(res =>{
                            console.log(res)
                            if(res!=''){
                                that.noteList[index].ClickCount++
                                that.noteList[index].IsClick++
                            }
                        })

                    }else{//取消点赞
                        reqGetClickLike(this.token,i,0).then(res =>{
                            console.log(res)
                            if(res!=''){
                                that.noteList[index].ClickCount--
                                that.noteList[index].IsClick=0
                            }
                        })

                    }
                }else{
                    this.untils.toLogin()
                }
            },
            clickJb(hotid){//举报

                if(this.token){
                    window.location.href='feedBack?hotid='+hotid+'&module=2'
                }else{
                    this.untils.toLogin()
                }
            },
            rmjpk(){
                reqGetJpk().then(res =>{
                    if(res.code==1){
                        this.studio=res.data
                    }
                })
            },
            jpkPop(item){
                this.jpkinfo=item
                setTimeout(()=>{
                    this.jpkInfoPop=true
                },200)
            },
            closePop(){
                this.jpkInfoPop=false
            },
            post(URL, PARAMS) {
                if(this.token){
                    var temp_form = document.createElement("form");
                    temp_form.action = URL;
                    temp_form.target = "_blank";
                    temp_form.method = "post";
                    temp_form.style.display = "none";
                    for (var x in PARAMS) {
                        var opt = document.createElement("textarea");
                        opt.name = x;
                        opt.value = PARAMS[x];
                        temp_form .appendChild(opt);
                    }
                    document.body.appendChild(temp_form);
                    temp_form.submit();
                }else{
                    this.untils.toLogin()
                }
            },
            yytkPop(id){//预约听课弹窗
                console.log(id)
                if(this.token){
                    reqOrderRecord(this.token,id).then(res =>{
                        console.log(res)
                        if(res.code==1){
                            layer.open({
                                type:1,
                                title:false,
                                closeBtn:false,
                                skin:'msg',
                                time:2000,
                                area:['5rem','1.6rem'],
                                content:$(".popSuccess")
                            })
                        }
                    })

                }
                else{
                    this.untils.toLogin()
                }
            },
            znxyMore(){
                this.$refs.mychild.loadMore('')
            },
            goPage(u){
                if(this.token){
                    window.location.href=u
                }else{
                    this.untils.toLogin()
                }
            },
            pswPop(p,i){//精品课观看密码弹窗
                this.LessonPwd=p
                this.LessonID=i
                this.jpkPwd=''
                layer.open({
                    type:1,
                    title:false,
                    closeBtn:false,
                    skin:'default',
                    area:['5rem','4.5rem'],
                    content:$(".popBox")
                })
            },
            viewJpk(){//输入密码查看精品课
                var jpkInfo=JSON.parse(this.untils.getCookie("jpkInfo"))
                layer.closeAll()
                if(this.jpkPwd==this.LessonPwd){
                    this.untils.setCookie(this.LessonID,'true')
                    window.location.href=jpkInfo.LiveUrl
                }else{
                    layer.msg("密码错误")
                }
            },
            goJpkPage(u,item){//查看精品课
                var LessonID=this.untils.getCookie(item.PLID)
                this.untils.setCookie('jpkInfo',JSON.stringify(item))
                if(this.token){
                    if(LessonID){
                        window.location.href=item.LiveUrl
                    }else{
                        this.pswPop(item.LessonPwd,item.PLID)
                    }

                }else{
                    this.untils.toLogin()
                }
            },
            getTList(){//在线大咖列表
                var that=this
                reqZxdk(this.token).then(res =>{
                    if(res.code==1){
                        that.dklist=res.data
                    }
                })

            },
            askPop(d,tid){//提问弹窗
                if(this.token){
                    this.tid=tid
                    this.askDiamond=d
                    layer.open({
                        type:1,
                        title:false,
                        closeBtn:false,
                        skin:'msg',
                        shadeClose:true,
                        area:['5.2rem','4.5rem'],
                        content:$("#askPop")
                    })
                }else{
                    this.untils.toLogin()
                }
            },
            qaList(){//问答列表
                this.qaPage++
                reqQuestionList(this.token,this.qaPage).then(res =>{
                    this.askStock=this.askStock.concat(res.data)
                })

            },
            askLike(i,c,index){//问股点赞
                if(c==0){//点赞
                    reqQuesClickLike(this.token,i,2,1).then(res =>{
                        if(res!=''){
                            this.askStock[index].ClickCount++
                            this.askStock[index].IsClick++
                        }
                    })
                }else{//取消点赞
                    reqQuesClickLike(this.token,i,2,0).then(res =>{
                        this.askStock[index].ClickCount--
                        this.askStock[index].IsClick=0
                    })
                }
            },
            playAudio(i,p,tid,rid,o,d){//播放偷偷听音频
                if(this.token){
                    this.param=[i,p,tid,rid,o,d]
                    if(d!=0&&p==0){
                        this.needDiamond=d
                        layer.open({
                            type:1,
                            title:false,
                            closeBtn:false,
                            skin:'msg',
                            shadeClose:true,
                            area:['5.2rem','4.5rem'],
                            content:$("#listen")
                        })
                    }else{
                        this.listenConfrim()
                    }
                }else{
                    this.untils.toLogin()
                }

            },
            listenConfrim(){//记录偷偷听状态，是否听过
                var i=this.param[0],
                    p=this.param[1],
                    tid=this.param[2],
                    rid=this.param[3],
                    o=this.param[4];
                let audio= document.getElementById(i);

                this.playState=!this.playState;
                if(this.playState){
                    audio.play()
                    this.playId=i
                }else{
                    this.playId=''
                    audio.pause()
                }
                layer.closeAll()
                if(p==0){
                    console.log("偷听")
                    reqQuesListen(this.token,tid,rid).then(res =>{
                        if(res.code==1){
                            this.isplay=true
                            this.askStock[o].IsListen=1
                            this.Diamond=res.msg
                            this.untils.setCookie('diamonds',res.msg)
                        }
                    })

                }
            },
            goAskPage(u,item){//问股详情
                if(this.token){
                    this.untils.setCookie("askInfo",JSON.stringify(item))
                    window.location.href=u
                }else{
                    this.untils.toLogin()

                }
            },
        },
        watch: {
            active: function (val) {
                this.selected = parseInt(val)
                switch (this.selected){
                    case 0:
                        break;
                    case 1:

                        this.rmjpk()
                        break;
                    case 2:

                        this.getTList()
                        break;
                    case 3:
                        //this.rmjpk()
                        break;
                    case 4:

                        //this.rmjpk()
                        break;
                }
            }
        },
        components:{
            Navbar,
            TabItem,
            TabContainer,
            TabContainerItem,
            VideoList
        }
    }
</script>

<style scoped>

    /* 顶部导航 */
    #nav{
        border-bottom:1px solid #ebebeb;
        height: 0.9rem;
        padding: 0 0.3rem;
        background: #fff;
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        z-index: 15;
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        justify-content: space-between;
    }
    #nav .mint-tab-item {
        flex: 1;
        line-height:0.9rem;
        text-align: center;
        position: relative;
        padding: 0;
        font-size: 0.32rem!important;
    }
    #nav  .mint-tab-container-item{
        height: 100%;
        overflow-y: auto;
    }
    #nav .mint-tab-item.is-selected{
        color: #e64d43;
        border-color: #e64d43;
        margin-bottom: 0;
    }

    #nav .bar {
        width:20%;
        height:3px;
        position:absolute;
        bottom:0px;
        background:#e64d43;
    }




    #page {
        padding-top: 0.9rem;
        padding-bottom: 1rem;
        box-sizing: border-box;
        height:100%;
    }
    #page .slidepage {
        height:100%;
        overflow-y: scroll;
    }
    .qz-title{
        height: 0.9rem;
        border-bottom:1px solid #c9c9c9;
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        background: #fff;
    }
    .qz-title.noborder{
        border-bottom:none
    }
    .qz-title .title-bd{
        float: left;
        height: 0.9rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        line-height: 0.9rem;
        font-size: 0.3rem;
    }
    .qz-title .title-bd img{
        width: 0.53rem;
        height: 0.53rem;
        margin-right: 0.1rem;
    }
    .qz-title .more{
        background: url(/src/common/images/icon_arw_rt.png) no-repeat center center;
        background-size: 0.11rem 0.21rem;
        width: 0.4rem;
        height: 0.9rem;
        float: right;
        display: block;
    }


    /* 笔记 */
    .tjbj-list {
        background-color: #fff;
        padding: 0.1rem 0 0.05rem;
    }
    .tjbj-list .tjbj-item{
        margin: 0.05rem 0.3rem 0.1rem;
        height: 0.5rem;
        line-height: 0.52rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 0.28rem;
        padding-left: 0.65rem;
        color: #333;
        background: url(./images/qz/icon_zt.png) no-repeat left center;
        background-size: 0.56rem 0.3rem;
    }
    .tjbj-list .tjbj-item .tjbj-title{
        width: 3rem;
        height: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .tjbj-list .tjbj-item .time{
        color: #999;
        font-size: 0.2rem;
    }


    /* 最新笔记 */
    .bj-nav{
        height: 0.8rem;
        border-bottom: 1px solid #efeff4;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background: #fff;
    }
    .bj-nav li{
        width: 1.5rem;
        height: 0.55rem;
        line-height: 0.55rem;
        border-top-left-radius: 0.275rem;
        border-bottom-left-radius: 0.275rem;
        border: 1px solid #f5914b;
        font-size: 0.28rem;
        text-align: center;
    }
    .bj-nav li.active{
        background: #f5914b;
        color: #fff;
    }
    .bj-nav li:last-child{
        width: 1.6rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0.275rem;
        border-bottom-right-radius: 0.275rem;
    }

    .zxbj-list .zxbj-item{
        background: #fff;
        padding: 0.2rem 0.3rem;
        margin-bottom: 0.2rem;
    }
    .zxbj-list .zxbj-item .zxbj-hd{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        height: 0.8rem;
    }
    .zxbj-list .zxbj-item .zxbj-hd .tec-box{
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
    }
    .zxbj-list .zxbj-item .zxbj-hd .tec-box .tec-avator{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        border: 1px solid #e3e1e4;
        margin-right: 0.1rem;
    }
    .zxbj-list .zxbj-item .zxbj-hd .tec-box .tec-box-bd{
        padding-top: 0.05rem;
    }
    .zxbj-list .zxbj-item .zxbj-hd .tec-box .tec-box-bd .tec-name{
        background: url(../index/images/index/tab_ls.png) no-repeat right center;
        background-size: 0.44rem 0.2rem;
        display: inline-block;
        padding-right: 0.5rem;
    }
    .zxbj-list .zxbj-item .zxbj-hd .tec-box .tec-box-bd .time{
        color: #7c7c7c;
        font-size: 0.24rem;
    }
    .zxbj-list .zxbj-item .zxbj-hd .jb{
        background: url(../live/images/live/icon_jb.png) no-repeat center top;
        background-size:0.25rem 0.3rem;
        padding-top: 0.35rem;
        text-align: center;
        font-size: 0.24rem;
        color: #9a9a9a;
    }
    .zxbj-list .zxbj-item .zxbj-title{
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
        font-weight: bold;
    }
    .zxbj-list .zxbj-item .zxbj-info{
        color: #4f4f4f;
        font-size: 0.28rem;
        line-height: 0.4rem;
        height: 1.2rem;
        overflow: hidden;
    }
    .zxbj-list .zxbj-item .zxbj-img{
        max-width: 100%;
        margin-top: 0.1rem;
    }
    .zxbj-list .zxbj-item .zxbj-bot{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-top: 0.15rem;
        height: 0.4rem;
        line-height: 0.4rem;
    }
    .zxbj-list .zxbj-item .zxbj-bot span{
        margin-right: 0.3rem;
        display: inline-block;
        font-size: 0.22rem;
        color: #777;
    }
    .zxbj-list .zxbj-item .zxbj-bot .view{
        background: url(./images/qz/icon_Bj_ll2.png) no-repeat left center;
        background-size:0.29rem 0.19rem;
        padding-left: 0.35rem;
    }
    .zxbj-list .zxbj-item .zxbj-bot .comment{
        background: url(./images/qz/icon_Bj_pl2.png) no-repeat left center;
        background-size:0.27rem 0.24rem;
        padding-left: 0.32rem;
    }
    .zxbj-list .zxbj-item .zxbj-bot .like{
        background: url(./images/qz/icon_Bj_like.png) no-repeat left center;
        background-size:0.32rem 0.26rem;
        padding-left: 0.36rem;
    }
    .zxbj-list .zxbj-item .zxbj-bot .like.on{
        background: url(./images/qz/icon_Bj_like2.png) no-repeat left center;
        background-size:0.32rem 0.26rem;
        padding-left: 0.36rem;
    }


    /* 精品课 */
    .jpk-list {
        margin-bottom: 0.2rem;
    }
    .jpk-list .jpk-item{
        background: #fff;
        border-bottom: 1px solid #f0f0f0;
        padding:0.25rem 0.3rem;
    }
    .jpk-list .jpk-item .jpk-hd{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 0.6rem;
        line-height: 0.6rem;
        margin-bottom: 0.1rem;
    }
    .jpk-list .jpk-item .jpk-hd .jpk-title{
        padding-right: 0.75rem;
        display: inline-block;
        font-size: 0.31rem;
        color: #323232;
    }
    .jpk-list .jpk-item .jpk-hd .jpk-title.mf{
        background: url(./images/qz/tab_mf.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }
    .jpk-list .jpk-item .jpk-hd .jpk-title.rm{
        background: url(./images/qz/tab_rm.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }
    .jpk-list .jpk-item .jpk-hd .jpk-jj{
        background: url(./images/qz/bt_kcjj.png) no-repeat right center;
        background-size: 0.27rem 0.27rem;
        padding-right: 0.32rem;
        font-size: 0.24rem;
        color:#f39800
    }
    .jpk-list .jpk-item .jpk-img{
        display: block;
        width: 100%;
        height: 1.6rem;
        margin-bottom: 0.1rem;
    }
    .jpk-list .jpk-item .jpk-bot{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 0.75rem;
        line-height: 0.75rem;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-tec{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-tec .tec-avator{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        margin-right: 0.1rem;
        border: 1px solid #e3e1e4;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-tec .tec-name{
        width: 2rem;
        height: 0.7rem;
        line-height: 0.7rem;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-btn{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-btn span{
        width: 1.7rem;
        height: 0.5rem;
        margin-left: 0.1rem;
        display: inline-block;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-btn span.yytk{
        background: url(./images/qz/bt_yytk.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-btn span.jrgk{
        background: url(./images/qz/bt_jrgk.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-btn span.ffgk{
        background: url(./images/qz/bt_ffgk.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .jpk-list .jpk-item .jpk-bot .jpk-btn span.ygm{
        background: url(./images/qz/bt_ygm.png) no-repeat center center;
        background-size: 100% 100%;
    }

    .course-list{
        background: #fff;
        overflow: auto;
        padding: 0.2rem 0 0.2rem 0.3rem;
        margin-bottom: 0.2rem;
    }
    .course-list .course-item{
        width: 3.2rem;
        float: left;
        margin: 0 .5rem 0.1rem 0;
    }
    .course-list .course-item:nth-child(2n){
        margin-right: 0;
    }
    .course-list .course-item .course-hd{
        width: 100%;
        height: 2.3rem;
        position: relative;
        overflow: hidden;
    }
    .course-list .course-item .course-hd img{
        width: 100%;
        height: 100%;
    }
    .course-list .course-item .course-hd i{
        width: 0.7rem;
        height: 0.35rem;
        display: block;
        position: absolute;
        top:0;
        right:0;
        z-index: 11;
    }
    .course-list .course-item .course-hd i.free{
        background: url(../live/images/live/icon-free.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .course-list .course-item .course-hd .title{
        position: absolute;
        bottom:0;
        right:0;
        z-index: 11;
        width: 100%;
        height: 0.35rem;
        line-height: 0.35rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        color: #fff;
        font-size: 0.2rem;
        background: rgba(0,0,0,0.6);
    }
    .course-list .course-item .course-tec{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.26rem;
    }
    .course-list .course-item .course-tec img{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        margin-right: 0.1rem;
    }
    .course-list .course-item .course-bot{
        height: 0.35rem;
        line-height: 0.35rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 0.22rem;
        color:  #999;
    }



    .popBox{
        width: 5rem;
        height: 4.5rem;
        background: #fff;
        border-radius: 0.1rem;
        padding: 0.05rem;
        box-sizing: border-box;
        display: none;
        position: relative;
    }
    .popBox .close{
        background: url(/src/common/images/jpk/close.png) no-repeat center center;
        background-size: 0.34rem 0.34rem;
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        position: absolute;
        top:0.15rem;
        right:0.15rem
    }
    .popBox img{
        width: 100%;
    }
    .popBox .psw{
        display: block;
        border: 1px solid #999;
        height: 0.7rem;
        border-radius: 0.1rem;
        line-height: 0.7rem;
        padding: 0;
        padding-left: 0.3rem;
        font-size: 0.26rem;
        margin: 0 0.2rem;
        width: 4.5rem;
        box-sizing: border-box;
    }
    .popBox p{
        font-size: 0.2rem;
        color: #999;
        height: 0.6rem;
        line-height: 0.4rem;
        padding: 0.1rem 0.2rem;
    }
    .popBox .popBtn{
        margin:  0 0.2rem;
        height: 0.7rem;
        background: #d32d26;
        color: #fff;
        line-height:0.7rem;
        text-align: center;
        font-size: 0.26rem;
        border-radius: 0.1rem;
    }
    .layui-layer.default,.layui-layer.msg{
        background: transparent;
        border-radius: 0.1rem;
    }
    .layui-layer.msg{
        box-shadow: none;
    }

    .popSuccess{
        width: 5rem;
        height: 1.6rem;
        display: none;
        padding-top: 0.2rem;
        text-align: center;
        line-height: 0.45rem;
        background: rgba(0,0,0,0.6);
        color: #fff;
        font-size: 0.2rem;
        border-radius: 0.1rem;
    }
    .popSuccess img{
        width: 0.45rem;
        display: block;
        margin: 0 auto;
    }
    .popSuccess p{
        font-size: 0.32rem;
        color: #fff;
    }




    /* 问答 */
    .zxdk-list{
        background: #fff;
        padding:0.35rem 0 0.2rem 0.3rem;
        overflow: auto;
    }
    .zxdk-list .zxdk-item{
        width: 3.3rem;
        height: 1.9rem;
        box-sizing: border-box;
        border-radius:0.1rem;
        border: 1px solid #ebebeb;
        float: left;
        margin-right: 0.3rem;
        margin-bottom: 0.35rem;
    }
    .zxdk-list .zxdk-item:nth-child(2n){
        margin-right: 0;
    }
    .zxdk-list .zxdk-item .dk-info{
        height: 1.2rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        padding: 0.15rem 0 0 0.15rem;
    }
    .zxdk-list .zxdk-item .dk-info .dk-avator{
        width: 0.75rem;
        height:0.75rem;
        border-radius: 50%;
        margin-right: 0.1rem;
    }
    .zxdk-list .zxdk-item .dk-info .dk-info-bd .dk-name{
        font-size: 0.3rem;
        line-height: 0.5rem;
    }
    .zxdk-list .zxdk-item .dk-info .dk-info-bd .dk-text{
        color: #7d7d7d;
        font-size: 0.24rem;
        line-height: 0.3rem;
    }
    .zxdk-list .zxdk-item .dk-info .dk-info-bd .dk-text span{
        color: #e64d43;
    }
    .zxdk-list .zxdk-item .dk-ask{
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: #e65953;
        font-size: 0.34rem;
        background-color: #ebebeb;
    }


    .askStock li{
        background: #fff;
        margin-bottom: 0.2rem;
        padding: 0 0.3rem;
    }
    .askStock li .user-box{
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        align-items: center;
        height:1rem ;
    }
    .askStock li .user-box .user-avator{
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        margin-right: 0.1rem;
    }
    .askStock li .user-box .user-name{
        font-size: 0.24rem;
        margin-right: 0.1rem;
    }
    .askStock li .user-box .level{
        width: 0.4rem;
        height: 0.4rem;
        display: inline-block;
    }
    .askStock li .user-box .level.zs{
        background: url(../index/images/index/icon_zsb.png) no-repeat center center;
        background-size: 0.33rem 0.25rem;
    }
    .askStock li .user-box .level.zz{
        background: url(../index/images/index/icon_zzb.png) no-repeat center center;
        background-size: 0.33rem 0.27rem;
    }
    .askStock li .ask-info{
        line-height: 0.5rem;
        background: url(../index/images/index/icon_wen.png) no-repeat left 0.1rem;
        background-size: 0.37rem 0.28rem;
        padding-left:0.45rem ;
        font-size: 0.28rem;
        padding-bottom: 0.1rem;
        border-bottom: 1px dashed  #ccc;
    }
    .askStock li .answer-box{
        padding: 0.3rem 0 0.1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border-bottom: 1px solid #eaeaea;
    }
    .askStock li .answer-box .tec-box .tec-avator{
        width: 0.85rem;
        height: 0.85rem;
        border-radius: 50%;
        display: block;
    }
    .askStock li .answer-box .tec-box .tec-name{
        height: 0.45rem;
        line-height: 0.45rem;
        background: url(../index/images/index/tab_ls.png) no-repeat right center;
        background-size: 0.44rem 0.2rem;
        padding-right:0.5rem;
        font-size: 0.2rem;
        color: #4b4b4b;
    }
    .askStock li .answer-box .audio{
        background: url(../index/images/index/wyttt.png) no-repeat;
        background-size: 100% 100%;
        width: 2.76rem;
        height: 0.6rem;
        margin: 0.1rem 0.15rem;
    }
    .askStock li .answer-box .audio.active{
        background: url(../index/images/index/wyttt.gif) no-repeat;
        background-size: 100% 100%;
    }
    .askStock li .answer-box .audio.off{
        background: url(../index/images/index/wyttt2.png) no-repeat;
        background-size: 100% 100%;
    }
    .askStock li .answer-box .audio.off.active{
        background: url(../index/images/index/wyttt2.gif) no-repeat;
        background-size: 100% 100%;
    }
    .askStock li .answer-box .answer-info{
        padding-top: 0.05rem;
        line-height: 0.4rem;
        width: 5.2rem;
        height:1.1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 0.24rem;
        color: #999;
        padding-left: 0.1rem;
    }
    .askStock li .answer-box .duration{
        line-height: 0.6rem;
        margin-top: 0.13rem;
    }
    .askStock li .bot{
        height: 0.7rem;
        line-height: 0.7rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 0.22rem;
        color: #afafaf;
    }
    .askStock li .bot .icon-zan{
        background: url(../index/images/index/icon_zan-h.png) no-repeat left center;
        background-size: 0.18rem 0.14rem;
        padding-left: 0.25rem;
        display: block;
        margin-right: 0.25rem;
    }
    .askStock li .bot .icon-zan.on{
        background: url(../index/images/index/icon_zan.png) no-repeat left center;
        background-size: 0.18rem 0.14rem;
    }

    .tw-pop{
        width: 5.2rem;
        height: 4.5rem;
        padding: 0.1rem;
        background: #fff;
        border-radius: 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        display: none;
    }
    .tw-pop .tw-img{
        width: 100%;
        display: block;
        margin-bottom: 0.2rem;
    }
    .tw-pop  .tw-text1{
        font-size: 0.34rem;
        color: #333;
        line-height: 0.7rem;
    }
    .tw-pop  .tw-text2{
        font-size: 0.3rem;
        color: #717171;
        line-height: 0.7rem;
    }
    .tw-pop  .tw-text1 span, .tw-pop  .tw-text2 span{
        color: #ff0000;

    }
    .tw-btn{
        width: 2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.1rem;
        display: block;
        margin: 0.2rem auto 0;
        background: #FF0000;
        text-align: center;
        color: #fff;
        font-size: 0.34rem;
    }



    /* 锦囊 */
    .jn-banner{
        width: 100%;
        height: 3rem;
        display: block;
        margin-bottom: 0.2rem;
    }
    .jn-zt-box{
        height: 0.8rem;
        background: url(./images/qz/icon_zt2.png) no-repeat 0.3rem #fff;
        background-size: 0.56rem 0.3rem;
        padding:0.1rem 0.3rem 0.1rem 1rem ;
    }
    .jn-zt-box.vipq{
        background: url(./images/qz/jt.png) no-repeat 0.2rem center #fff;
        background-size: 0.7rem 0.3rem;
        padding:0.1rem 0.3rem 0.1rem 1.2rem ;
    }
    .jn-zt-box .jn-zt-bd{
        height: 0.6rem;
        width: 100%;
        overflow: hidden;
        background: url(../index/images/index/icon_arw_rt.png) no-repeat right center;
        background-size: 0.11rem 0.21rem;
    }
    .jn-zt-box .jn-zt-ul{
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .jn-zt-box .jn-zt-ul li{
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
    }

    .jn-list {
        margin-top: 0.2rem;
    }
    .jn-list .jn-item{
        background-color: #fff;
        padding: 0.1rem 0;
        margin-bottom: 0.2rem;
    }
    .jn-list .jn-item .jn-hd{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.25rem;

    }
    .jn-list .jn-item .jn-hd .jn-title{
        font-size: 0.26rem;
        background: url(./images/qz/tab_lj.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
        padding-right: 0.67rem;
    }
    .jn-list .jn-item .jn-hd .jn-title.hb{
        background: url(./images/qz/tab_hb.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }

    .jn-list .jn-item .jn-hd .tag{
        display: block;
        font-size: 0.22rem;
    }
    .jn-list .jn-item .jn-hd .tag.ygm{
        color: #f08300;
    }
    .jn-list .jn-item .jn-hd .tag.yxz{
        width: 1.58rem;
        height: 0.42rem;
        background: url(./images/qz/icon_hbyxz.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .jn-list .jn-item .jn-hd .tag.qgz{
        width: 1.58rem;
        height: 0.42rem;
        background: url(./images/qz/icon_hnqdz.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .jn-list .jn-item .jn-hd .tag.vip{
        width: 2.32rem;
        height: 0.28rem;
        background: url(./images/qz/icon_mjnsvip.png) no-repeat center center;
        background-size: 100% 100%;
    }
    .jn-list .jn-item .info{
        color: #7d7d7d;
        font-size: 0.24rem;
        line-height: 0.38rem;
        padding: 0 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .jn-list .jn-item .jd-bt {
        margin-top: 0.1rem;
        height: 0.9rem;
        line-height: 0.6rem;
        padding: 0.2rem 0.25rem;
        border-top:1px solid #ddd
    }
    .jn-list .jn-item .jd-bt .avator{
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        float: left;
        margin-right: 0.15rem;
    }
    .jn-list .jn-item .jd-bt-info{
        margin-left: 0.75rem;
    }
    .jn-list .jn-item .jd-bt-info .name{
        font-size: 0.24rem;
    }
    .jn-list .jn-item .jd-bt-info .ls-bd{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 0.3rem;
        line-height: 0.3rem;
        color: #afafaf;
        font-size: 0.22rem;
    }
    .jn-list .jn-item .jd-bt-info .ls-bd .line{
        margin: 0 0.15rem;
    }



    /* VIP圈 */

    .ls-list{
        width: 100%;
        text-align: center;
        height:2.92rem ;
        padding: 0.2rem 0.3rem;
        overflow-x: auto;
        white-space: nowrap;
        /* display:-webkit-flex; display: flex; -webkit-flex-flow:row nowrap;  flex-flow:row nowrap; overflow-x: auto; list-style: none; */

    }
    .ls-list .ls-item{
        width: 2.06rem;
        height: 2.52rem;
        background: url(./images/qz/vip_bg.png) no-repeat center center;
        background-size: 100% 100%;
        text-align: center;
        display: inline-block;
        margin-right: 0.3rem;
        vertical-align: middle;
        box-sizing: border-box;
        padding-top: 0.25rem;
    }
    .ls-list .ls-item .avator{
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        display: block;
        margin: 0 auto 0.08rem;
    }
    .ls-list .ls-item .ls-name{
        font-size: 0.28rem;
        line-height: 0.45rem;
    }
    .ls-list .ls-item .star,.ls-list .ls-item .fans {
        color: #7d7d7d;
        font-size: 0.22rem;
        line-height: 0.35rem;
    }
    .ls-list .ls-item .num{
        color: #ff6600;
    }


    .jht-box{
        height: 0.8rem;
        line-height: 0.8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 0.3rem;
        background:  #fff;
    }
    .jht-box .title{
        background: url(./images/qz/jt.png) no-repeat left center;
        background-size: 0.7rem 0.3rem;
        padding-left: 0.8rem;
    }
    .jht-box .more{
        background: url(../index/images/index/icon_arw_rt.png) no-repeat right center;
        background-size: 0.11rem 0.21rem;
        width: 0.5rem;
        height: 100%;
        display: block;
    }

    .vipq-box{
        background: #fff;
        padding: 0 0.3rem;
    }
    .vipq-box .vipq-item{
        padding: 0.2rem 0;
        border-bottom:1px solid #eaeaea;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .vipq-item .item-hd{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .vipq-item .item-hd .avator{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        float: left;
    }
    .vipq-item .item-hd  .item-bd{
        margin-left: 0.15rem;
    }
    .vipq-item .item-hd  .item-bd .name{
        display: inline-block;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.28rem;
    }
    .vipq-item .item-hd  .item-bd .name.hb{
        background: url(./images/qz/tab_hb.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }
    .vipq-item .item-hd  .item-bd .name.rm{
        background: url(./images/qz/tab_rm.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }
    .vipq-item .item-hd  .item-bd .name.rmen{
        background: url(./images/qz/tab_rmen.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }
    .vipq-item .item-hd  .item-bd .name.mf{
        background: url(./images/qz/tab_mf.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }
    .vipq-item .item-hd  .item-bd .name.cz{
        background: url(./images/qz/tab_cz.png) no-repeat right center;
        background-size: 0.67rem 0.28rem;
    }
    .vipq-item .item-hd  .item-bd .info{
        height: 0.4rem;
        line-height: 0.4rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #7d7d7d;
        font-size: 0.24rem;
    }
    .vipq-item .item-hd  .item-bd .num{
        background: url(./images/qz/icon_ren.png) no-repeat left center;
        background-size: 0.22rem 0.2rem;
        padding-left: 0.25rem;
        color: #afafaf;
        font-size: 0.22rem;
        line-height: 0.25rem;
    }
    .vipq-item .vipqBtn{
        width: 1.2rem;
        height: 0.44rem;
        border-radius: 0.1rem;
        text-align: center;
        line-height: 0.44rem;
        background: #ff5d52;
        font-size: 0.28rem;
        color: #fff;
        display: block;
    }












    /* 精品课详情弹窗 */
    #jpkPop{
        width: 100%;
        height: 100%;
        transform:none;
        left: 0;
        top:0;
    }
    .jpkInfoPop{
        width:100%;
        height: 100%;
        position: relative;
    }
    .jpkInfoPop .intro-hd{
        background: url("../../common/images/jpk/headBg02.jpg") no-repeat center top;
        background-size: 100% 2.24rem;
        padding-top: 1.6rem;
        text-align: center;
        font-size: 0.32rem;
        font-weight: bold;
        color: #555;
        padding-bottom: 0.4rem;
    }
    .jpkInfoPop .intro-hd img{
        width: 1.2rem;
        height: 1.2rem;
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        margin-bottom: 0.2rem;
    }
    .jpkInfoPop .title{
        margin-bottom: 0.2rem;
    }
    .jpkInfoPop .title span{
        display: inline-block;height: 0.6rem;
        background: ;
        line-height: 0.6rem;
        color: #fff;
        font-size: 0.26rem;
        width: 2.5rem;
        padding-left: 1rem;
    }
    .jpkInfoPop .title.name span{
        background: url(../../common/images/jpk/icon-kc01.png) no-repeat 0.45rem center #ee8d2f;
        background-size: 0.36rem 0.42rem;
    }
    .jpkInfoPop .title.time span{
        background: url(../../common/images/jpk/icon-kc02.png) no-repeat 0.45rem center #ee8d2f;
        background-size: 0.46rem 0.42rem;
    }
    .jpkInfoPop .title.style span{
        background: url(../../common/images/jpk/icon-kc03.png) no-repeat 0.45rem center #ee8d2f;
        background-size: 0.42rem 0.42rem;
    }
    .jpkInfoPop .title.result span{
        background: url(../../common/images/jpk/icon-kc04.png) no-repeat 0.45rem center #ee8d2f;
        background-size: 0.38rem 0.41rem;
    }
    .jpkInfoPop .info{
        padding: 0 0.3rem;
        margin-bottom: 0.2rem;
    }
    .jpkInfoPop .close{
        background: url(../../common/images/close.png) no-repeat center center ;
        background-size: 0.3rem 0.3rem;
        background-position: 0 0;
        width: 0.3rem;
        height: 0.3rem;
        display: block;
        position: absolute;
        top:0.3rem;
        right:0.3rem
    }
    .jpkClose.layui-layer .layui-layer-setwin .layui-layer-close2{
        background: url(/src/common//images/close.png) no-repeat center center ;
        background-size: 0.3rem 0.3rem;
        background-position: 0 0;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top:0;
        right:0
    }
</style>
