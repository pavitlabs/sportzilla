'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Player Schema
 */
var PlayerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    teamId: {
        type: String,
        default: '',
        trim : true
    },
    firstName: {
        type: String,
        default: '',
        trim: true
    },
    middleName: {
        type: String,
        default: '',
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        trim: true
    },
    birthDate: {
        type: Date,
        default: ''
    },
    gender: {
        type: String,
        default: '',
        enum : ['m','f']
    },
    city: {
        type: String,
        default: '',
        trim: true
    },
    state: {
        type: String,
        default: '',
        trim: true
    },
    country: {
        type: String,
        default: 'USA',
        enum : ['USA', 'India', 'UK']
    }
});

/**
 * Validations
 */
PlayerSchema.path('firstName').validate(function(firstName) {
    return firstName.length;
}, 'First Name cannot be blank');

/**
 * Statics
 */
PlayerSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Player', PlayerSchema);
