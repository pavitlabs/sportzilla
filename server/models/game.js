'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Game Schema
 */
var GameSchema = new Schema({
    scheduledDate: {
        type: Date,
        default: null
    },
    teams: [{
        type: String,
        default: '',
        trim: true
    }]
});

/**
 * Validations
 */
GameSchema.path('scheduledDate').validate(function(scheduledDate) {
    return scheduledDate;
}, 'Schedule a date for the game.');

/**
 * Statics
 */
GameSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Game', GameSchema);
