var twilio = require('twilio'),
    SerialPort = require("serialport").SerialPort,
    express = require('express'),
    bodyParser = require('body-parser');

require('dotenv').load();

var app = express();

function sendMessage(res, message) {
	var resp = new twilio.TwimlResponse();
	resp.message(message);
	res.type('text/xml');
	res.send(resp.toString());
}

var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
	baudrate: 9600
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/**
* If the calling number is +1 408-781-4298 (my phone number),
* 	then indicate that we have received a text from a verified number.
* Note our number is +1 617-870-0289
*/
var webhook = twilio.webhook('9061c4483f51c277dab3e18cf6b06d7e', 
			{ host:'http://ac013f0.ngrok.com', protocol:'https', validate:false });

console.log(webhook);

app.get('/', webhook, function(req, res){

    console.log(req.query);
    // console.log(req.query.From);

    if ( true /* req.query.From == "+14087814298" */) {

		console.log("verified number!");

		serialPort.once('data', function(data) {
			if (data.toString().indexOf('U') > -1) {
				//check if the Arduino returned a U for unlocking
				sendMessage(res, 'Unlocking!');
			}
			else if (data.toString().indexOf('L') > -1) {
				sendMessage(res, 'Locking!');
			}
			else {
				sendMessage(res, 'ERROR');
			}
			console.log('data received: ' + data);
		});

		serialPort.write("V", function(err, results) {
			if (err) {
				console.log('err ' + err);
			}
			console.log('results ' + results);
		});

	} else {
		console.log("Wrong number!");
		sendMessage(res, "Invalid number!");
	}
});

var port = 1337;

serialPort.open( function () {
	app.listen(port);
	console.log('Listening on port ' + port);
});
