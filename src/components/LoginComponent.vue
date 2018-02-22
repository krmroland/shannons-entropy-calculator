<template>
	<div class="card col-md-6 mx-auto mt-5">
		<div class="card-body">
			<h3 class="text-center text-primary">Identification Page</h3>
			<form method="get" class="mt-3" @submit.prevent="proceed">
				<div class="form-group">
					<label for="">Email/RegNo/Student No</label>	
					<input type="text" v-model="identifier" class="form-control">
					<p class="form-text text-danger" v-text="error" v-if="error"></p>
				</div>	
				<div class="form-group">
					<button class="btn btn-primary" :disabled="error">
						Proceed
					</button>
				</div>		
			</form>
		</div>
	</div>
	
</template>

<script>
export default {
	data() {
		return {
			identifier: ""
		};
	},
	methods: {
		proceed() {
			if (!this.error) {
				this.$store.commit("login", this.identifier);
			}
		}
	},
	computed: {
		error() {
			if (!this.identifier) {
				return "Identifier is Required";
			}
			if (this.identifier.length < 6) {
				return "Identifier must be at least 6 characters";
			}

			return false;
		}
	}
};
</script>
