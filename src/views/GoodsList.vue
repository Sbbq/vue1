<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortfun">Price <svg class="icon icon-arrow-short" v-bind:class="{'arrowRollUp':!sortFlag}" ><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)"  v-bind:class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{item.priceDown}} - {{item.priceUp}}
                </a>
              </dd>
            </dl>
          </div>


          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in rooms">
                  <div class="pic">
                    <img v-lazy="'static/'+item.roomNum+'.jpg'" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">房号：{{item.roomNum}}</div>
                    <span class="price">￥{{item.roomPrice}}</span>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="getIn(item.roomNum)">入住</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="load-more" ><img class="imgload" src="/static/Ripple.svg" v-if="waitting">
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录,否则无法入住！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdInShow" v-on:close="closeModal">
      <p slot="message">
        入住成功！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdInShow = false">继续入住</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/Cart">查看房间</router-link>
      </div>
    </modal>
    <footer class="footer">
      <div class="footer__wrap">
        <div class="footer__secondary">
          <div class="footer__inner">
            <div class="footer__region">
              <span>Region</span>
              <select class="footer__region__select">
                <option value="en-US">USA</option>
                <option value="zh-CN">China</option>
                <option value="in">India</option>
              </select>
            </div>
            <div class="footer__secondary__nav">
              <span>Copyright © 2017 IMooc All Rights Reserved.</span>
              <a href="http://us.lemall.com/us/aboutUs.html">
                About Us
              </a>
              <a href="http://us.lemall.com/us/termsofUse.html">
                Terms &amp; Conditions
              </a>
              <a href="http://us.lemall.com/us/privacyPolicy.html">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<style type="text/css">
.load-more{
  height: 100px;
  width: 100px;
  text-align: center;
  display: block;
  margin:0 auto;
}
.imgload{
  max-width: 100%;
  max-height: 100%;
}
.arrowRollUp{
  transform: rotate(180deg);
  transition: all .3s ease-out;
}
</style>
<script>
import NavHeader from './../components/NavHeader'
import NavBread from './../components/NavBread'
import Modal from './../components/Modal'
export default{
  data(){
    return {
      rooms:[],
      page:1,
      pageSize:4,
      priceChecked:"all",
      sortFlag:true,
      waitting:false,
      busy:true,
      mdShow:false,
      mdInShow:false,
      priceAll:{
        priceDown:0,
        priceUp:1000000
      },
      priceFilter:[
      {
        priceDown:0,
        priceUp:200
      },
      {
        priceDown:200,
        priceUp:500
      },
      {
        priceDown:500,
        priceUp:800
      },
      {
        priceDown:800,
        priceUp:1000
      },
      ]
    }
  },
  mounted(){
    this.getRoomData();
  },
  components:{
    NavHeader,
    NavBread,
    Modal
  },
  methods:{
    getRoomData(flag){
      let priceLevel;
      this.waitting=true;
      if (this.priceChecked=="all"){
        priceLevel=this.priceAll;
      }
      else{
        priceLevel=this.priceFilter[this.priceChecked]
      }
      var params={
        page:this.page,
        pageSize:this.pageSize,
        priceUp:priceLevel.priceUp,
        priceDown:priceLevel.priceDown,
        sortFlag:this.sortFlag
      };
      this.$http.get("getData/room/list",{params:params}).then(res=>{
        let result=res.data.room;
        this.waitting=false;
        if(flag){
          if(result.length==0){
            this.busy=true;
          }
          else{
            this.busy=false;
            this.rooms=[...this.rooms,...result];
            if(result.length<this.pageSize){
              this.busy=true;
            }
          }
        }
        else{
          this.rooms=result;
          this.busy=false;
        }

      }).catch()
    },
    setPriceFilter(index){
      this.priceChecked=index;
      this.page=1;
      this.getRoomData();
    },
    loadMore(){
      this.busy = true;
      setTimeout(() => {
        this.page+=1;
        this.getRoomData(true);
      }, 500);
    },
    sortfun(){
      this.sortFlag=!this.sortFlag;
      this.page=1;
      this.getRoomData();
    },
    getIn(roomNum){
      this.$http.post("/getUser/users/addRoom",{roomNum:roomNum}).then((response)=>{
        let res=response.data;
        if(res.status=="0"){
          this.mdInShow=true;
        }
        else if(res.status=="10001"){
          this.mdShow=true;
        }
      })
    },
    closeModal(){
      this.mdShow=false;
      this.mdInShow=false;
    }
  }
}
</script>
