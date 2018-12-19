

'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');
var Web3 = require("web3");

// web3 init
var web3;

var testContract = function (configPath, logger) {
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
    var address1 = "0x887CCeC605dD79B7C0FC29c7423374ab2d88A32f";
    var address2 = "0x06A98EBC3E9aae240407dD15c7bA91b137eB8F8F";
    var address3 = "0x75DF18db051BB7Caa6795ECcF2CcecE91694f103";
    var address4 = "0x7Bfd6B66ED33cf80f2855b914B9Fa7C394f44F0f";

    var contractAddress = "0xd0bc088059a3c9dc96ee6b0981491f6f9e33c105";

    // contract.methods.preAirDrop(contractAddress,address,address,[1000,2000]).send(function (err, result) {
    //     if (err != null) {
    //         logger.error(util.format(' preAirDrop Err: "%s"',err));
    //     } else {
    //         logger.debug(util.format('==== preAirDrop result:"%s"', result));
    //     }
    // });


    contract.methods.airDrop(contractAddress,address,address,[address1,address2],[1000,2000]).send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' airDrop Err: "%s"',err));
        } else {
            logger.debug(util.format('==== airDrop result:"%s"', result));
        }
    });

/*****
 * 
 * 
 *
   // getListAddresses
    contract.methods.getListAddresses().call((err, result)=>{
        if (err != null) {
            logger.error(util.format(' getListAddresses Err: "%s"',err));
        } else {
            logger.debug(util.format('==== getListAddresses result:"%s"', result));
        }
    });

    // setUser
    contract.methods.setUser(address2,"lisheng",25).send(function (err, result) {
        if (err != null) {
            logger.error(util.format(' setUser Err: "%s"',err));
        } else {
            logger.debug(util.format('==== setUser result:"%s"', result));
        }
    });

    // getUserName
    contract.methods.getUserName(address2).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' getUserName Err: "%s"',err));
        } else {
            logger.debug(util.format('==== getUserName address1 result:"%s"', result));
        }
    });
    // getUserAge
    contract.methods.getUserAge(address2).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' getUserAge Err: "%s"',err));
        } else {
            logger.debug(util.format('==== getUserAge result:"%s"', result));
        }
    });
    // addListAddresses
    // var getData = contract.addListAddresses.getData([address1,address2,address3,address4]);
    // addListAddresses
    var listaddress = [];
    for (let index = 0; index < 2000; index++) {
        listaddress.push(address1);
    }
    // contract.methods.addListAddresses(listaddress).estimateGas(function (err, gas) {
    //     if (err != null) {
    //         logger.error(util.format(' estimateGas Err: "%s"',err));
    //     } else {
    //         logger.debug(util.format('==== estimateGas result:"%s"', gas));
            contract.methods.addListAddresses([address]).send(function (err, result) {
                if (err != null) {
                    logger.error(util.format(' addListAddresses Err: "%s"',err));
                } else {
                    logger.debug(util.format('==== addListAddresses result:"%s"', result));
                }
            });
    //     }
    // });
    

    // getAddressesNum
    contract.methods.getAddressesNum(listaddress).call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' getAddressesNum Err: "%s"',err));
        } else {
            logger.debug(util.format('==== getAddressesNum result:"%s"', result));
        }
    });

    // getListAddresses
    contract.methods.getListAddresses().call(function (err, result) {
        if (err != null) {
            logger.error(util.format(' getListAddresses Err: "%s"',err));
        } else {
            logger.debug(util.format('==== getListAddresses result:"%s"', result));
        }
    });



 */
  
};

exports.testContract = testContract;