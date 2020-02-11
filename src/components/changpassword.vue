<template>
	<div id="changepw">
		<div>
			<van-nav-bar
			  title="重置密码"
			  left-text="返回"
			  left-arrow
			  @click-left="onClickLeft"
			/>
		</div>
		<div id="passwordinput">
			<van-password-input
			  :value="value"
			  info="密码为 6 位数字"
			  :focused="showKeyboard"
			  @focus="showKeyboard = true"
			/>
		</div>
		<div>
			<van-number-keyboard
			  :show="showKeyboard"
			  @input="onInput"
			  @delete="onDelete"
			  @blur="showKeyboard = false"
			/>
		</div>
	</div>
	
</template>

<script>
	export default {
	  data() {
	    return {
	      value: '',
	      showKeyboard: true
	    };
	  },
	
	  methods: {
		  onClickLeft() {
		    this.$router.go(-1);
		  },
	    onInput(key) {
	      this.value = (this.value + key).slice(0, 6);
	    },
	    onDelete() {
	      this.value = this.value.slice(0, this.value.length - 1);
	    }
	  }
	}
</script>

<style>
</style>
