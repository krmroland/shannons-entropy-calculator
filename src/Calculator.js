import countBy from "lodash/countBy";
import Vue from "vue";
import set from "lodash/set";
/**
 * class for performing related calculations
 * @see  http://www.cs.csi.cuny.edu/~imberman/ai/Entropy%20and%20Information%20Gain.htm
 */
class Calculator {
	constructor(rows) {
		Vue.set(this, "rows", rows);
	}

	get computed() {
		let result = {};

		this.selectedColumns.forEach(column => {
			result[column] = {};
			const attributes = this.getCount(column);
			for (let prop in attributes) {
				const fraction = `${attributes[prop]}/${this.rowCount}`;
				this.setProbabilityData(
					result,
					column,
					prop,
					attributes,
					fraction
				);
				this.setEntropyData(result, column, prop, attributes, fraction);
			}
		});

		return result;
	}

	setProbabilityData(result, column, prop, attributes, fraction) {
		set(
			result,
			`${column}.probabilities.${prop}`,
			`P(${column}= ${prop})=${fraction}`
		);
		// set(
		// 	data,
		// 	`probailities.${column}.fraction.${prop}`,
		// 	`${attributes[prop]} / ${this.rowCount}`
		// );

		//set(data, `${column}.value.${prop}`, attributes[prop] / this.rowCount);
	}
	setEntropyData(result, column, prop, attributes, fraction) {
		set(
			result,
			`${column}.entropy.expression.${prop}`,
			`-${fraction}log2(${fraction})`
		);
		fraction = eval(fraction);
		set(
			result,
			`${column}.entropy.values.${prop}`,
			-1 * fraction * Math.log2(fraction)
		);
	}

	get selectedColumns() {
		return this.rows.headers;
	}

	get allCounts() {
		let counts = {};

		this.selectedColumns.forEach(column => {
			counts[column] = countBy(this.rows.data, column);
		});
		return counts;
	}

	get getCount() {
		return function(key) {
			return this.allCounts[key] || null;
		};
	}

	get rowCount() {
		return Object.values(this.rows.data).length;
	}
}

export default Calculator;
