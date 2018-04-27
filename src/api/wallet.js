export default ({ store }) => {
   const customContrllers = {};
   
   customContrllers.create = (req, res, next) => {
     let account = store.accounts.create();
     store.cache[account.address] = account.privateKey;
	 res.status(201).json({address: account.address, privateKey:account.privateKey}); 
   } 

   customContrllers.balance = (req, res, next) => {
   	 return res.send(store.getBalance(req.params.address));
   }

   

   /* Extendable Functions e.g read, delete etc can be added to controller */
   /* customContrllers.read */
   /* customContrllers.xmethod */

    
   return customContrllers;
}


