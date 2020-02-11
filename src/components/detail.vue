<template>
	<div id="day-detail">
		<div>
			<van-nav-bar
			  :title="checkDate| datefilter"
			  left-text="返回"
			  left-arrow
			  @click-left="onClickLeft"
			/>
		</div>
		<div>
			<van-sticky>
			  <div id="detail3">
				  <div class="detailtitle">产品名称</div>
				  <div class="detailtitle">实配量</div>
				  <div class="detailtitle">绩效</div>
			  </div>	  
			</van-sticky>
			<div id="condetail3" v-for="item in products">
			  	<div class="detailcontent">{{item.name}}</div>
			  	<div class="detailcontent">{{item.finalQuantity}}{{item.unit}}</div>
			  	<div class="detailcontent">{{item.weight}}</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
	  data(){
		  return{
			  products:[]
		  }
	  },
	  computed:{
		  checkDate(){
			  return this.$store.state.date;
		  },
		  staff() {
		    return this.$store.state.auth;
		  }
	  },
	  filters: {
	    datefilter(val) {
	      let month = new Date(val).getMonth() + 1
	      let date = new Date(val).getDate()
	      return `${month}月${date}日`
	    }
	  },
	  created() {
	    this.callDetailsData();
	  },
	  methods: {
	    onClickLeft() {
	      this.$router.go(-1);
	    },
		async callDetailsData(){
			const enter = {
			  _supplier: this.staff._supplier,
			  _staffName: this.staff.name,
			  date: this.checkDate
			};
			let res = await this.$http.post('/workRecords/checkDetails', enter);
			this.products=res.data.payload;
			console.log(this.products);
		}
	  }
	}
</script>

<style scoped>
#detail3{
	display: flex;
	text-align: center;
	background:rgba(0,0,0,0.7);
	color: #FFFFFF;
}
.detailtitle{
	flex:1 ;
	padding: 5px;
}
#condetail3{
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
</style>
