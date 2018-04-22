module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Create this invoice',


  description: 'Creates a invoice and returns to /invoice once it Creates',


  exits: {

    success: {
      viewTemplatePath: 'pages/invoice/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
