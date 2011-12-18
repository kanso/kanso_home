/**
 * Rewrite settings to be exported from the design doc
 */

module.exports = [
    {from: '/static/*', to: 'static/*'},
    {from: '/', to: '_show/home'},
    {from: '/install', to: '_show/install'},
    {from: '/create_account', to: '_update/create_account', method: 'POST'},
    {from: '/create_account', to: '_show/create_account'},
    {from: '*', to: '_show/not_found'}
];
