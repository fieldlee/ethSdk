
'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');
var CircularJSON = require('circular-json');

var createWallet = function(web3,logger,password,res) {

    var result = web3.eth.accounts.wallet.create(2,password)
    logger.debug(util.format('==== create wallet result:"%s"',CircularJSON.stringify(result)));
    // var result =  web3.eth.accounts.create(password);
    // if (result){
    //     logger.debug(util.format('==== create account result:"%s"', JSON.stringify(result)));
    //     res.status(200).json({"address":result.address,"privateKey":result.privateKey});
    //     return ;
    // }else{
    //     res.status(500).json({error:util.format('创建账号错误，请重试...')});
    //     return;
    // }
}

exports.createWallet = createWallet;