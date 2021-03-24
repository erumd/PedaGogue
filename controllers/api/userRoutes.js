const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  console.log('HIT THe / user route time to sign up!!!');
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.logged_in = true;

      console.log('WE DID SESSION SAVE userDate', userData);

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log('SOMETHING WRONG err', err);
    res.status(400).json(err);
  }
});

router.post('/login/', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
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

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {
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
    res.render('home', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
    });
    console.log('USer data!!', userData);

    const user = userData.get({ plain: true });
    console.log('User found ???', user);

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log('THIS IS ERR!!!!', err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/topicList', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.render('topicList');
    return;
  }
  res.redirect('/login');
});

router.get('/topic/:name/:id', (req, res) => {
  console.log('time to get get the topic and comments!!', req.params);
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    Comment.findAll({
      where: {
        topic_id: parseInt(req.params.id),
      },
    }).then(function (data) {
      console.log('Data!!!!', data);
      var hbsObj = {
        title: req.params.name,
        comments: data.map((comment) => comment.toJSON()),
      };

      res.render('topic', hbsObj);
    });

    return;
  }
  // res.render('login');
});
module.exports = router;
