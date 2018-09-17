// log4js
let log4js = require('log4js');
let logger = log4js.getLogger('Web3ForTest');

// express
let express = require('express');
let bodyParser = require('body-parser');
let http = require('http');
let util = require('util');
let fs = require('fs');
let cors = require('cors');
let path = require('path');
let app = express();

//web3
let Web3 = require("web3");
let eth = require("./eth/eth.js");
let contract = require("./contract/contract.js");
let account = require('./account/account.js');
let wallet = require('./wallet/wallet')

let host = process.env.HOST || "127.0.0.1";
let port = process.env.PORT || "3000";

app.options('*', cors());
app.use(cors());
//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
	extended: false
}));

let configPath = path.join(__dirname, 'config.json');
// web3 init
var w3;
// Show web3 where it needs to look for the Ethereum node
if (w3 == undefined) {
	var result = JSON.parse(fs.readFileSync(configPath));
	let httpurl = util.format("http://%s:%s",result["host"],result["port"]);
	logger.debug(httpurl);
	w3 = new Web3(new Web3.providers.HttpProvider(httpurl));
	console.log('init web3 end');
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START SERVER /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var server = http.createServer(app).listen(port, function () { });

logger.info('****************** SERVER STARTED ************************');
logger.info('**************  http://' + host + ':' + port + '  ******************');
server.timeout = 240000;

app.post('/account', function (req, res) {
	// return account address and private key
	var password;
	if (req.body.password){
		password = req.body.password;
	}else{
		res.status(500).json({error:'请输入密码...'});
		return;
	}
	account.createAccount(w3,logger,password,res);
});

app.post('/wallet', function (req, res) {
	// return account address and private key
	var password;
	if (req.body.password){
		password = req.body.password;
	}else{
		res.status(500).json({error:'请输入钱包密码...'});
		return;
	}
	wallet.createWallet(w3,logger,password,res);
});

app.post('/eth', function (req, res) {
	eth.getEth(w3,configPath,logger);
});

app.post('/contract', function (req, res) {
	contract.getContract(configPath,logger);
});