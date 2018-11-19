

'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');
var Web3 = require("web3");
// web3 init
var web3;

var getContract = function (configPath, logger) {
    var config = JSON.parse(fs.readFileSync(configPath));
    // logger.debug(config.abi);
    // logger.debug(config.contract);
    if (web3 == undefined) {
        let httpurl = util.format("http://%s:%s", config["host"], config["port"]);
        // logger.debug(httpurl);
        web3 = new Web3(new Web3.providers.HttpProvider(httpurl));
        // web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/0x2a969a70c3b376f7c0d25c34aa9bdb940906cfd954836d40000cb695ac956a32"));
        console.log('init web3 end');
    }

    // const account = web3.eth.accounts.privateKeyToAccount('0xf6abe685912a5531092e58c02b85d0c26b20c0e9f4048b23bfe1f38a5d848b79');
    // console.log(account);
    // console.log("account==========");
    var version = web3.version;
    logger.debug(version);
    // var from = "0x76A4Bf011d91a543Ff6eee381e69304e0182044E";
    // 0x230eaaf5812f6833990bc0f39085527946a043fe  
    // var address = "0x230eaaf5812f6833990bc0f39085527946a043fe";
    var address = "0x230eaaf5812f6833990bc0f39085527946a043fe";
    var contract = new web3.eth.Contract(config.abi, config.contract, { from: address });
    var address1 = "0x5f84a585eecddb8ffdca1a4b721c90e0311f0bae";
    var address2 = "0x0cd3f20158a7e1b7cde23229e94977ce36dedd6d";
    var address3 = "0x672b935744be14074024c05fd57042ddeaea09b5";
    // var num = ethers.utils.bigNumberify(10000000000000000000);
    // var num =  1000
    


        // var transfer = contract.methods.transfer(address1, web3.utils.toWei('100', 'ether'));
        // var encodedABI = transfer.encodeABI();

        // var tx = {
        //     chainId: web3.utils.toHex(15),
        //     from: address,
        //     gas:200000000,
        //     gasPrice:6000000000,
        //     to: config.contract,
        //     data: encodedABI
        // };

        // var privateKey = "0x2a969a70c3b376f7c0d25c34aa9bdb940906cfd954836d40000cb695ac956a32";
        // web3.eth.accounts.signTransaction(tx, privateKey,false).then((signed) => {
        //     logger.debug(util.format('==== signed:"%s"', signed));
        //     logger.debug(util.format('==== signed.rawTransaction:"%s"', signed.rawTransaction));
           
        //     var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);
        //     tran.on('confirmation', (confirmationNumber, receipt) => {
        //         logger.debug(util.format('==== confirmationNumber:"%s"', confirmationNumber));
        //         logger.debug(util.format('==== receipt result:"%s"', receipt));
        //     });
        //     tran.on('transactionHash', hash => {
        //         logger.debug(util.format('==== transactionHash:"%s"', hash));
        //     });
        //     tran.on('receipt', receipt => {
        //         logger.debug(util.format('==== receipt:"%s"', receipt));
        //     });
        // },(err)=>{
        //     logger.error(util.format(' Err: "%s"', err));
        // });

    // get info 
    web3.eth.personal.unlockAccount(address, "password").then(
        (reseult)=>{
            logger.debug(util.format('==== unlockAccount result:"%s"', reseult));
            // transfer
            contract.methods.transfer(address1, web3.utils.toWei('1000', 'ether')).send(function (err, result) {
                if (err != null) {
                    logger.error(util.format(' transfer Err: "%s"', err));
                } else {
                    logger.debug(util.format('==== transfer address1 result:"%s"', result));
                }
            });
        },(err)=>{
            logger.error(util.format(' unlockAccount: "%s"', err));
        }
    );
    // logger.debug(web3);
    // totalSupply
    contract.methods.totalSupply().call((err, result) => {
        if (err != null) {
            logger.error(util.format(' totalSupply Err: "%s"', err));
        } else {
            logger.debug(util.format('==== totalSupply result:"%s"', result));
        }
    });
    // balanceOf
    contract.methods.balanceOf(address).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' balanceOf Err: "%s"', err));
        } else {
            logger.debug(util.format('==== balanceOf address result:"%s"', result));
        }
    });
    contract.methods.balanceOf(address1).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' balanceOf Err: "%s"', err));
        } else {
            logger.debug(util.format('==== balanceOf address1 result:"%s"', result));
        }
    });
    contract.methods.balanceOf(address2).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' balanceOf Err: "%s"', err));
        } else {
            logger.debug(util.format('==== balanceOf address2 result:"%s"', result));
        }
    });
    // balanceOf
    // contract.methods.balanceOf(address2).call(function (err, result) {
    //     if (err != null) {
    //         logger.error(util.format(' balanceOf Err: "%s"',err));
    //     } else {
    //         logger.debug(util.format('==== balanceOf address2 result:"%s"', result));
    //     }
    // });

    

    // contract.methods.transfer(address2, web3.utils.toWei('1000', 'ether')).send(function (err, result) {
    //     if (err != null) {
    //         logger.error(util.format(' transfer Err: "%s"', err));
    //     } else {
    //         logger.debug(util.format('==== transfer address2 result:"%s"', result));
    //     }
    // });
    // // transfer
    // contract.methods.transfer(address3, web3.utils.toWei('1000', 'ether')).send(function (err, result) {
    //     if (err != null) {
    //         logger.error(util.format(' transfer Err: "%s"',err));
    //     } else {
    //         logger.debug(util.format('==== transfer address3 result:"%s"', result));
    //     }
    // });


    // balanceOf
    // contract.methods.balanceOf(address).call(function (err, result) {
    //     if (err != null) {
    //         logger.error(util.format(' balanceOf Err: "%s"', err));
    //     } else {
    //         logger.debug(util.format('==== balanceOf result:"%s"', result));
    //     }
    // });

    // // transferFrom
    // var from = "0x76A4Bf011d91a543Ff6eee381e69304e0182044E";
    // var to = "0x06A98EBC3E9aae240407dD15c7bA91b137eB8F8F";
    // //0xEb4c70068612698289D59B57Ca8cbDa2ba4393E8
    // contract.methods.transferFrom(from, to, 10).send(function (err, result) {
    //     if (err != null) {
    //         logger.error(util.format(' transferFrom Err: "%s"',err));
    //     } else {
    //         logger.debug(util.format('==== transferFrom result:"%s"', result));
    //     }
    // });

    // transferFrom after check blance 
    contract.methods.balanceOf(address1).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' balanceOf Err: "%s"', err));
        } else {
            logger.debug(util.format('==== after transfer to balanceOf from result:"%s"', result));
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
    web3.eth.getBlock("pending", function (err, block) {
        if (err != null) {
            logger.error(err);
        } else {
            logger.debug(util.format('====pending block:"%s"', JSON.stringify(block)));
        }
    });
};

