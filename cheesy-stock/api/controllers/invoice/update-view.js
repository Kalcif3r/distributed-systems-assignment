module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Update this invoice',


  description: 'Update a invoice and returns tp /invoice once it Updates',


  exits: {

    success: {
      viewTemplatePath: 'pages/invoice/update-view',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
