<template>
	<div class="card border border-light table-responsive">
		<div class="card-body ">
			<div class="display-flex justify-content-between align-items-center mb-2" >
				<span></span>
				<div class="d-flex justify-content-between">
					<h4 class="text-primary text-center">{{activeTable}}</h4>
					<div>
						<slot name="buttons"></slot>
					</div>
					
				</div>
			</div>
			
			<div class="d-flex align-items-center mb-2 justify-content-between">
				
				<div class="d-flex justify-content-between align-items-center">
					<span class="mx-2  font-size-2 text-dark">Show</span>
					<select class="form-control form-control-sm" @change="changePerPage">
						<option selected>10</option>
						<option >25</option>
						<option >50</option>
						<option>100</option>
					</select>
					<span class="mx-2 font-size-2 text-dark">entries</span>
				</div>
				<span class="font-size-2" v-if="results.totalItems">
					Page 
					<span class="text-primary">{{ results.currentPage }}</span> of 
					<span class="text-primary">{{ results.lastPage }}</span>
				</span>
				<input type="search" class="form-control col-3" 
				style="border-radius:25rem ;border-width:1px;" placeholder="search ....." v-model="query" :readonly="!headers.length>0">
			</div>
			
			<div class="relative" :class="{'backdrop':searchText}">
				<table 
				class="table  table-sm table-striped" 
				:class="{'table-hover':rowClickable}"
				>
				<thead>
					<tr>
						<th>#</th>
						<th 
						v-for="(header,index) in headers"
						:key="index"
						>
						{{header}}
					</th>

					<th v-if="headers.length>0">
						Action
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="searchText">
					<td :colspan="headers.length+1" class="text-center">
						<i class="fa fa-spin fa-spinner"></i>  
						{{ searchText }} ............
					</td>
				</tr>

				<table-row-wrapper 
					v-for="(row,index) in results.collection"
					:key="index"
					:result="row" 
					:index="calculatedIndex(index)"
					:headers="headers"
				></table-row-wrapper>

				<slot name="lastRow"></slot>

				<tr 
				v-if="results.isEmpty && headers.length>0" 
				class="text-white bg-secondary text-center">
				<td :colspan="headers.length+2"
				>
				No Items 
			</td>
		</tr>
	</tbody>
	<tfoot v-if="$slots.foot && !results.isEmpty">
		<slot name="foot"></slot>
	</tfoot>
</table>
</div>
<pagination-links :paginator="results"></pagination-links>
</div>
</div>
</template>

<script>
import get from "lodash/get";
import debounce from "lodash/debounce";

import Paginator from "./Paginator";

import PaginationLinks from "./links";

import TableRowWrapper from "../components/TableRowWrapper";
export default {
	components: { PaginationLinks, TableRowWrapper },

	props: {
		title: { default: false },
		rowClickable: { default: false },
		data: { required: true }
	},

	data() {
		return {
			searchText: false,
			query: "",
			results: new Paginator(this.data)
		};
	},
	methods: {
		search: debounce(function() {
			this.searchText = false;
			this.results.items = this.rows.filter(row => {
				for (let key in row) {
					if (row[key].includes(this.query.toLowerCase())) {
						return true;
					}
				}
				return false;
			});
		}, 300),

		changePerPage(event) {
			this.results.perPage = event.target.value;
		},
		calculatedIndex(index) {
			const results = this.results;
			return index + 1 + (results.currentPage - 1) * results.perPage;
		}
	},
	computed: {
		activeTable() {
			return this.$store.state.activeTable;
		},
		hasSomeData() {
			if (Array.isArray(this.data)) {
				return this.data.length > 0;
			}
			const keys = Object.keys(this.data);
			return keys && keys.length > 0;
		},
		headers() {
			return get(
				this.$store.state.user,
				this.activeTable + "." + "headers",
				[]
			);
		},
		rows() {
			return get(
				this.$store.state.user,
				this.activeTable + "." + "data",
				[]
			);
		}
	},
	watch: {
		query(newValue) {
			if (!this.hasSomeData) {
				return;
			}
			if (newValue) {
				this.searchText = "Waiting for you to finish typing";
				this.search();
			} else {
				this.results.items = this.rows;
			}
		},
		data(data) {
			this.results.items = data;

			//we will always make sure we are on the last page
			if (!this.results.onLastPage) {
				this.results.currentPage = this.results.lastPage;
			}
		}
	}
};
</script>
