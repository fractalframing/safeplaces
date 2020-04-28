const express = require('express');
const path = require("path");
const passport = require('passport');

const db = require('../db/models');
const LocalJwtStrategy = require("../middleware/LocalJwtStrategy");
const LocalStrategy = require("../middleware/LocalStrategy");
const { i18nextMiddleware, i18next} = require("../middleware/i18n");
const frontendRoutes = require("./frontend");
const initBackend = require("./backend");

const app = express();

// Set up passport strategies.
passport.use('local', LocalStrategy);
passport.use('jwt', LocalJwtStrategy);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

// Setup public path.
app.use(i18nextMiddleware.handle(i18next));

// Setup view engine
app.set('views', './views');
app.set('view engine', 'pug');

// Setup routes.
const backendRoutes = initBackend(passport, db);
app.use("/", backendRoutes);
app.use("/", frontendRoutes);

module.exports = app;
