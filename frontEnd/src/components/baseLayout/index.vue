<template>
	<div class="base_layout">
		<div class="route-view">
      <router-view></router-view>
			<!-- <transition :name="transitionName">
			</transition> -->
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			transitionName: "",
		}
	},
	watch: {
		$route (to, from) {
			//如果返回则执行返回的动画，前进执行前进动画
			if (to.meta.index > from.meta.index) {
				this.transitionName = "van-slide-left";
			} else {
				this.transitionName = "van-slide-right";
			}
		}
	},
	mounted () {
	},
	methods: {
	}
}
</script>
<style lang="less" scoped>
@imgUrl: '../../assets/images/icon';
.base_layout{
  // height:100vh;
  overflow: hidden;
}
</style>
  