<template>
	<div id="log">
		<div id="logo">
			<img src="../assets/logo.jpg">
		</div>	
		<div id="input">
			<van-cell-group>
			  <van-field
			    v-model="username"
			    required
			    clearable
			    label="用户名"
			    right-icon="question-o"
			    placeholder="请输入用户名"
			  />			
			  <van-field
			    v-model="password"
			    type="password"
			    label="密码"
			    placeholder="请输入密码"
			    required
			  />
			</van-cell-group>
		</div>	
		<div>
			<van-dropdown-menu>
			  <van-dropdown-item v-model="category" :options="categories" />
			</van-dropdown-menu>
		</div>
		<div id="logbutton">
			<van-button @click="loginmain" type="primary" style="width:100%">登录</van-button>
		</div>
	</div>
</template>

<script> 
export default{
	data(){
		return{
			username:'',
			password:'',
			category:'/peidan',
			categories:[
				{text:'配单绩效查询',value:'/peidan'},
				{text:'抄单绩效查询',value:'/chaodan'}
			]
		}
	},
	methods:{
		async loginmain(){
			let loginForm = {
			  username: this.username,
			  password: this.password
			}
			if(!this.username){
				return this.$toast.fail('请输入用户名');
			}
			else if(!this.password){
				return this.$toast.fail('请输入密码');
			}
			else{
				let res = await this.$http.post('/users/kpiLogin', loginForm);
				console.log(res);
				if (res.data.status === 404) {
					return this.$notify('用户名不存在');
				}
				if (res.data.status === 401){
					return this.$notify('用户名不存在');
				}
				else{
					this.$router.push(this.category);
					this.$store.commit('storeAuth', res.data.payload);
				}
			}
		}
	}
	
};
</script>

<style>
	#log{
		background:#f8f8f8;
		margin: 0 auto;
		min-height:100vh
	}
	#logo{
		background: #fff;
		text-align: center;
	}
	img{
		width: 60%;
	}
	#input{
		margin:10px 0;
	}
	#logbutton{
		width: 85%;
		margin: 30px auto;
	}
</style>
