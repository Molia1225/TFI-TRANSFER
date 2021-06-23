<template>
	<div id="app">
		<router-view v-wechat-title="$route.meta.title"></router-view>
	</div>
</template>

<script>

let timer = null
export default {
	name: "app",
	data () {
		return {
		};
	},
  
};
</script>

<style lang='less'>
#app {
	font-size: 14px;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
  -ms-user-select: none; 
  max-width: 750px;
  margin: auto;
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
	transform: translate3d(100%, 0, 0);
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	will-change: transform;
	transition: all 300ms;
	position: absolute;
}
.slide-right-enter {
	opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
	opacity: 0;
	transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
	opacity: 0;
	transform: translate3d(-100%, 0, 0);
}
</style>
