import { version } from '../../package.json';
import { Router } from 'express';
import walletConstructor from './wallet';
import transactionConstructor from './transaction'

export default ({ config, store, _ }) => {

	let wallet = walletConstructor({ store });
	let transaction = transactionConstructor( { store, _ } )
	let api = Router();

    /*Wallet API*/
	api.get('/createWallet', wallet.create);
	api.get('/getBalance/:address', wallet.balance);
	/*Transaction API*/
	api.post('/transaction', transaction.validator, transaction.loader, transaction.create);

	return api;
}
