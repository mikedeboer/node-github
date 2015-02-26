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

describe("[gists]", function() {
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

    it("should successfully execute GET /gists (getAll)",  function(next) {
        client.gists.getAll(
            {
                page: "Number",
                per_page: "Number",
                since: "Date"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /users/:user/gists (getFromUser)",  function(next) {
        client.gists.getFromUser(
            {
                user: "String",
                page: "Number",
                per_page: "Number",
                since: "Date"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute POST /gists (create)",  function(next) {
        client.gists.create(
            {
                description: "String",
                public: "Boolean",
                files: "Json"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute PATCH /gists/:id (edit)",  function(next) {
        client.gists.edit(
            {
                id: "String",
                description: "String",
                files: "Json"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /gists/public (public)",  function(next) {
        client.gists.public(
            {
                since: "Date"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /gists/starred (starred)",  function(next) {
        client.gists.starred(
            {
                since: "Date"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /gists/:id (get)",  function(next) {
        client.gists.get(
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

    it("should successfully execute PUT /gists/:id/star (star)",  function(next) {
        client.gists.star(
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

    it("should successfully execute DELETE /gists/:id/star (deleteStar)",  function(next) {
        client.gists.deleteStar(
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

    it("should successfully execute GET /gists/:id/star (checkStar)",  function(next) {
        client.gists.checkStar(
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

    it("should successfully execute POST /gists/:id/fork (fork)",  function(next) {
        client.gists.fork(
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

    it("should successfully execute DELETE /gists/:id (delete)",  function(next) {
        client.gists.delete(
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

    it("should successfully execute GET /gists/:gist_id/comments (getComments)",  function(next) {
        client.gists.getComments(
            {
                gist_id: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute GET /gists/:gist_id/comments/:id (getComment)",  function(next) {
        client.gists.getComment(
            {
                gist_id: "String",
                id: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute POST /gists/:gist_id/comments (createComment)",  function(next) {
        client.gists.createComment(
            {
                gist_id: "String",
                body: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute PATCH /gists/:gist_id/comments/:id (editComment)",  function(next) {
        client.gists.editComment(
            {
                gist_id: "String",
                id: "String",
                body: "String"
            },
            function(err, res) {
                Assert.equal(err, null);
                // other assertions go here
                next();
            }
        );
    });

    it("should successfully execute DELETE /gists/:gist_id/comments/:id (deleteComment)",  function(next) {
        client.gists.deleteComment(
            {
                gist_id: "String",
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
