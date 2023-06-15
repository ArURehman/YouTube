const express = require('express')

const controller = (
    callback = (
        req = express.request,
        res = express.response,
        next = () => {}
    ) => {}) => {
    return callback
};

module.exports = controller;