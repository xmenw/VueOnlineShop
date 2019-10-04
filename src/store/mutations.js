module.exports = {
	updateArrData(state, {
		arrData
	}) {
		state.arrData = arrData;
	},
	updateArrComment(state, {
		arrData
	}) {
		state.arrComment = arrData;
	},
	updateArrUser(state, {
		arrData
	}) {
		state.arrUser = arrData;
	},
	updateBuyShops(state, {
		arrData
	}) {
		state.buyShops = arrData;
	}
}