module.exports = {

  // FIXME: NEED TO UPDATE ADD ACTION LATER

  friendlyName: 'Update this Cheese',


  description: 'Post action for "Update Cheese" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
