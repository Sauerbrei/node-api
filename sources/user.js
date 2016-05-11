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




var express = require('express'),
	mysql		= require('mysql'),
	con			= mysql.createConnection({
		host:		'localhost',
		user:		'Username',
		passwort:	'Password',
		database:	'Database'
	})
;


module.exports = (function() {
	'use strict';
	var router = express.Router();
	
	//
	// === GET ALL USERS ===
	// via GET
	//
	router.get('/', function(req, res) {
		console.log('yes');
		con.query("SELECT * FROM users", function(err, rows) {
			if (err) {
				res.json({status: 9999, error: err});
			} else if (rows.length < 1) {
				res.json({status: 200, message: 'No Users found!', data: {}});
			} else {
				res.json({status: 200, message: 'OK', data: rows});
			}
		});
	})
				
		
		
// Testing
//
//		.put('/user', function(req, res) {
//			con.query("SELECT * FROM users WHERE name = ?", [req.body.username], function(err, result) {
//				if (err) {
//					res.json({status: 9999, error: err});
//				} else if (result.length > 0) {
//					res.json({status: 1000, message: 'User already taken!'});
//				} else {
//					var pw = crypto.createHash('sha1').update(req.body.pass).digest('hex');
//					con.query('INSERT INTO users (name, pw) VALUES (? , ?)', [req.body.username, pw], function(err, row) {
//						if (err) {
//							res.json({status: 99999, error: err});
//						} else {
//							res.json({status: 200, message: 'OK', data: {lastInsertedId: row.insertId}});
//						}
//					});
//				}
//			})
	;
	
	return router;
})();
