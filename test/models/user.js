const user = require('../../models/user');
const assert = require('chai').assert;
const mongoose = require('mongoose');
const db = require('../../models/db_connect');

db(mongoose, "test");


describe('User Model test', function() {
    describe('create database test()', function() {
        var user1 = new user({
            first_name : "enaho",
            last_name  : "john",
            email : "jessy@gmail.com",
            password : "gggggg"
        });
        it('user should save without error', function (done) {
            var saved = user1.save(function (err, user1) {
                    if(err)
                            (err)
                    else
                        done()
                });
            });

        it('user fist_name and last name should return {enaho, murphy}', function() {
            assert.equal(user1.first_name, "enaho");
            assert.equal(user1.last_name, "john");
        });
        it('password should be hashed', function(done) {
            assert(saved.comparePassword("gggggg"), "should return true")
        });
        it('email should be unique', function () {
            var saved = user1.save(function (err, user1) {
                if(err)
                    true
                else
                    return false
            });

            assert(saved, "should be true")
        });
    });


});