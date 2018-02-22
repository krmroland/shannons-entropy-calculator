import Vue from "vue";

export default Vue.mixin({
	filters: {
		currency(str) {
			return str ? str.toLocaleString() : str;
		}
	}
});
