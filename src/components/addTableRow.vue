<template>
	<tr>
		<td v-if="headers.length>0">*</td>
		<td 
		v-for="(header,index) in headers"
		:key="index"
		class="p-0"
		>
		<input type="text" class="form-control form-control-sm" 
			@input="onInput($event.target.value,header)"
			:value="field[header]"
		>
	</td>
	<td v-if="headers.length>0">
		<div class="btn-group d-flex" style="flex-grow:1;">
			<a 
			href="#" 
			class="px-2" 
			@click.prevent="addColumnData"
			>Save</a>
			|
			<a href="#" 
			class="px-2" 
			@click="$emit('toggle')"
			>
			close
		</a>
	</div>
</td>
<td v-else>
	No headers are defined for this table
</td>
</tr>
</template>

<script>
export default {
	props: {
		headers: { required: true },
		result: { default: () => ({}) }
	},
	data() {
		return {
			field: this.result || {}
		};
	},
	methods: {
		addColumnData() {
			const data = Object.assign(this.field, {});
			this.$emit("saveEntry", data);

			this.field = {};
		},
		onInput(value, key) {
			//we will make sure all values are store in
			//lower case tor consistency
			this.field[key] = String(value)
				.trim()
				.toLowerCase();
		}
	}
};
</script>
