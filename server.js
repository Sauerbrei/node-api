/* 
 * ================================================================
 * This Software is licensed under the MIT License 
 * ================================================================
 * @author Sören Sauerbrei
 * @copyright Copyright (c) 2016. All rights reserved.
 * @version 1.0
 * @description 
 * @example 
 */


var		express		= require('express'),
		app			= express(),
		server		= require('http').createServer(app),
		io			= require('socket.io').listen(server),
		mysql		= require('mysql'),
		con			= mysql.createConnection({
			host:		'localhost',
			user:		'Username',
			passwort:	'Password',
			database:	'Database'
		}),
		crypto		= require('crypto'),
		bodyParser	= require('body-parser')
;
app.listen('8080');


/**
 * API-Security
 * ----------------
 * On every Request it checks for HTTP-Basic-Authentication.
 * The Request will be terminated immediately, if there are
 * empty or false credentials (DB-Checking).
 */
app.use(function(req, res, next) {
	if (req.headers.authorization) {// Credentials has been given
		var	auth		= new Buffer(req.headers.authorization.substring(6), 'base64').toString().split(':'),
			username	= auth[0],
			pass		= crypto.createHash('sha1').update(auth[1]).digest('hex');
		;
		con.query('SELECT * FROM users WHERE name = ? AND pw = ?', [username, pass], function(err, rows) {
			if (err) {				// Error
				res.json({status: 401, error: err});
			}
			if (rows.length > 0) {	// User Found
				next();
			} else {				// No User Found
				res.json({status: 401, error: 'False credentials!'});
			}
		});
	} else {						// No Credentials
		res.json({status: 401, error: 'No credentials sent!'});
	}
});

app.use(bodyParser.json());




/**
 * User-Management
 */
var userAPI = require('./sources/user');
app.use('/user', userAPI);


/**
 * Unknown Route
*/
app.all('*', function(req, res) {
	res.json({status: 'ERR', message: 'Unknown target.'});
});



console.log('Server running...');


