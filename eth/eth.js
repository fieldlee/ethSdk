
'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');

var getEth = function(web3, configPath,logger) {

    var config = JSON.parse(fs.readFileSync(configPath));
    logger.debug(util.format('blockNumber: "%s"', web3.eth.blockNumber));
    logger.debug(util.format('defaultblock:"%s"',web3.eth.defaultBlock));
    // getBlockNumber
    web3.eth.getBlockNumber(function (err,obj) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('====BlockNumber:"%s"',obj) );
        }
    });

    // console.log(web3.eth.miner);
    
    // get Block
    web3.eth.getBlock(9032,function(err,block) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('====latest block:"%s"', JSON.stringify(block)) );
        }
    });
    
    // get getGasPrice
    web3.eth.getGasPrice(function(err,price) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('====GasPrice:"%s"',price) );
        }
    });


    // web3.eth.getAccounts
    web3.eth.getAccounts(function(err,accounts){
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('====accounts:"%s"',accounts) );
        }
    });


    // web3.eth.getBalance
    var addr = "0x887CCeC605dD79B7C0FC29c7423374ab2d88A32f";
    web3.eth.getBalance(addr,function (err,blc) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('====Balance:"%s"ETH,"%s"WEI',web3.utils.fromWei(blc)),blc);
        }
    });

    // web3.eth.getBlockTransactionCount
    web3.eth.getBlockTransactionCount(9032,function(err,transactioncount){
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('==== latest block TransactionCount:"%s"',transactioncount) );
        }
    });


    // web3.eth.getTransaction
    // ///////////////////////////////////////////////////////////////////////
    ////////////////////////////Hash
    // ///////////////////////////////////////////////////////////////////////
    var tranHash = "0xd58dbcbcf74cea7188122155edf0dcaca94c002bbc89f1cc5a6e47276f034293";
    web3.eth.getTransaction(tranHash,function (err,transaction) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('==== Transaction:"%s"',JSON.stringify(transaction)) );
        }
    });

    // getTransactionFromBlock(hashStringOrNumber, indexNumber [, callback])
    web3.eth.getTransactionFromBlock('latest', 0 ,function (err,transaction) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('==== TransactionFromBlock:"%s"',transaction) );
        }
    });


    // web3.eth.getTransactionReceipt('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b')
    // ///////////////////////////////////////////////////////////////////////
    ////////////////////////////Hash
    // ///////////////////////////////////////////////////////////////////////
    // var tx = "";
    // web3.eth.getTransactionReceipt(tx,function (err,receipt) {
    //     if (err != null) {
    //         logger.error(err);
    //     }else{
    //         logger.debug(util.format('==== TransactionReceipt:"%s"',receipt) );
    //     }
    // });


    // web3.eth.getCoinbase()
    web3.eth.getCoinbase(function (err,coin) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('==== getCoinbase:"%s"',coin) );
        }
    });

    // get block pending
    web3.eth.getBlock("pending",function(err,block) {
        if (err != null) {
            logger.error(err);
        }else{
            logger.debug(util.format('====pending block:"%s"', JSON.stringify(block)) );
        }
    });
};

exports.getEth = getEth;