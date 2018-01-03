<template>
	<div>
		<div>aaa</div>
	<div>
		<router-link to="/good/name">name</router-link>
		<router-link to="/good/img">img</router-link>
	</div>
	<div>
		<router-view></router-view>
	</div>
	<button @click="as"></button>
	</div>
	
</template>
<script type="text/javascript">
export default{
	data(){
		return {
			mess:"hello"
		}
	},
	methods:{
		as(){
			this.$router.go(-2)
		}
	}
}
</script>