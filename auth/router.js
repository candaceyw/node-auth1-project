const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
// const config = require('../config/default.json');

const Users = require('../users/users-model.js');

router.use('/restricted', protected);

router.post('/register', (req, res) => {
	// const credentials = req.body;
	const userInfo = req.body;

	// the password will be hashed and rehashed 2 ^ 8 times
	const ROUNDS = process.env.HASHING_ROUNDS || 8;
	const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

	userInfo.password = hash;

	Users.add(userInfo)
		.then((user) => {
			res.json(user);
		})
		.catch((err) => res.send(err));
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	Users.findBy({ username })
		.then(([user]) => {
			console.log('user', user);
			if (user && bcrypt.compareSync(password, user.password)) {
				// remember this client
				req.session.user = {
					id: user.id,
					username: user.username,
				};

				res.status(200).json({ hello: user.username });
			} else {
				res.status(401).json({ message: 'invalid credentials' });
			}
		})
		.catch((error) => {
			res.status(500).json({ errorMesage: 'error' });
		});
});

router.get('/users', protected, async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy((error) => {
			if (error) {
				res.status(500).json({
					message: 'You are logged in',
				});
			} else {
				res.status(200).json({ message: 'logged out successfully' });
			}
		});
	} else {
		res.status(200).json({ message: 'already logged out' });
	}
});

function protected(req, res, next) {
	if (req.session && req.session.userId) {
		next();
	} else {
		res.status(401).json({ message: 'You shall not pass!' });
	}
}
module.exports = router;
