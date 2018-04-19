module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'View Update page for this cheese',


  description: 'Display "Update cheese" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese/update-view',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