var transferContract = function (res,configPath, logger,address,to,value,contractAddr) {
    var config = JSON.parse(fs.readFileSync(configPath));
    if (web3 == undefined) {
        let httpurl = util.format("http://%s:%s", config["host"], config["port"]);
        // logger.debug(httpurl);
        web3 = new Web3(new Web3.providers.HttpProvider(httpurl));
        // web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/0x2a969a70c3b376f7c0d25c34aa9bdb940906cfd954836d40000cb695ac956a32"));
        console.log('init web3 end');
    }

    // var address = "0x230eaaf5812f6833990bc0f39085527946a043fe";
    
    var contract = new web3.eth.Contract(config.abi, config.contract, { from: address });
    if (contractAddr) {
        contract = new web3.eth.Contract(config.abi, contractAddr, { from: address });
    }
    // get info 
    web3.eth.personal.unlockAccount(address, "password").then(
        (reseult)=>{
            logger.debug(util.format('==== unlockAccount result:"%s"', reseult));
            // transfer
            contract.methods.transfer(to, web3.utils.toWei(value, 'ether')).send(function (err, result) {
                if (err != null) {
                    logger.error(util.format(' transfer Err: "%s"', err));
                    res.status(400).json({"transcation":util.format('err:"%s"',err)});
                } else {
                    logger.debug(util.format('==== transfer address1 result:"%s"', result));
                    res.status(200).json({"transcation":util.format('tx:"%s"',result)});
                }
            });
        },(err)=>{
            logger.error(util.format(' unlockAccount: "%s"', err));
            res.status(400).json({"err":util.format('err:"%s"',err)});
        }
    );
    
};

var getContractBalance = function (res,configPath, logger,addr,contractAddr) {
    var config = JSON.parse(fs.readFileSync(configPath));
    if (web3 == undefined) {
        let httpurl = util.format("http://%s:%s", config["host"], config["port"]);
        web3 = new Web3(new Web3.providers.HttpProvider(httpurl));
        console.log('init web3 end');
    }
    var version = web3.version;
    logger.debug(version);

    var contract = new web3.eth.Contract(config.abi, config.contract);
    
    if (contractAddr) {
        contract = new web3.eth.Contract(config.abi, contractAddr);
    }

    contract.methods.balanceOf(addr).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' balanceOf Err: "%s"', err));
            res.status(400).json({"err":util.format('err:"%s"',err)});
        } else {
            logger.debug(util.format('==== after transfer to balanceOf from result:"%s"', result));
            res.status(200).json({"Balance":util.format('====Balance:"%s"',result)});
        }
    });
}

exports.getContract = getContract;
exports.getContractBalance = getContractBalance;
exports.transferContract = transferContract;