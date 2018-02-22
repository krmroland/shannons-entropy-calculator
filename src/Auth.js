const app = "Entropy";

class Auth {
	constructor() {
		this.identifier = null;
	}

	key() {
		return `${app}:user:${this.identifier}`;
	}

	get data() {
		return this.check
			? JSON.parse(window.localStorage.getItem(this.key()))
			: null;
	}

	get check() {
		return this.identifier
			? !!window.localStorage.getItem(this.key())
			: false;
	}

	logout() {
		return window.localStorage.remove(this.key());
	}

	login(identifier) {
		this.identifier = identifier;

		if (!this.check) {
			window.localStorage.setItem(this.key(), "{}");
		}
	}
}

//export an instance of auth
export default new Auth();
