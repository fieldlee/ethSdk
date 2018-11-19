var bip39 = require('bip39')
var hdkey = require('ethereumjs-wallet/hdkey')
var util = require('ethereumjs-util')
var getMemory = function () {
    // 生成助记词
    var mnemonic = bip39.generateMnemonic()
    console.log(mnemonic)

    var seed = bip39.mnemonicToSeed(mnemonic)
    var hdWallet = hdkey.fromMasterSeed(seed)


    var key1 = hdWallet.derivePath("m/44'/60'/0'/0/0")
    console.log("Eth私钥：" + util.bufferToHex(key1._hdkey._privateKey))

    var address1 = util.pubToAddress(key1._hdkey._publicKey, true)
    console.log("Eth地址：" + util.bufferToHex(address1))

    address1 = util.toChecksumAddress(address1.toString('hex'))
    console.log("Eth Encoding Address 地址：" + address1)
// ==============================bitcoin
    var btckey = hdWallet.derivePath("m/44'/0'/0'/0/0")
    console.log("BTC私钥：" + util.bufferToHex(btckey._hdkey._privateKey))

    var BTCaddress = util.pubToAddress(btckey._hdkey._publicKey, true)
    console.log("BTC地址：" + util.bufferToHex(BTCaddress))

    BTCaddress = util.toChecksumAddress(BTCaddress.toString('hex'))
    console.log("BTC Encoding Address 地址：" + BTCaddress)
}

exports.getMemory = getMemory;