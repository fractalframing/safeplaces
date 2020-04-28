const express = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = require('../config/jwtConfig');

const initBackend = (passport, { User }) => {
  const router = express.Router();

  // *** POST /login user *** //
  router.post('/login',	passport.authenticate('local'), function(req, res, done) {
    const { username } = req.body;
    User.findOne({ username }).then((user) => {
      const token = jwt.sign({ id: user.username }, jwtSecret.secret);
      res.status(200).json({
        token: token,
        maps_api_key: user.maps_api_key
      });
    }).catch((err) => {
      console.log(err);
      return done(err);
    });
  });

  // *** GET all redacted trails *** //
  router.get('/redacted_trails', passport.authenticate('jwt', { session: false }), function(req, res) {
    let redacted_trails = {
      "data": [
        {
          "identifier": "a88309c1-26cd-4d2b-8923-af0779e423a3",
          "organization_id": "a88309c2-26cd-4d2b-8923-af0779e423a3",
          "trail": [
            {
              "latitude": 12.34,
              "longitude": 12.34,
              "time": 123456789
            }
          ],
          "user_id": "a88309ca-26cd-4d2b-8923-af0779e423a3"
        },
        {
          "identifier": "a88309c1-26cd-4d2b-8923-af0779e423a4",
          "organization_id": "a88309c2-26cd-4d2b-8923-af0779e423a3",
          "trail": [
            {
              "latitude": 12.34,
              "longitude": 12.34,
              "time": 123456789
            }
          ],
          "user_id": "a88309ca-26cd-4d2b-8923-af0779e423a3"
        }
      ]
    };
    res.status(200).json(redacted_trails);
  });

  // *** POST redacted trail *** //
  router.post('/redacted_trail',
    passport.authenticate('jwt', { session: false }), function(req, res) {
      let redacted_trails = {
        "data": {
          "identifier": "a88309c1-26cd-4d2b-8923-af0779e423a3",
          "organization_id": "a88309c2-26cd-4d2b-8923-af0779e423a3",
          "trail": [
            {
              "latitude": 12.34,
              "longitude": 12.34,
              "time": 123456789
            }
          ],
          "user_id": "a88309ca-26cd-4d2b-8923-af0779e423a3"
        },
        "success": true
      };
      res.status(200).json(redacted_trails);
  });

  // *** GET an organisation's safe paths *** //
  router.get('/safe_path/:organization_id', function(req, res) {
    let safe_paths = {
      "authority_name": "Fake Organization",
      "concern_points": [
        {
          "latitude": 12.34,
          "longitude": 12.34,
          "time": 1584924233
        },
        {
          "latitude": 12.34,
          "longitude": 12.34,
          "time": 1584924583
        }
      ],
      "info_website": "https://www.something.gov/path/to/info/website",
      "publish_date_utc": "1584924583"
    };
    res.status(200).json(safe_paths);
  });

  // *** POST safe paths *** //
  router.post('/safe_paths',
    passport.authenticate('jwt', { session: false }), function(req, res) {
      let safe_paths = {
        "datetime_created": "Fri, 27 Mar 2020 04:32:12 GMT",
        "organization_id": "a88309c2-26cd-4d2b-8923-af0779e423a3",
        "safe_path": {
          "authority_name": "Fake Organization",
          "concern_points": [
            {
              "latitude": 12.34,
              "longitude": 12.34,
              "time": 123
            },
            {
              "latitude": 12.34,
              "longitude": 12.34,
              "time": 456
            }
          ],
          "info_website": "https://www.something.gov/path/to/info/website",
          "publish_date_utc": 1584924583
        },
        "user_id": "a88309c1-26cd-4d2b-8923-af0779e423a3"
      };
      res.status(200).json(safe_paths);
  });
  return router;
}

module.exports = initBackend;
