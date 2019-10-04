module.exports = {
	arrData({
		commit
	}, arrData) {
		commit("updateArrData", {
			arrData
		});
	},
	arrComment({
		commit
	}, arrData) {
		commit("updateArrComment", {
			arrData
		});
	},
	arrUser({
		commit
	}, arrData) {
		commit("updateArrUser", {
			arrData
		});
	},
	arrSearch({
		commit
	}, arrData) {
		commit("updateArrSearch", {
			arrData
		});
	},
	buyShops({
		commit
	}, arrData) {
		commit("updateBuyShops", {
			arrData
		});
	}
}