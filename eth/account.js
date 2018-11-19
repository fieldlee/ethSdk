
'use strict'

var util = require('util');
var fs = require('fs');
var path = require('path');

var getPrivate = function(web3, configPath,logger) {
   return web3.eth.accounts.decrypt({"address":"230eaaf5812f6833990bc0f39085527946a043fe","crypto":{"cipher":"aes-128-ctr","ciphertext":"bd7ba4da81fa21a0cd587493e259bb0e839b6c215422250aef8858da20a3aae5","cipherparams":{"iv":"7fbc566b6ee4881b4fc9c16c5749b7ce"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"3a3a8737b8bcbec15d42e236ae900b162771edbe9e32efa80fd2dad912b12d54"},"mac":"a6925b216a0d7cba70bd88ba5d6d7cd94554432764e173185bea56595aef26e6"},"id":"0f363aab-4315-4074-bff6-5b0c62acf247","version":3},"password");
};

exports.getPrivate = getPrivate;