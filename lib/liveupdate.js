/**
 * Call on keypress or change to a form input, then after no activity for the
 * given timeout it'll execute the async action with the latest data.
 *
 * If a new action occurs before the previous is finished, the new one is
 * executed anyway and when the previous one returns its result is ignored.
 *
 * Ensures updates happen sequentially regardless of response time.
 *
 * The last argument to the returned function *must* be a callback,
 * as must be the last argument to the action function.
 */

module.exports = function (timeout, query, action) {
    var count = 0;
    var context = null;
    var t = null;

    if (!action) {
        action = query;
        query = null;
    }

    function process(c) {
        return function () {
            if (c === count) {
                if (query) {
                    query.call(context, function () {
                        if (c === count) {
                            // note: arguments here is the callback args
                            action.apply(context, arguments);
                        }
                    });
                }
                else {
                    // note: arguments here are the original args
                    action.apply(context, arguments);
                }
            }
        };
    }

    return function () {
        context = this;
        if (t) {
            clearTimeout(t);
        }
        count++;
        t = setTimeout(process(count), timeout);
    };
};
