<template>
	<div>
		<DataTableComponent :data="rows">
			
			<!-- 	adding entries -->
			<addTableRow
			slot="lastRow"
			v-if="isAddingEntry" 
			:headers="headers"
			@toggle="isAddingEntry=false"
			@saveEntry="saveEntry"
			></addTableRow>

			<div class="btn-group d-flex flex-wrap justify-content-center" slot="buttons">
				<button 
				class="btn btn-outline-primary btn-sm" 
				@click.prevent="captureEntry"
				>Add Entry
			</button>

			<button 
			class="btn btn-outline-secondary btn-sm" 
			@click.prevent="captureColumn"
			>Columns
		</button>
		<button 
		class="btn btn-outline-danger btn-sm" 
		@click.prevent="deleteTable"
		>Delete Table
	</button>
</div>
</DataTableComponent>
<!-- capturing entries -->
<modal-component :show.sync="isAddingColumn">
	<span slot="title">Define Table columns</span>
	<add-table-column :table="table" @addColumn="addColumn" @removeColumn="removeColumn"/>
</modal-component>

</div>
</template>

<script>
import get from "lodash/get";
import AddTableColumn from "./addTableColumn.vue";
import AddTableRow from "./addTableRow.vue";
import DataTableComponent from "../tables/DataTableComponent.vue";
export default {
	components: { AddTableColumn, AddTableRow, DataTableComponent },
	data() {
		return {
			isAddingColumn: false,
			isAddingEntry: false
		};
	},
	computed: {
		activeTable() {
			return this.$store.state.activeTable;
		},
		table() {
			return get(this.$store.state.user, this.activeTable, {});
		},
		headers() {
			return get(
				this.$store.state.user,
				this.activeTable + "." + "headers",
				[]
			);
		},
		rows() {
			return this.$store.getters.selectedTableData.data || [];
		}
	},
	methods: {
		captureColumn() {
			this.isAddingColumn = true;
			this.isAddingEntry = false;
		},
		captureEntry() {
			this.isAddingEntry = !this.isAddingEntry;
			window.scrollBy(0, window.outerHeight);
		},
		addColumn(name) {
			this.$store.commit("push", {
				key: `${this.activeTable}.headers`,
				value: name
			});
			this.isAddingColumn = false;
			window.Flash.success("Column was added success fully");
		},
		removeColumn(index) {
			window.confirm("The column will be deleted from the headers")
				? this.$store.commit("unset", {
						path: `${this.activeTable}.headers`,
						index
					})
				: null;
		},
		saveEntry(field) {
			this.$store.commit("push", {
				key: `${this.activeTable}.data`,
				value: field
			});
			// window.Flash.success("Row added successfully");
		},
		deleteTable() {
			return window.confirm("Table will be deleted")
				? this.$store.commit("deleteActiveTable")
				: false;
		}
	},
	watch: {
		activeTable() {
			this.isAddingEntry = false;
			this.isAddingColumn = false;
		}
	}
};
</script>
