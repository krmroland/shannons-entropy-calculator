<template>
		<tr v-if="result">
			<td >{{index}}</td>
			<td 
			v-for="(header,index) in headers"
			:key="index"
			>
			{{result[header]}}
		</td>
		<td>
			<a href="#" @click.prevent="$emit('toggle')">
				Edit
			</a>
			|
			<a href="" @click.prevent="$emit('deleteRow')" class="mx-2">
				delete
			</a>
		</td>
	</tr>
</template>

<script>
export default {
	props: {
		result: { required: true },
		headers: { required: true },
		index: {}
	}
};
</script>
