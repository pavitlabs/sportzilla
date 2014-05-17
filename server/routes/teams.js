'use strict';

// Teams routes use teams controller
var teams = require('../controllers/teams');
var authorization = require('./middlewares/authorization');

// Team authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.team.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/teams', teams.all);
    app.post('/teams', authorization.requiresLogin, teams.create);
    app.get('/teams/:teamId', teams.show);
    app.put('/teams/:teamId', authorization.requiresLogin, hasAuthorization, teams.update);
    app.del('/teams/:teamId', authorization.requiresLogin, hasAuthorization, teams.destroy);

    // Finish with setting up the teamId param
    app.param('teamId', teams.team);

};