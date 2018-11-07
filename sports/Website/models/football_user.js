var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const USER_TYPES = require('../constants/values.js').football_user_types;

var FootballUserSchema = new Schema({
    profile_id: String, // This is not this schema's ID. It's a reference for either the player, team or other type document.
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    user_type: {type: String, enum: USER_TYPES},
    last_login: Date,
    subscription_expiration: Date
});

//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
FootballUserSchema.pre('save', async function (next) {
    const user = this;

    // TODO: Change this
    // This is checking if the password is hashed already or not.
    // We won't allow the user to pick a password bigger than 10 characters,
    // So if it's > 10 it means it's hashed
    if (user.password.length < 10) {

        //Hash the password with a salt round of 12, the higher the rounds the more secure, but the slower
        //our application becomes.
        const hash = await bcrypt.hash(this.password, 12);
        this.password = hash;
    }

    //Indicates we're done and moves on to the next middleware
    next();
});

FootballUserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

FootballUserSchema.statics = require('../services/football_user_service');

module.exports = mongoose.model('football_user', FootballUserSchema);
