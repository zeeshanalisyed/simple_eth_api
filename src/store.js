export default (instance, config, callback) => {
	// connect to a database if needed, then pass it to `callback`:
	const ether = new instance(new instance.providers.HttpProvider(`${config.dbUrl}/${config.dbToken}`));
	
	ether.cache = {};

	callback(ether);
}
