import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Web3 from 'web3-eth';
import _ from './lib/util'; //Global Utility Package
import initializeStore from './store'; //Global store
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());
// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));


initializeStore( Web3, config , store => {
	// api router
	app.use('/api', api({ config, store, _ }));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
