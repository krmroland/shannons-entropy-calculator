<template>
	<div class="card mt-2">
		
		<div class="card-body">
			<h2 class="text-primary text-center card-title">Entropy Calculations</h2>
			<display-results 
					v-for="(data ,attribute) in calculator.computed"
					:key="attribute" 
					:data="data"
					:attribute="attribute"
			></display-results>
<!-- 
			<pre>
				<code>{{ calculator.computed }}</code>
			</pre> -->
		
		</div>
	</div>
</template>

<script>
import Calculator from "../Calculator";
import DisplayResults from "./DisplayResults";
export default {
	components: { DisplayResults },
	data() {
		return {
			value: "",
			sample: ""
		};
	},
	computed: {
		calculator() {
			return new Calculator(this.$store.getters.selectedTableData);
		},
		activeTable() {
			return this.$store.state.activeTable;
		}
	}
};
</script>


