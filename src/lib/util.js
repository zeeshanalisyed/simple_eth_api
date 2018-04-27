const toRes = function toRes(res, status=200) {
	return (err, thing) => {
		if (err) return res.status(500).send(err);

		if (thing && typeof thing.toObject==='function') {
			thing = thing.toObject();
		}
		res.status(status).json(thing);
	};
}

const keys = (obj) => Object.keys(obj);

const isEmpty = (obj) => !keys(obj).length;

const assignInByKeysMap = (src, dest, mapObj = {}) => {
   keys(mapObj).map(_ksrc => dest[mapObj[_ksrc]] = src[_ksrc]);
   return dest;
}


export default {
	toRes,
	keys,
	isEmpty,
	assignInByKeysMap
}