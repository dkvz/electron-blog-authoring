
/**
 * I use this function to sort of implement what a
 * PureComponent is in React to my own sauce.
 * I stole it from a Gist written by the actual Preact
 * guy: https://gist.github.com/developit/6e518a2ea4f2da03b0a8e4a2f81bc362
 * 
 * Thank you Preact guy.
 * 
 * @param {*} a Props or State object
 * @param {*} b Props or State objec to compare to the first one
 */
function shallowEqual(a, b) {
	for (let key in a) if (a[key]!==b[key]) return false;
	for (let key in b) if (!(key in a)) return false;
	return true;
}

module.exports = { shallowEqual };