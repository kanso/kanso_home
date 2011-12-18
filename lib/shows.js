/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
    events = require('duality/events'),
    utils = require('duality/utils');


exports.home = function (doc, req) {
    events.once('afterResponse', function (info, req, res) {
        $('#topnav li').removeClass('active');
        $('#home_nav_link').addClass('active');
    });
    if (req.client && utils.initial_hit) {
        // dont' bother with the second render, nothing new to show
    }
    else {
        return {
            title: 'Kanso',
            content: templates.render('home.html', req, {}),
            navpage: 'home'
        };
    }
};

exports.install = function (doc, req) {
    events.once('afterResponse', function (info, req, res) {
        $('#topnav li').removeClass('active');
        $('#install_nav_link').addClass('active');
    });
    if (req.client && utils.initial_hit) {
        // dont' bother with the second render, nothing new to show
    }
    else {
        return {
            title: 'Kanso',
            content: templates.render('install.html', req, {}),
            navpage: 'install'
        };
    }
};

exports.create_account = function (doc, req) {
    return {
        title: 'Create account',
        content: templates.render('create_account.html', req, {
            form: require('./forms').create_user.toHTML(req),
            next: req.query.next
        })
    };
};

exports.not_found = function (doc, req) {
    return {
        title: '404 - Not Found',
        content: templates.render('404.html', req, {})
    };
};
