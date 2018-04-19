module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Archive this invoice',


  description: 'Archive a invoice and returns tp /invoice once it Archives',


  exits: {

    success: {
      viewTemplatePath: 'pages/invoice/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
