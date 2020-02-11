<template>
	<div id="chaodan">
		<div id="topbar2">
			<van-nav-bar
			  :title="staff.name"
			  left-text="修改密码"
			  right-text="退出登录"
			  fixed
			  @click-left="onClickLeft"
			  @click-right="onClickRight"
			/>
		</div>
		<div id="head2">
			<div id="sumtitle2">
				<span>{{selectTime?'本':'上'}}</span>
				<span> 月抄单绩效总结 </span>
				<span>【 蔬菜,干料,面食 】</span>
			</div>
			<van-button type="info" size="small" @click="callLastMonth" v-if="selectTime">上月查询</van-button>
			<van-button type="primary" size="small" @click="callCurrentMonth" v-else>本月查询</van-button>
		</div>
		<div id="sumform2">
			<div id="formtitle2">
				<div class="titleform">抄单天数</div>
				<div class="titleform">订单总数</div>
				<div class="titleform">产品总数</div>
			</div>
			<div id="formcontent2">
				<div class="contentform">{{kpi.days}}</div>
				<div class="contentform">{{kpi.orders}}</div>
				<div class="contentform">{{kpi.products}}</div>
			</div>
		</div>
		<div id="acumulate2">
			<img src="../assets/coin.png">
			<span id="ainfo2">已累积绩效奖金：</span>
			<span id="amoney2">{{kpi.moneyTotal}}</span>
		</div>
		<div id="attention2">
			注意：数据每天中午12点更新
		</div>
		<div>
			<van-divider>详细内容</van-divider>
		</div>
		<div>
			<van-sticky :offset-top="46">
			  <div id="detail2">
				  <div class="detailtitle">抄单日期</div>
				  <div class="detailtitle">订单总数</div>
				  <div class="detailtitle">产品总数</div>
			  </div>
			</van-sticky>
			<van-swipe-cell v-for="item in kpi.details">
				<div id="condetail2">
					<div class="detailcontent">{{item.date| datefilter}}</div>
					<div class="detailcontent">{{item.count.orders}}</div>
					<div class="detailcontent">{{item.count.products}}</div>
				</div>		
				<template slot="right">
					<van-button id="rightdetail2" square size="small" type="danger" :text="'绩效奖金：'+item.count.money"/>
				</template>
			</van-swipe-cell>
		</div>
		
	</div>	
</template>

<script>
	export default {
	  data(){
		  return{
			  selectTime:true,
			  dateStart: '',
			  dateEnd: '',
			  kpi: '',
		  }
	  },
	  computed:{
		  staff(){
		  	return this.$store.state.auth;
		  },
	  },
	  filters: {
	    datefilter(val) {
	      let month = new Date(val).getMonth() + 1
	      let date = new Date(val).getDate()
	      return `${month}月${date}日`
	    }
	  },
	  created(){
		  this.callCurrentMonth();
	  },
	  methods: {
	    onClickLeft() {
	      this.$router.push('/changepassword');
	    },
	    onClickRight() {
	      this.$store.commit('storeAuth', null);
	      this.$router.push('/');
	    },
		async getChaodan(){
			let enter = {
			  _supplier: this.staff._supplier,
			  _staffName: this.staff.name,
			  dateStart: this.dateStart.toDateString(),
			  dateEnd: this.dateEnd.toDateString()
			}
			let res = await this.$http.post('/workRecords/getChaodan',enter);
			console.log(res);
			let kpiDefault = {
			  days:0,
			  orders:0,
			  products:0,
			  moneyTotal:0,
			  details:[]
			};
			this.kpi = res.data.payload[0] || kpiDefault;
			//单天绩效奖金 保留小数点后四位
			this.kpi.details.forEach(item=>{
			  item.count.money = (Math.round(item.count.money * 10000) / 10000).toFixed(4)
			})
		},
		callCurrentMonth:function(){
			this.selectTime=true;
			let year = new Date().getFullYear();
			let month = new Date().getMonth()+1;   //?少1
			let string = `${year}/${month}/1`;
			this.dateStart = new Date(string);
			this.dateEnd = new Date();
			this.getChaodan();
		},
		callLastMonth:function(){
			this.selectTime=false;
			let lastendday = new Date(this.dateStart.getTime()-24*3600*1000); //减一天
			let year = new Date(lastendday).getFullYear();
			let month = new Date(lastendday).getMonth() + 1;
			let string = `${year}/${month}/1`;
			this.dateStart = new Date(string);
			this.dateEnd = new Date(lastendday);
			this.getChaodan();
		},
	  }
	}
</script>

<style scoped>
	#topbar2{
		margin-bottom: 66px;
	}
	#head2{
		margin: 20px 10px;
		display: flex;
		align-items:center;
		justify-content:space-between;
	}
	#sumtitle2{
		display: inline-block;
	}
	#sumform2{
		margin: 0 10px;
		text-align: center;
	}
	#formtitle2{
		display: flex;
		background: rgba(0,0,0,0.7);
		color: #FFFFFF;
	}
	.titleform{
		flex: 1;
		padding: 5px;
	}
	#formcontent2{
		display: flex;
		border: 1px solid lightgray;
		border-top: none;
		border-right: none;
	}
	.contentform{
		flex: 1;
		border-right: 1px solid lightgray;
		padding: 5px;
	}
	#acumulate2{
		margin: 20px 10px;
		align-items: center;
		display: flex;
	}
	img{
		width: 60px;
	}
	#ainfo2{
		margin-left: 10px;
	}
	#amoney2{
		color:#07c160 ;
	}
	#attention2{
		margin: 0 10px;
	}
	#detail2{
		display: flex;
		background:rgba(0,0,0,0.7);
		color: #FFFFFF;
		text-align: center;	
	}
	.detailtitle{
		flex: 1;
		padding:5px;
	}
	#condetail2{
		display: flex;
		border: 1px solid lightgray;
		border-top: none;
		border-right: none;
		text-align: center;
	}
	.detailcontent{
		flex: 1;
		border-right: 1px solid lightgray;
		padding: 5px;
	}
	#leftdetail2{
		height:32px;
		width:94px
	}
	#rightdetail2{
		height:32px;
		width:150px;
	}
</style>
