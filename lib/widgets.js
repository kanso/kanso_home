var widgets = require('couchtypes/widgets'),
    gravatar = require('gravatar'),
    liveupdate = require('./liveupdate'),
    users = require('users');


exports.gravatar = function (options) {
    var w = widgets.text(options);
    var _toHTML = w.toHTML;

    w.toHTML = function (name, value, raw, field, options) {
        this.name = this._name(name, options.offset);
        return _toHTML.apply(this, arguments);
    };
    w.clientInit = function (field, path, value, raw, errors, options) {
        var action = function () {
            var val = $(this).val();
            if (val) {
                var src = gravatar.avatarURL({
                    email: val,
                    size: 128,
                    default_image: 'mm'
                });
                var curr = $('#gravatar img').attr('src');
                if (curr !== src) {
                    $('#gravatar').html('<img src="' + src + '" />');
                }
            }
            else {
                $('#gravatar').html(
                    '<p>Enter an email address to preview your Gravatar</p>'
                );
            }
        };
        var input = $('input[name="' + this.name + '"]');
        var lu = liveupdate(500, action);
        input.keyup(lu);
        input.change(lu);
        $('input[type=reset]', input.parents('form')).click(function () {
            setTimeout(lu, 0)
        });
    };
    return w;
};

exports.username = function (options) {
    var w = widgets.text(options);
    var _toHTML = w.toHTML;

    w.toHTML = function (name, value, raw, field, options) {
        this.name = this._name(name, options.offset);
        return _toHTML.apply(this, arguments);
    };
    w.clientInit = function (field, path, value, raw, errors, options) {
        var input = $('input[name="' + this.name + '"]');
        var hint = input.parent().siblings('.hint');

        var query = function (callback) {
            var val = input.val();
            if (val) {
                users.get(val, callback);
            }
            else {
                hint.text('');
            }
        };
        var action = function (err, doc) {
            if (err) {
                if (err.status === 404) {
                    // bug in form rendering?
                    // creates hint inside a hint,
                    // matching that here
                    hint.html(
                        '<div class="hint username-available">' +
                            'Available' +
                        '</div>'
                    );
                }
                else {
                    hint.html(
                        '<div class="hint error">' +
                            'Error: ' + err +
                        '</div>'
                    );
                }
            }
            else {
                hint.html(
                    '<div class="hint username-taken">' +
                        'Taken' +
                    '</div>'
                );
            }
        };
        var lu = liveupdate(500, query, action);
        input.keyup(lu);
        input.change(lu);
        $('input[type=reset]', input.parents('form')).click(function () {
            setTimeout(lu, 0);
        });
        query(action);
    };
    return w;
};
