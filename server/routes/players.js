const express = require('express');
const router = express.Router();
const Player = require('models/Player');

router.get('/players', function(req, res) {
	Player.find().then(function(players) {
		res.render('players', {
			players,
			page: {
				players: true
			},
		});
	}).catch(function(error) {
		res.status(500).send(error);
	});
});

router.get('/players/:id', function(req, res) {
	Player.findById(req.params.id).then(function(player) {
		res.render('player', {
			player,
			page: {
				players: true
			},
		});
	}).catch(function(error) {
		res.status(500).send(error);
	});
});

module.exports = router;