

'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');
var Web3 = require("web3");
var web3Admin = require('web3admin')
// web3 init
var web3;


var getContract = function (configPath, logger) {
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
    logger.debug(version);
    var contract = new web3.eth.Contract(config.abi, config.contract, { from: "0x76A4Bf011d91a543Ff6eee381e69304e0182044E" });
    var address = "0x76A4Bf011d91a543Ff6eee381e69304e0182044E";
    var num = 20;
   
    // balanceOf
    contract.methods.getBalance("0x76A4Bf011d91a543Ff6eee381e69304e0182044E").call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' balanceOf Err: "%s"',err));
        } else {
            logger.debug(util.format('==== balanceOf result:"%s"', result));
        }
    });
    // balanceOf
    contract.methods.getBalanceInEth("0x76A4Bf011d91a543Ff6eee381e69304e0182044E").call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' getBalanceInEth Err: "%s"',err));
        } else {
            logger.debug(util.format('==== getBalanceInEth result:"%s"', result));
        }
    });
    // transfer
    contract.methods.sendCoin("0x06A98EBC3E9aae240407dD15c7bA91b137eB8F8F", num).send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' transfer Err: "%s"',err));
        } else {
            logger.debug(util.format('==== transfer result:"%s"', result));
        }
    });

    // events
    contract.getPastEvents('Transfer', function (error, events) {
        for (var i = 0; i < events.length; i++) {
            var eventObj = events[i];
            logger.debug(JSON.stringify(eventObj));
            logger.debug(util.format('==== from:"%s"', eventObj.returnValues._from));
            logger.debug(util.format('==== to:"%s"', eventObj.returnValues._to));
            logger.debug(util.format('==== value:"%s"', eventObj.returnValues._value));
        }
    });

    // contract.events.Transfer({
    //     fromBlock: 0,
    // }, function(error, event){ console.log(event); })
    // .on('data', function(event){
    //     console.log("data"); 
    //     console.log(event); // same results as the optional callback above
    // })
    // .on('changed', function(event){
    //     // remove event from local database
    //     console.log("changed");
    //     console.log(event);
    // })
    // .on('error', console.error);

    // get block pending
    web3.eth.getBlock("pending",function(err,block) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('====pending block:"%s"', JSON.stringify(block)) );
        }
    });
};

exports.getContract = getContract;