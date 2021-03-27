const router = require("express").Router();
const { Topic, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
	console.log("HIT THe / user route time to sign up!!!");
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.userId = userData.id;
			req.session.logged_in = true;

			console.log("WE DID SESSION SAVE userDate", userData);

			res.status(200).json(userData);
		});
	} catch (err) {
		console.log("SOMETHING WRONG err", err);
		res.status(400).json(err);
	}
});

// router.post('/profile', withAuth, async (req, res) => {
//   console.log('post for profile');
//   try {
//     const postData = await Topic.create(req.body);

//     req.body.title = postData.title;
//     req.body.body = postData.body;
//     console.log('this is the data', postData);

//     // res.render(postData);
//     res.status(200).json(postData);
//   } catch (err) {
//     console.log('SOMETHING WRONG err', err);
//     res.status(400).json(err);
//   }
// });

// TRYING PROJECT ROUTE
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.userId, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Topic }],
//     });

//     const user = userData.get({ plain: true });
//     console.log('This is User Data', userData);
//     res.render('profile', {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(409)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(409)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }

});

router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

router.get("/", withAuth, async (req, res) => {
	try {
		// Get all sessions and JOIN with user data
		const pData = await Post.findAll({
			include: [
				{
					model: User,
				},
			],
		});

		// Serialize data so the template can read it
		const post = pData.map((post) => post.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render("home", {
			post,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// // Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.userId, {
			attributes: { exclude: ["password"] },
		});
		console.log("USer data!!", userData);

		const user = userData.get({ plain: true });
		console.log("User found ???", user);

		res.render("profile", {
			...user,
			logged_in: true,
		});
	} catch (err) {
		console.log("THIS IS ERR!!!!", err);
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect("/profile");
		return;
	}

	res.render("login");
});

router.get("/topicList", (req, res) => {
	// If the user is already logged in, redirect the request to another route
	console.log(req.session);
	if (req.session.logged_in) {
		res.render("topicList", {
			logged_in: true,
		});
		return;
	}
	res.redirect("/login");
});

// for all topics
router.get("/topic/:name/:id", (req, res) => {
	console.log("time to get get the topic and comments!!", req.params);
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		logged_in: true,
			Comment.findAll({
				where: {
					topic_id: parseInt(req.params.id),
				},
			}).then(function (data) {
				console.log("Data!!!!", data);
				var hbsObj = {
					title: req.params.name,
					comments: data.map((comment) => comment.toJSON()),
				};

				res.render("topic", hbsObj);
			});

		return;
	}
	// res.render('login');
});

// router.post('/profile');

// router.get('/comments', (req, res) => {
//   console.log('What am I doing? - does this fix that error', req.body);
// });

router.post("/comments", withAuth, async (req, res) => {
	console.log("post for profile %%%%%%%%%%%%%%", req.body);
	try {
		const commentWeMade = await Comment.create({
			body: req.body.postDesc,
			topic_id: req.body.topicId,
		});

		// console.log('this is the data', postData);

		// res.render(postData);
		res.status(200).json({ test: "testingg" });
	} catch (err) {
		console.log("SOMETHING WRONG err", err);
		res.status(400).json(err);
	}
});

// New comment delte route!! routere.delete
router.delete("/:id", withAuth, async (req, res) => {
	try {
		const commentData = await Comment.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!commentData) {
			res.status(404).json();
			return;
		}

		res.status(200).json(commentData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
