<template>
	<div id="admin">
		<router-link tag="div" :to="{name: 'AddShop'}" class="addWrap">
			<button class="addBtn">添加商品</button>
		</router-link>
		<table border="1">
			<thead>
				<tr>
					<th>照片</th>
					<th>描述</th>
					<th>颜色</th>
					<th>尺寸</th>
					<th>价格</th>
					<th>库存</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="shop in shops" :key="shop.id">
					<td>
						<div class="imgwrap">
							<img :src="shop.pic" alt="商品图片">
						</div>
					</td>
					<td>
						<span>{{ shop.desc }}</span>
					</td>
					<td>
						<span>{{ shop.color }}</span>
					</td>
					<td>
						<span>{{ shop.size }}</span>
					</td>
					<td>
						<span>{{ shop.price }}</span>
					</td>
					<td>
						<span>{{ shop.num }}</span>
					</td>
					<td>
						<router-link :to="'updateShop/' + shop.id">
							<button class="btn modify">
								修改
							</button>
						</router-link>
						<button class="btn delete" @click="deleteById(shop.desc, shop.id)">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		name: "Admin",
		data(){
			return {
				shops: []
			}
		},
		beforeRouteEnter: (to,from,next)=>{
        if(sessionStorage.getItem("user") != "aaa"){
            next("login");
        }else {
            next();
        }
    },
		created() {
			this.queryAllShops();
      this.$axios.get(`api/queryShopsNum`)
          .then((response) => {
            this.len = response.data;
          })
          .catch((error) => {
              console.log(error);
              throw new Error("获取数据失败!");
          });
    },
    methods: {
    	deleteById(desc, id){
    		let flag = confirm(`确定要删除“${desc}”吗?`);
    		if(flag){
    			this.confirmed(id);
    		}
    	},
    	confirmed(id){
    		this.$axios.get(`api/delete/${id}`)
	            .then((response) => {
	              if( response.data > 0){
	              	alert("删除成功!");
	              	this.queryAllShops();
	              }else {	
	              	alert("删除失败!");
	              }
	            })
	            .catch((error) => {
	                console.log(error);
	                throw new Error("获取数据失败!");
	            });
    	},
    	queryAllShops(){
				this.$axios.get(`api/queryAllShops`)
          .then((response) => {
              this.shops = response.data;
              console.log(this.shops);
          })
          .catch((error) => {
              console.log(error);
              throw new Error("获取数据失败!");
          });
    	}
    } 
	}
</script>
<style lang="scss" scoped>
#admin {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 10px 0;
	
	.addWrap {
		width: 100%;
		text-align: center;
		.addBtn {
			display: inline-block;
			width: 50%;
			padding: 10px 0;
			margin-bottom: 10px;
			border-radius: 10px;
			font-size: 16px;
			letter-spacing: 2em;
			border: 0;
			outline: 0;
			color: #fff;
			cursor: pointer;
			background-color: #43a047;
			&:hover {
	    	box-shadow: 0 0 5px #42a5f5;
	    }
		}
	}

	table {
		text-align: center;
		.imgwrap {
			overflow: hidden;
			border-radius: 10px;
			img {
				width: 100px;
				height: 100px;
				vertical-align: middle;
				&:hover {
					transform: scale(1.2);
					transition: transform .5s;
				}
			}
		}
		thead {
			padding-bottom: 30px;
			th {
				font-weight: bold;
				padding-bottom: 10px;
			}
		}
		tbody {
			tr {
				border-radius: 10px;
				transition: all .3s;
			}
			tr:nth-of-type(2n){
				background-color: #00bcd411;
			}
			tr:nth-of-type(2n + 1){
				background-color: #b2dfdb;
			}
			tr:hover {
				background-color: #fff;
			}
			td {
				min-width: 100px;
				max-width: 300px;
				padding: 10px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.btn {
		      width: 50px;
		      height: 30px;
		      margin: 0 5px;
		    	line-height: 30px;
		      border: none;
		      outline: none;
		      font-size: 12px;
		      border-radius: 5px;
		      background-color: #43a047;
      		color: #fff;
      		cursor: pointer;
		      &:hover {
		      	box-shadow: 0 0 5px #42a5f5;
		      }
		      a {
				  	color: #fff;
				  }
		  }
		  .delete {
		  	background-color: #f44336;
		  }
		}
	}
}
</style>