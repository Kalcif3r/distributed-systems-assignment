module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'View Update page for this inventory',


  description: 'Display "Update inventory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/inventory/update-view',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
