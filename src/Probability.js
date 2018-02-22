import set from "lodash/set";

class Probability {
	constructor(calculator) {
		this.calculator = calculator;
	}

	get computed() {
		let probabilities = {};

		this.calculator.selectedColumns.map(column => {
			const attributes = this.calculator.getCount(column);
			const total = this.calculator.rowCount;
			for (let prop in attributes) {
				set(
					probabilities,
					`${column}.symbols.${prop}`,
					`P(${column}= ${prop})=${attributes[prop]}/${total}`
				);
				set(
					probabilities,
					`${column}.fraction.${prop}`,
					`${attributes[prop]} / ${total}`
				);

				set(
					probabilities,
					`${column}.value.${prop}`,
					attributes[prop] / total
				);
			}
		});

		return probabilities;
	}
}

export default Probability;
