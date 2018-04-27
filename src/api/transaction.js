export default ({ store, _ }) => {
   const customContrllers = {};

   customContrllers.create = (req, res, next) => {
   	store.sendTransaction(
   		req._DATA, (err, data) => Object.keys(err).length 
   		? res.status(500).json(err) 
   		: res.sendStatus(201)
   	);
   }

   customContrllers.validator = (req, res, next) => {
   	  return ! _.keys(req.body) || (!req.body.amount && !req.body.destination && !req.body.privateKey) 
   	  ? res.sendStatus(501) 
   	  : next();
   }
   
   customContrllers.loader = (req, res, next) => {
   	 req.body.address = store.accounts.privateKeyToAccount(req.body.privateKey).address;
   	 req._DATA = _.assignInByKeysMap(
   	 	req.body, 
   	 	{}, 
   	 	{amount: 'value', destination: 'to', address: 'from'}
   	 );
   	 return next();
   }
   /* Extendable Functions e.g read, delete etc can be added to controller */
   /* customContrllers.read */
   /* customContrllers.xmethod */

    
   return customContrllers;
}


