<template>
	<div class="col-md-3">
		
		<div class="list-group">
			<div class="list-group-item ">
				<div class="d-flex justify-content-between">
					<h3>Your Tables</h3>
					<div>
						<button 
							class="btn btn-outline-primary btn-sm"
							@click.prevent="isCreating=!isCreating"
							>
							Add A Table
						</button>
					</div>
				</div>
				<zoom>
					<div v-if="isCreating" class="input-group">
						<input class="form-control form-control-sm" v-model="tableName">
						<button 
							class="btn btn-outline-secondary btn-sm"
							@click.prevent="addTable"
							:disabled="!tableName || tableName.length<2"
							>
							Add
						</button>
					</div>
				</zoom>
			</div>
			<a v-for="table in Object.keys(tableKeys)" v-bind:key="table" 
				href="#"
				@click.prevent="activateTable(table)"
				:class="{active:activeTable==table}"
				class="list-group-item list-group-item-action"
				>
				{{table}}
			</a>
			
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableName: "",
			isCreating: false
		};
	},
	computed: {
		activeTable() {
			return this.$store.state.activeTable;
		},
		tableKeys() {
			return this.$store.state.user;
		}
	},
	methods: {
		addTable() {
			if (this.tableName in this.tableKeys) {
				return window.Flash.error(
					"Table " + this.tableName + " already exists"
				);
			}

			this.$store.commit("setProp", {
				key: this.tableName,
				value: { data: [], headers: [] }
			});
			window.Flash.success("Table was created successfully");
			this.isCreating = false;
			this.tableName = "";
		},
		activateTable(tableName) {
			this.$store.commit("activateTable", tableName);
		}
	}
};
</script>
