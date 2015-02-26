/*
 * Copyright 2012 Cloud9 IDE, Inc.
 *
 * This product includes software developed by
 * Cloud9 IDE, Inc (http://c9.io).
 *
 * Author: Mike de Boer <info@mikedeboer.nl>
 */

"use strict";

var Assert = require("assert");
var Client = require("./../../index");

describe("[authorization]", function() {
    var client;
    var token = "c286e38330e15246a640c2cf32a45ea45d93b2ba";

    beforeEach(function() {
        client = new Client({
            version: "3.0.0"
        });
        client.authenticate({
            type: "oauth",
            token: token
        });
    });

    it("should successfully execute GET /authorizations (getAll)",  function(next) {
        client.authorization.getAll(
            {
                page: "Number",
                per_page: "Number"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /authorizations/:id (get)",  function(next) {
        client.authorization.get(
            {
                id: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute POST /authorizations (create)",  function(next) {
        client.authorization.create(
            {
                scopes: "Array",
                note: "String",
                note_url: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute PATCH /authorizations/:id (update)",  function(next) {
        client.authorization.update(
            {
                id: "String",
                scopes: "Array",
                add_scopes: "Array",
                remove_scopes: "Array",
                note: "String",
                note_url: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute DELETE /authorizations/:id (delete)",  function(next) {
        client.authorization.delete(
            {
                id: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });
});
