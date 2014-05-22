module.exports = {
	filterForJS : function filterForJS(files) {
		return files.filter(function(file) {
			return file.match(/\.js$/);
		});
	},
	filterForCSS: function filterForCSS(files) {
		return files.filter(function(file) {
			return file.match(/\.css$/);
		});
	}
};