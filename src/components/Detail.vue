<template>
	<div id="detail">
		<div class="introduce">
			<ul class="items">
				<li class="item">
					品牌:
					<span class="data">{{ shopDetail.brand }}</span>
				</li>
				<li class="item">
					尺码:
					<span class="data">{{ shopDetail.size }}</span>
				</li>
				<li class="item">
					颜色:
					<span class="data">{{ shopDetail.color }}</span>
				</li>
				<li class="item">
					适用对象:
					<span class="data">{{ shopDetail.object }}</span>
				</li>
				<li class="item">
					款式:
					<span class="data">{{ shopDetail.style }}</span>
				</li>
				<li class="item">
					材质成分:
					<span class="data">{{ shopDetail.component }}</span>
				</li>
				<li class="item">
					材质工艺:
					<span class="data">{{ shopDetail.technology }}</span>
				</li>
				<li class="item">
					厚薄:
					<span class="data">{{ shopDetail.thickness }}</span>
				</li>
				<li class="item">
					适用场景:
					<span class="data">{{ shopDetail.scenarios }}</span>
				</li>
			</ul>
			<ul class="imgs">
				<li class="img"><img src="image/cloth15.jpg" alt="商品图片"></li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		name: "Detail",
		data(){
			return {
				shopDetail: {}
			}
		},
		created(){
        	let { id } = this.$route.params;
			this.$axios.get(`api/queryShopDetail/${id}`)
				.then((res)=>{
					if(typeof res.data === "object"){
						this.shopDetail = res.data;
					}else {
						alert("获取数据失败！");
					}
				})
				.catch((err)=>{
					alert('获取数据失败');
					console.log(err)
				})
		}
	}
</script>
<style lang="scss" scoped>
#detail {
	width: 75%;
	min-width: 900px;
	margin: 20px auto 0;
	.introduce {
		height: 600px;
		.items {
			padding-left: 10px;
			padding-bottom: 10px;
			border-bottom: 1px solid #eee;
			overflow: hidden;
			.item {
				float: left;
				height: 24px;
				width: 25%;
				font-size: 12px;
				line-height: 24px; 
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.imgs {
			width: 100%;
			text-align: center;
			font-size: 0;
			.img {
				img {
					width: 600px;
				}
				&:nth-child(1){
					margin-top: 30px;
				}
			}
		}
	}
}
</style>