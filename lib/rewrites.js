/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/', to: '_show/home'},
    {from: '/tools', to: '_show/tools'},
    {from: '*', to: '_show/not_found'}
];
