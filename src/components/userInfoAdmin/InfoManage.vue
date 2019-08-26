<template>
	<div id="infoManage">
		<ul class="items">
			<router-link  
				v-for="item in routers" :key="item.path"
				tag='li' 
				:to="{name: item.path}"  
				:class="item.selected ? 'active' : ''"
				@click="item.selected = !item.selected">
				{{ item.name }}
			</router-link>
		</ul>
		<keep-alive>
			<transition name="fade"> 
				<router-view></router-view>
			</transition>
		</keep-alive>
	</div>
</template>
<script>
	export default {
		name: "InfoManage",
		data(){
			return {
				routers: [{
					name: "个人信息",
					path: "UserInfo",
					selected: true
				},{
					name: "购买的商品",
					path: "BoughtShop",
					selected: false
				},{
					name: "收藏的商品",
					path: "CollectedShop",
					selected: false
				}]
			}
		}
	}
</script>
<style lang="scss" scoped>
$height: 30px;
$color: #64a1d6;
#infoManage {
	overflow-x: hidden;
	.items {
		float: left;
		margin-left: 30px;
		li {
			height: $height;
			padding: 5px 10px;
			line-height: $height;
			font-size: 14px;
			text-align: center;
			background-color: $color;
			color: #fff;
			cursor: pointer;
		}
		li.active {
			color: #000;
			background-color: #fff;
		}
	}
	.fade-enter-active, .fade-leave-active {
	  	transition: all .6s;
	}
	.fade-enter {
		transform: translateX(-30px);
	  	opacity: 1;
	}
	.fade-leave-to {
		transform: translateX(60px);
	  	opacity: 0;
	}
}
</style>