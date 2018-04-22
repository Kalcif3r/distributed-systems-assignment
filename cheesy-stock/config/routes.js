/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome':            { action: 'dashboard/view-welcome' },

  'GET /faq':                { view:   'pages/faq' },
  'GET /legal/terms':        { view:   'pages/legal/terms' },
  'GET /legal/privacy':      { view:   'pages/legal/privacy' },
  'GET /contact':            { view:   'pages/contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-change-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },

  // CHEESE ACTIONS
  'GET   /Cheese':                                    { action: 'cheese/view-all' },
  'POST  /Cheese/add-action':                         { action: 'cheese/add-action' },
  'GET   /Cheese/update-view/:cheeseID':              { action: 'cheese/update-view' },
  'POST  /Cheese/update-action':                      { action: 'cheese/update-action' },
  'POST  /Cheese/archive-action':                     { action: 'cheese/archive-action' },

  // FACTORY ACTIONS
  'GET   /Factory':                                   { action: 'factory/view-all' },
  'POST  /Factory/add-action':                        { action: 'factory/add-action' },
  'GET   /Factory/update-view/:factoryID':            { action: 'factory/update-view' },
  'POST  /Factory/update-action':                     { action: 'factory/update-action' },
  'POST  /Factory/archive-action':                    { action: 'factory/archive-action' },

  // INVENTORY ACTIONS
  'GET   /Inventory':                                 { action: 'inventory/view-all' },
  'POST  /Inventory/add-action':                      { action: 'inventory/add-action' },
  'GET   /Inventory/update-view/:inventoryID':        { action: 'inventory/update-view' },
  'POST  /Inventory/update-action':                   { action: 'inventory/update-action' },
  'POST  /Inventory/archive-action':                  { action: 'inventory/archive-action' },

  // INVOICE ACTIONS
  'GET   /Invoice':                                   { action: 'invoice/view-all' },
  'POST  /Invoice/add-action':                        { action: 'invoice/add-action' },
  'GET   /Invoice/update-view/:invoiceID':            { action: 'invoice/update-view' },
  'POST  /Invoice/update-action':                     { action: 'invoice/update-action' },
  'POST  /Invoice/archive-action':                    { action: 'invoice/archive-action' },



  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',

};
