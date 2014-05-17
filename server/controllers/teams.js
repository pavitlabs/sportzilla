'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Team = mongoose.model('Team'),
    _ = require('lodash');


/**
 * Find team by id
 */
exports.team = function(req, res, next, id) {
    Team.load(id, function(err, team) {
        if (err) return next(err);
        if (!team) return next(new Error('Failed to load team ' + id));
        req.team = team;
        next();
    });
};

/**
 * Create an team
 */
exports.create = function(req, res) {
    var team = new Team(req.body);
    team.user = req.user;

    team.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                team: team
            });
        } else {
            res.jsonp(team);
        }
    });
};

/**
 * Update an team
 */
exports.update = function(req, res) {
    var team = req.team;

    team = _.extend(team, req.body);

    team.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                team: team
            });
        } else {
            res.jsonp(team);
        }
    });
};

/**
 * Delete an team
 */
exports.destroy = function(req, res) {
    var team = req.team;

    team.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                team: team
            });
        } else {
            res.jsonp(team);
        }
    });
};

/**
 * Show an team
 */
exports.show = function(req, res) {
    res.jsonp(req.team);
};

/**
 * List of teams
 */
exports.all = function(req, res) {
    Team.find().sort('-created').populate('user', 'name username').exec(function(err, teams) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(teams);
        }
    });
};
