<template>
	<div id="peidan">
		<div id="topbar1">
			<van-nav-bar
			  :title="staff.name"
			  left-text="修改密码"
			  right-text="退出登录"
			  fixed
			  @click-left="onClickLeft"
			  @click-right="onClickRight"
			/>
		</div>
		<div id="head1">
			<div id="sumtitle1">
				<span>{{selectTime?'本':'上'}}</span>
				<span> 月配货绩效总结 </span>
				<span>{{supplierName1}}</span>
			</div>
			<van-button type="info" size="small" @click="callLastMonth" v-if="selectTime">上月查询</van-button>
			<van-button type="primary" size="small" @click="callCurrentMonth" v-else>本月查询</van-button>
		</div>
		<div id="sumform1">
			<div id="formtitle1">
				<div class="titleform">配单天数</div>
				<div class="titleform">订单总数</div>
				<div class="titleform">产品总数</div>
				<div class="titleform">绩效重量</div>
			</div>
			<div id="formcontent1">
				<div class="contentform">{{kpi.days}}</div>
				<div class="contentform">{{kpi.orders}}</div>
				<div class="contentform">{{kpi.finalProductsCount}}</div>
				<div class="contentform">{{kpi.KPIWeight}}</div>
			</div>
		</div>
		<div id="acumulate1">
			<img src="../assets/coin.png">
			<span id="ainfo1">已累积绩效奖金：</span>
			<span id="amoney1">{{kpi.moneyTotal}}</span>
		</div>
		<div id="attention1">
			注意：数据每天中午12点更新
		</div>
		<div>
			<van-divider>详细内容</van-divider>
		</div>
		<div>
			<van-sticky :offset-top="46">
			  <div id="detail1">
				  <div class="detailtitle">配单日期</div>
				  <div class="detailtitle">订单总数</div>
				  <div class="detailtitle">产品总数</div>
				  <div class="detailtitle">绩效重量</div>
			  </div>
			</van-sticky>
			<van-swipe-cell v-for="(item,index) in kpi.details">
				<template slot="left">
					<van-button id="leftdetail1" square type="primary" size="small" text="查看详情" @click="checkDetail(item.date)" />
				</template>
				<div  id="condetail1" >
					<div class="detailcontent">{{item.date| datefilter}}</div>
					<div class="detailcontent">{{item.count.orders}}</div>
					<div class="detailcontent">{{item.count.finalProductsCount}}</div>
					<div class="detailcontent">{{item.count.KPIWeight}}</div>
				</div>		
				<template slot="right">
					<van-button id="rightdetail1" square size="small" type="danger" :text="'绩效奖金：'+item.count.money"/>
				</template>
			</van-swipe-cell>
		</div>
		
	</div>	
</template>

<script>
	export default {
	  name:'peidan',
	  data(){
		  return{
			  selectTime:true,
			  dateStart: '',
			  dateEnd: '',
			  kpi: '',
		  }
	  },
	  created() {
	    this.callCurrentMonth();
	  },
	  computed:{
		  //获取登录信息
		  staff(){ 
			  return this.$store.state.auth;
		  },
		  supplierName1(){
			  let name = '';
			  if(this.staff._supplier=='55c86d4dd18788760e1e0c18'){
			    name='【蔬菜】';
			  }
			  if(this.staff._supplier=='565c20556de80e0b335a87cc'){
			    name='【干料】';
			  }
			  if(this.staff._supplier=='58f08f991fe0334134122e33'){
			    name='【面食】';
			  }
			  return name;
		  }
	  },
	  filters: {
	    datefilter(val) {
	      let month = new Date(val).getMonth() + 1
	      let date = new Date(val).getDate()
	      return `${month}月${date}日`
	    }
	  },
	  methods: {
	    onClickLeft() {
	      this.$router.push('/changepassword');
	    },
	    onClickRight() {
		  this.$store.commit('storeAuth', null);
	      this.$router.push('/');
	    },
		async getPeidan(){
			let enter = {
			  _supplier: this.staff._supplier,
			  _staffName: this.staff.name,
			  dateStart: this.dateStart.toDateString(),
			  dateEnd: this.dateEnd.toDateString()
			}
			let res = await this.$http.post('/workRecords/getPeidan',enter);
			console.log(res);
			let kpiDefault = {
			  days:0,
			  orders:0,
			  finalProductsCount:0,
			  KPIWeight:0,
			  moneyTotal:0,
			  details:[]
			};
			this.kpi = res.data.payload[0] || kpiDefault;
			//单天绩效奖金 保留小数点后四位
			this.kpi.details.forEach(item=>{
			  item.count.money = (Math.round(item.count.money * 10000) / 10000).toFixed(4)
			})
		},
		checkDetail(shippingDate) {
		  this.$store.commit('storeDate',shippingDate);
		  this.$router.push('/detail');
		},
		callCurrentMonth:function(){
			this.selectTime=true;
			let year = new Date().getFullYear();
			let month = new Date().getMonth()+1;   //?少1
			let string = `${year}/${month}/1`;
			this.dateStart = new Date(string);
			this.dateEnd = new Date();
			this.getPeidan();
		},
		callLastMonth:function(){
			this.selectTime=false;
			let lastendday = new Date(this.dateStart.getTime()-24*3600*1000); //减一天
			console.log(lastendday);
			let year = new Date(lastendday).getFullYear();
			let month = new Date(lastendday).getMonth() + 1;
			let string = `${year}/${month}/1`;
			this.dateStart = new Date(string);
			this.dateEnd = new Date(lastendday);
			this.getPeidan();
		}
	  }
	}
</script>

<style scoped>
	#topbar1{
		margin-bottom: 66px;
	}
	#head1{
		margin: 20px 10px;
		display: flex;
		align-items:center;
		justify-content:space-between;
	}
	#sumtitle1{
		display: inline-block;
	}
	#sumform1{
		margin: 0 10px;
		text-align: center;
	}
	#formtitle1{
		display: flex;
		background: rgba(0,0,0,0.7);
		color: #FFFFFF;
	}
	.titleform{
		flex: 1;
		padding: 5px;
	}
	#formcontent1{
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
	#acumulate1{
		margin: 20px 10px;
		align-items: center;
		display: flex;
	}
	img{
		width: 60px;
	}
	#ainfo1{
		margin-left: 10px;
	}
	#amoney1{
		color:#07c160 ;
	}
	#attention1{
		margin: 0 10px;
	}
	#detail1{
		display: flex;
		background:rgba(0,0,0,0.7);
		color: #FFFFFF;
		text-align: center;	
	}
	.detailtitle{
		flex: 1;
		padding:5px;
	}
	#condetail1{
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
	#leftdetail1{
		height:32px;
		width:94px
	}
	#rightdetail1{
		height:32px;
		width:150px;
	}
</style>
