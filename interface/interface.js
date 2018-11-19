

'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');
var Web3 = require("web3");
var web3Admin = require('web3admin')
// web3 init
var web3;

var interfaceobj = function (configPath, logger) {
    var config = JSON.parse(fs.readFileSync(configPath));
    if (web3 == undefined) {
        let httpurl = util.format("http://%s:%s", config["host"], config["port"]);
        logger.debug(httpurl);
        web3 = new Web3(new Web3.providers.HttpProvider(httpurl));
        console.log('init web3 end');
    }
    var version = web3.version;
    logger.debug(version);
    var address = "0x76A4Bf011d91a543Ff6eee381e69304e0182044E";
    var contract = new web3.eth.Contract(config.abi, config.contract, { from:address });
    // var address1 = "0x887CCeC605dD79B7C0FC29c7423374ab2d88A32f";
    // var address2 = "0x06A98EBC3E9aae240407dD15c7bA91b137eB8F8F";
    // var address3 = "0x75DF18db051BB7Caa6795ECcF2CcecE91694f103";
    // var address4 = "0x7Bfd6B66ED33cf80f2855b914B9Fa7C394f44F0f";

    var contractAddress = "0x2dd90cd07cc36cbeb6b47b3f420c27b72f3fff2b";

    contract.methods.storeAction(contractAddress).send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' storeAction Err: "%s"',err));
        } else {
            logger.debug(util.format('==== storeAction result:"%s"', result));
        }
    });


    contract.methods.someAction(contractAddress).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' someAction Err: "%s"',err));
        } else {
            logger.debug(util.format('==== someAction result:"%s"', result));
        }
    });
    //getLength

    contract.methods.getLength(contractAddress).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' getLength Err: "%s"',err));
        } else {
            logger.debug(util.format('==== getLength result:"%s"', result));
        }
    });
};

exports.interface = interfaceobj;