const express = require("express");
const jwt = require("jsonwebtoken");
const jwtSecret = require('../config/jwtConfig');
const moment = require('moment-timezone');

const initBackend = (passport, { User, Trail, Path, Organization }) => {
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
  router.get('/redacted_trails', passport.authenticate('jwt', { session: false }), async function(req, res) {
    const redacted_trails = await Trail.findAll({ attributes: ['identifier', 'user_id', 'organization_id', 'trail']});
    res.status(200).json({ data: redacted_trails });
  });

  // *** POST redacted trail *** //
  router.post('/redacted_trail', passport.authenticate('jwt', { session: false }), async function(req, res) {
      try {
        const { user, body } = req;
        const redacted_trail = Trail.build({
          trail: body.trail,
          identifier: body.identifier,
          user_id: user.id,
          organization_id: user.UserOrganizationId
        });
        const { identifier, organization_id, trail, user_id} = await redacted_trail.save();
        const response = {
          data: {
            identifier,
            organization_id,
            trail,
            user_id
          },
          success: true
        };
        res.status(200).json(response);
      } catch(err) {
        console.log(err);
        res.status(401).json({ success: false });
      }
  });

  // *** GET an organisation's safe paths *** //
  router.get('/safe_path/:organization_id', async function(req, res) {
    const path = await Path.findOne({
      where: {
        authority_id: req.params.organization_id
      },
      order: [['publish_date_utc', 'DESC']],
      include: Organization
    });
    const safe_paths = {
      "authority_name": path.Organization.name,
      "concern_points": path.concern_points,
      "info_website": path.Organization.website,
      "publish_date_utc": path.publish_date_utc
    };
    res.status(200).json(safe_paths);
  });

  // *** POST safe paths *** //
  router.post('/safe_paths', passport.authenticate('jwt', { session: false }), async function(req, res) {
      // Get data from body and passport.
      const { user, body } = req;
      const path = Path.build({
        authority_id: user.UserOrganizationId,
        concern_points: body.concern_points,
        publish_date_utc: body.publish_date_utc
      });
      // Save model and load organization.
      const saved_path = await path.save();
      const authority = await saved_path.getOrganization();
      // Create formatted response object.
      const safe_paths = {
        "datetime_created": moment(saved_path.createdAt).format("ddd, MMM D YYYY HH:mm:ssZ"),
        "organization_id": authority.id,
        "safe_path": {
          "authority_name": authority.name,
          "concern_points": saved_path.concern_points,
          "info_website": authority.website,
          "publish_date_utc": saved_path.publish_date_utc
        },
        "user_id": user.id
      };
      res.status(200).json(safe_paths);
  });

  return router;
}

module.exports = initBackend;
