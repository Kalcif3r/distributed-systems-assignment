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
