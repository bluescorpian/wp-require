class WpRequire {
	cachedModules = {};
	constructor(webpackChunk = null, interceptModuleCalls = false) {
		if (webpackChunk === null)
			[webpackChunk] = WpRequire.findWebpackChunks();
		if (!webpackChunk) throw new Error("Could not find webpack chunks");
		webpackChunk.push([
			[Math.random()],
			{},
			(req) => (this._require = req),
		]);
		if (!this._require) throw new Error("Could not find require function");
		this.modules = this._require.m;

		if (interceptModuleCalls) {
			const self = this;
			const oldFunctionCall = Function.prototype.call;
			Function.prototype.call = function (...args) {
				if (args[3] === self._require) {
					const module = args[1];
					const exports = args[2];
					oldFunctionCall.apply(this, args);
					self.cachedModules[module.id] = exports;
				}
				return oldFunctionCall.apply(this, args);
			};
		}

		return Object.setPrototypeOf(this.require.bind(this), this); // allows the class instance to be called and be used as require
	}
	get moduleExports() {
		return Object.fromEntries(
			Object.entries(this.modules).map(([key, value]) => [
				key,
				this._require(key),
			])
		);
	}
	require() {
		return this._require(...arguments);
	}
	findModule(condition, cachedOnly = false) {
		for (const moduleID in this.modules) {
			const moduleExports = cachedOnly
				? this.cachedModules[moduleID]
				: this._require(moduleID);
			if (
				moduleExports !== null &&
				moduleExports !== undefined &&
				condition(moduleExports)
			) {
				return moduleExports;
			}
		}
		return null;
	}
	static findWebpackChunks() {
		const chunks = [];
		for (const key in window) {
			if (typeof key === "string" && key.startsWith("webpackChunk")) {
				chunks.push(window[key]);
			}
		}
		return chunks;
	}
}

export default WpRequire;
