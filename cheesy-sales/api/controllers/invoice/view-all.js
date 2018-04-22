module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'View all invoice',


  description: 'Display "invoice" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/invoice/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
