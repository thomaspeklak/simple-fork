"use strict";

var cp = require("child_process");
var join = require("path").join;
var production = process.env.NODE_ENV === "production" ? true : false;

//fork a child process depending on the environment

module.exports = function (path, args, shutdownMessage) {

    var job = production ?
        cp.fork(path, args) :
        cp.fork(join(__dirname, "node_modules", "nodemon", "nodemon.js"), [path].concat(args), {
            cwd: path
        });

    job.on("message", function (message) {
        console.log(message);
    }).on("exit", function () {
        console.log(shutdownMessage);
    });

    return job;
};

