/**
 * Update functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
    gravatar = require('gravatar'),
    users = require('users'),
    session = require('session'),
    duality = require('duality/core');


exports.create_account = function (doc, req) {
    if (!req.client) {
        return [null, 'JavaScript is required to create accounts'];
    }
    var next = req.form.next || req.query.next;

    var form = require('./forms').create_user;
    form.validate(req);

    var avatar;
    if (form.values.email) {
        avatar = gravatar.avatarURL({
            email: form.values.email,
            size: 128,
            default_image: 'mm'
        });
    }

    if (form.isValid()) {
        var username = form.values.username;
        var password = form.values.password;
        var props = {
            gravatar: gravatar.hash(form.values.email),
            website: form.values.website,
            location: form.values.location
        };
        users.create(username, password, props, function (err) {
            if (err) {
                var username_taken = false;
                if (err.error === 'conflict') {
                    username_taken = true;
                    alert('Username already taken');
                }
                else {
                    alert(err);
                }
                $('#content').html(templates.render(
                    'create_account.html', req, {
                        form: form.toHTML(req),
                        avatar: avatar
                    }
                ));
                if (username_taken) {
                    var h = $('input[name=username]').parent().siblings('.hint');
                    h.html('<div class="hint username-taken">Taken</div>');
                }
                return;
            }
            session.login(username, password, function (err) {
                if (err) {
                    return alert(err);
                }
                $.ajax({
                    url: '/_private_data',
                    type: 'POST',
                    data: JSON.stringify({email: form.values.email}),
                    dataType: 'json',
                    success: function () {
                        //duality.setURL('GET', next || '/', {});
                        window.location = next || '/';
                    },
                    error: function (err) {
                        // ignore errors for now, the user was created anyway
                        console.error(err);
                        //duality.setURL('GET', next || '/', {});
                        window.location = next || '/';
                    }
                });
            });
        });
    }
    else {
        return [null, {
            title: 'Create account',
            content: templates.render('create_account.html', req, {
                form: form.toHTML(req),
                avatar: avatar
            })
        }];
    }
};
