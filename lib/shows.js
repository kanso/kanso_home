/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
    utils = require('duality/utils');


exports.home = function (doc, req) {
    if (req.client && utils.initial_hit) {
        // dont' bother with the second render, nothing new to show
    }
    else {
        return {
            title: 'Kanso',
            content: templates.render('home.html', req, {})
        };
    }
};

exports.tools = function (doc, req) {
    if (req.client && utils.initial_hit) {
        // dont' bother with the second render, nothing new to show
    }
    else {
        return {
            title: 'Kanso',
            content: templates.render('tools.html', req, {})
        };
    }
};

exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};
