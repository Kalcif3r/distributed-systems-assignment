module.exports = {

  // FIXME: NEED TO UPDATE ADD ACTION LATER

  friendlyName: 'Update this Cheese',


  description: 'Display "Update Cheese" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
