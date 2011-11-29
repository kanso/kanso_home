var fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form,
    widgets = require('./widgets');


exports.create_user = new Form({
    //full_name: fields.string(),
    username: fields.string({
        widget: widgets.username()
    }),
    email: fields.email({
        widget: widgets.gravatar(),
        hint: 'Private - Used for gravatar'
    }),
    password: fields.password(),
    website: fields.url({
        required: false,
        hint: 'Optional - Must include http://'
    })
});
