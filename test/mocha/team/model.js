'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Team = mongoose.model('Team');

//Globals
var user;
var team;

//The tests
describe('<Unit Test>', function() {
    describe('Model Team:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function() {
                team = new Team({
                    name: 'Team Name',
                    city: 'Team City',
                    state: 'Team State',
                    country: 'USA',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return team.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                team.name = '';

                return team.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            team.remove();
            user.remove();
            done();
        });
    });
});