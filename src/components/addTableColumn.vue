<template>
	<div>
		<div class="flex-end mb-2">
			<button class="btn btn-outline-secondary btn-sm"
			@click.prevent="isAddingColumn=!isAddingColumn"
			>
			Add Column
		</button>
	</div>

	<form v-if="isAddingColumn">
		<div class="form-group">
			<div class="input-group">
				<input type="text" class="form-control" v-model="name">
				<button 
					class="btn btn-primary" 
					@click.prevent="addColumn"
					:disabled="!name"
					>
					Add Column
				</button>
			</div>
		</div>
	</form>
	<div v-else>
		<div v-if="headers.length>0" class="list-group">
			<a href="#" class="active list-group-item">Defined Columns</a>
			<a href="#" v-for="(name ,key) in headers" 
				:key="key" class="d-flex list-group-item justify-content-between align-items-center">
				{{ name}}
				<button class="btn btn-outline-secondary btn-sm">
					<a href="#" class="close" @click.prevent="removeColumn(key)">&times;</a>
				</button>
			</a>
		</div>
		<div class="alert text-center alert-info" v-else>
			Table Has no defined columns
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: ["table"],

	data() {
		return {
			name: "",
			isAddingColumn: false
		};
	},
	computed: {
		headers() {
			return this.table.headers || [];
		}
	},
	methods: {
		addColumn() {
			this.$emit("addColumn", this.name);
			this.name = "";
		},
		removeColumn(index) {
			this.$emit("removeColumn", index);
		}
	}
};
</script>
