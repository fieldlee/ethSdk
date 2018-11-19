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
let contractInit = require("./contract/contractInit.js");
let account = require('./account/account.js');
let testcontract = require('./contract/multitest.js');
let wallet = require('./wallet/wallet');
let send = require('./eth/send');
let interface = require('./interface/interface');
let privatekey = require('./eth/account');
let memory = require('./memory/memory');
let host = process.env.HOST || "0.0.0.0";
let port = process.env.PORT || "3000";

app.options('*', cors());
app.use(cors());
//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
	extended: false
}));

var configPath = path.join(__dirname, 'config.json');
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

app.post('/send', function (req, res) {
	var from;
	var to;
	var value ;
	if (req.body.from){
		from = req.body.from;
	}else{
		res.status(500).json({error:'请输入转出账号地址...'});
		return;
	}
	if (req.body.to){
		to = req.body.to;
	}else{
		res.status(500).json({error:'请输入转入账号地址...'});
		return;
	}
	if (req.body.value){
		value = req.body.value;
	}else{
		res.status(500).json({error:'请输入转出以太wei...'});
		return;
	}
	send.sentEth(res,w3,configPath,logger,from,to,value)
});



app.post('/contractsend', function (req, res) {
	var from;
	var to;
	var value ;
	var contractaddr;
	if (req.body.from){
		from = req.body.from;
	}else{
		res.status(500).json({error:'请输入转出账号地址...'});
		return;
	}
	if (req.body.to){
		to = req.body.to;
	}else{
		res.status(500).json({error:'请输入转入账号地址...'});
		return;
	}
	if (req.body.value){
		value = req.body.value;
	}else{
		res.status(500).json({error:'请输入value...'});
		return;
	}
	if (req.body.contract){
		contractaddr = req.body.contract;
	}
	contract.transferContract(res,configPath,logger,from,to,value,contractaddr);
});

app.post('/contractget', function (req, res) {
	var addr;
	var contractaddr;
	if (req.body.addr){
		addr = req.body.addr;
	}else{
		res.status(500).json({error:'请输入账号地址...'});
		return;
	}
	if (req.body.contract){
		contractaddr = req.body.contract;
	}
	contract.getContractBalance(res,configPath,logger,addr,contractaddr);
});

app.post('/get', function (req, res) {
	var addr;
	if (req.body.addr){
		addr = req.body.addr;
	}else{
		res.status(500).json({error:'请输入账号地址...'});
		return;
	}
	send.getEth(res,w3,configPath,logger,addr)
});

app.post('/eth', function (req, res) {
	eth.getEth(w3,configPath,logger);
});

app.post('/private', function (req, res) {
	var info = privatekey.getPrivate(w3,configPath,logger);
	res.status(200).json({info:info});
});

app.post('/contract', function (req, res) {
	contract.getContract(configPath,logger);
});

app.post('/contractinit', function (req, res) {
	// contract.getContract(configPath,logger);
	contractInit.getContractInit(configPath,logger);
});

app.post('/test', function (req, res) {
	// contract.getContract(configPath,logger);
	// contractInit.getContractInit(configPath,logger);
	// configPath = path.join(__dirname, 'config-local.json');
	testcontract.testContract(configPath,logger);
	res.status(200).json({info:'send...'});
	return;
});

app.post('/interface', function (req, res) {
	interface.interface(configPath,logger);
	res.status(200).json({info:'send...'});
	return;
});

app.post('/memory', function (req, res) {
	memory.getMemory();
	res.status(200).json({info:'send...'});
	return;
});

app.post('/memory', function (req, res) {
	memory.getMemory();
	res.status(200).json({info:'send...'});
	return;
});