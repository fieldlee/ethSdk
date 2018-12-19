

'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');
var Web3 = require("web3");

// web3 init
var web3;

var getContractInit = function (configPath, logger) {
    var config = JSON.parse(fs.readFileSync(configPath));
    // logger.debug(config.abi);
    // logger.debug(config.contract);
    if (web3 == undefined) {
        let httpurl = util.format("http://%s:%s", config["host"], config["port"]);
        logger.debug(httpurl);
        web3 = new Web3(new Web3.providers.HttpProvider(httpurl));
        console.log('init web3 end');
    }
    var version = web3.version;
    var address = "0x76A4Bf011d91a543Ff6eee381e69304e0182044E";
    logger.debug(version);
    var contract = new web3.eth.Contract(config.abi, config.contract, { from:address });
    // transfer
    contract.methods.setInitName("LMTTOKEN").send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' setInitName Err: "%s"',err));
        } else {
            logger.debug(util.format('==== setInitName result:"%s"', result));
        }
    });
    contract.methods.setInitSymbol("LMT").send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' setInitSymbol Err: "%s"',err));
        } else {
            logger.debug(util.format('==== setInitSymbol result:"%s"', result));
        }
    });
    contract.methods.setInitDecimals(18).send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' setInitDecimals Err: "%s"',err));
        } else {
            logger.debug(util.format('==== setInitDecimals result:"%s"', result));
        }
    });
    contract.methods.setInitTotalSupply(1000000).send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' setInitTotalSupply Err: "%s"',err));
        } else {
            logger.debug(util.format('==== setInitTotalSupply result:"%s"', result));
        }
    });
};

exports.getContractInit = getContractInit;