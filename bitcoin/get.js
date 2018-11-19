var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
  host: '192.168.0.185',
  port: 8334,
  user: 'sjyy',
  pass: 'Sjyy@2018'
});
 
client.getDifficulty(function(err, difficulty) {
  if (err) {
    return console.error(err);
  }
  console.log('Difficulty: ' + difficulty);
});


 
client.getNetworkInfo(function(err, info) {
    if (err) {
      return console.error(err);
    }
    console.log('info: ' + JSON.stringify(info));
});