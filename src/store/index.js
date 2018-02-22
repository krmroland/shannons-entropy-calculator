import get from "lodash/get";
//import has from "lodash/has";
import Vue from "vue";
import set from "lodash/set";
//import unset from "lodash/unset";
import Vuex from "vuex";

Vue.use(Vuex);

const persistData = function persistUserData(state) {
	window.localStorage.setItem(state.identifier, JSON.stringify(state.user));
};
export default new Vuex.Store({
	state: {
		identifier: "",
		user: {},
		activeTable: ""
	},
	getters: {
		isLoggedIn(state) {
			return !!state.identifier;
		},
		selectedTableData(state) {
			return get(state.user, state.activeTable, {});
		}
	},
	mutations: {
		activateTable(state, table) {
			state.activeTable = table;
		},
		get(state, key, result = null) {
			return get(state.user, key, result);
		},
		push(state, { key, value }) {
			let arrayToPushTo = get(state.user, key, []);

			if (!Array.isArray(arrayToPushTo)) {
				arrayToPushTo = [];
			}
			arrayToPushTo.push(value);

			state.user = set(state.user, key, arrayToPushTo);
			persistData(state);
		},
		setProp(state, { key, value }) {
			Vue.set(state, "user", set(state.user, key, value));
			persistData(state);
		},
		deleteActiveTable(state) {
			Vue.delete(state.user, state.activeTable);

			state.activeTable = "";
			persistData(state);
		},
		unset(state, { path, index }) {
			//first we wiil get the object we are unseting,
			const data = get(state.user, path, null);

			if (!data) {
				return false;
			}
			//we will splice
			if (Array.isArray(data)) {
				data.splice(index, 1);
			} else {
				delete data[index];
			}

			state.user = set(state.user, path, data);

			persistData(state);
		},

		login(state, key) {
			const identifier = `bstat-entropy:user:${key}`;
			state.identifier = identifier;

			if (identifier in window.localStorage) {
				state.user = JSON.parse(
					window.localStorage.getItem(identifier)
				);
				return;
			}
			state.user = {};
			persistData(state);
		}
	}
});
