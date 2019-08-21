import express from 'express';
import Player from 'models/Player';
import { isLoggedIn } from 'helpers';

const router = express.Router();

router.get('/', isLoggedIn, async function(req, res) {
	try {
		const players = await Player.find();

		res.render('players', {
			players,
			page: {
				players: true,
				title: 'Players',
			},
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async function(req, res) {
	try {
		const player = await Player.findById(req.params.id);

		res.render('player', {
			player,
			page: {
				players: true,
				title: `Player ${player.firstName} ${player.lastName}`,
			},
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;