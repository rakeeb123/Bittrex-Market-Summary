var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('https://api.bittrex.com/api/v1.1/public/getmarketsummaries')
  	.then(function(response) {
  		var lst = response.data.result;
  		var pct = [];
  		for (var i = 0; i < lst.length; i++) {
  			var val = parseFloat(100*(lst[i]["Last"] - lst[i]["PrevDay"]) / lst[i]["PrevDay"]).toFixed(3);
  			if (isNaN(val)) {
  				pct.push(0);
  			}
  			else {
				pct.push(val);
  			}
  		}
  		res.render('index', {data: lst, headers: Object.keys(lst[0]), percentGain: pct});
  	})
    .catch(function(error) {
      console.log(error);
      res.render('error');
    })
});

module.exports = router;