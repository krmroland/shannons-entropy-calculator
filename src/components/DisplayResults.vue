<template>
	<div>
		<h4 v-text="attribute" class="text-underline text-info"></h4>

				<p><strong>Probabilities</strong></p>

				<blockquote>
					<h6 v-for="(prob,key) in data.probabilities" v-text="prob" :key="key"></h6>
				</blockquote>

				<p><strong>Entropy</strong></p>

				<blockquote>
					<span 
						v-for="(expression,key) in data.entropy.expression ||[]
						" v-text="expression"
						:key="key"
						class="ml-1 h6"
					></span>

					=

					<strong class="text-primary">{{ entropy }}</strong>
				</blockquote>
	</div>
</template>
<script>
import sum from "lodash/sum";
export default {
	props: {
		attribute: { required: true },
		data: { required: true }
	},
	computed: {
		entropy() {
			return sum(Object.values(this.data.entropy.values) || []);
		}
	}
};
</script>

<style scoped>
.text-underline {
	border-bottom: 3px double #6c757d;
}
</style>
