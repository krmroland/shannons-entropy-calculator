<template>
	<component 
		:is="component" 
		:headers="headers" 
		:result="result"
		:index="index"
		:isEditing="isEditing"
		@toggle="isEditing=!isEditing"
		@saveEntry="updateRow"
		@deleteRow="deleteRow"
	>
	</component>
</template>

<script>
import TableRow from "../tables/tableRow";
import AddTableRow from "./addTableRow.vue";
export default {
	props: {
		headers: { required: true },
		result: { required: true },
		index: {}
	},
	components: {
		TableRow,
		AddTableRow
	},
	data() {
		return {
			isEditing: false
		};
	},
	computed: {
		component() {
			return this.isEditing ? AddTableRow : TableRow;
		}
	},
	methods: {
		makePath(index = null) {
			let path = `${this.$store.state.activeTable}.data`;
			return index ? `${path}.${index}` : path;
		},
		updateRow(newData) {
			this.$store.commit("setProp", {
				key: this.makePath(this.index - 1),
				value: newData
			});
			this.isEditing = false;
		},
		deleteRow() {
			this.$store.commit("unset", {
				path: this.makePath(),
				index: this.index - 1
			});
		}
	}
};
</script>
