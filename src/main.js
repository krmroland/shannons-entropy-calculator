import Vue from "vue";
import App from "./App.vue";
import Zoom from "./components/zoom.vue";
import Bounce from "./components/bounce.vue";
import Flash from "./flash/Flash";
//import { DataTable, TableCol } from "./tables";
import helpers from "./mixins/HelpersMixin";
import ModalComponent from "./components/Modal";

import store from "./store";

window.Flash = Flash;
window.hasOwnProp = function(obj, key) {
	return obj && Object.prototype.hasOwnProperty.call(obj, key);
};
Vue.config.productionTip = false;

window.Vue = Vue;

window.GlobalBus = new Vue();

import lodash from "lodash";

window.lodash = lodash;

// Vue.component("dataTable", DataTable);
// Vue.component("tableCol", TableCol);
Vue.component("Zoom", Zoom);
Vue.component("ModalComponent", ModalComponent);
Vue.component("Bounce", Bounce);
window.app = new Vue({
	store,
	render: h => h(App),
	mixins: [helpers]
}).$mount("#app");
