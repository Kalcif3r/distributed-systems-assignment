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

  //Block create and update actions for cheese & factory if the user is not a Manager or an Admin
  'Cheese/add-action'         : 'is-admin-or-manager',
  'Cheese/update-action'      : 'is-admin-or-manager',
  'Factory/add-action'        : 'is-admin-or-manager',
  'Factory/update-action'     : 'is-admin-or-manager',

  //Block create and update actions if the user is a sales person
  'Inventory/add-action'      : 'is-admin-or-manager-or-stock-person',
  'Inventory/update-action'   : 'is-admin-or-manager-or-stock-person',

  //Block request for deleting if the user is not a Manager or an Admin
  'Inventory/archive-action'  : 'is-admin-or-manager',
  'Factory/archive-action'    : 'is-admin-or-manager',
  'Cheese/archive-action'     : 'is-admin-or-manager',
  'Invoice/archive-action'    : 'is-admin-or-manager',

  // Bypass the `is-logged-in` policy for:
  'entrance/*': true,
  'account/logout': true,
  'view-homepage-or-redirect': true,
  'deliver-contact-form-message': true,

};
