/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': 'is-logged-in',

  //Block create and update actions if the user is not a Manager or an Admin
  'Cheese/add-action' : ['is-manager', 'is-super-admin'],
  'Cheese/update-action' : ['is-manager', 'is-super-admin'],
  'Factory/add-action' : ['is-manager', 'is-super-admin'],
  'Factory/update-action' : ['is-manager', 'is-super-admin'],

  //Block request for deleting if the user is not a Manager or an Admin
  'Inventory/archive-action' : ['is-manager', 'is-super-admin'],
  'Factory/archive-action' : ['is-manager', 'is-super-admin'],
  'Cheese/archive-action' : ['is-manager', 'is-super-admin'],
  'Invoice/archive-action' : ['is-manager', 'is-super-admin'],

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'deliver-contact-form-message': true,

};
